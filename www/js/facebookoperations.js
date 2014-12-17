/***** Facebook Operation**********/
var accessToken = "";
//connect with facebook to Login with kidssitters
function loginByFb()
{
	facebookConnectPlugin.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			//do nothing
		}else if (response.status == 'not_authorized') {
			alert("You may have restricted your informations, please check you settings.");
			facebookConnectPlugin.logout();
		}else{
			facebookConnectPlugin.login(
				["email,offline_access,publish_stream,"+
				"user_birthday,user_location,user_work_history,"+
				"user_about_me,user_hometown"],
				function (userAuth) { 
					facebookConnectPlugin.api( "me/?fields=id,email", ["user_birthday"],
			            function (userInfo) { 
							userInfo.fbacctok = userAuth.authResponse.accessToken;
							loginReqestToServer(userInfo);
						},
						function (error) { 
							alert("" + error);
							facebookConnectPlugin.logout();
						}
					);					
				},
				function (error) { 
					alert("" + error);
				}
			); 
		}
	},function (response) { alert("" + error) });
}
//Login with kidssitter accessing data from facebook
function loginReqestToServer(fb)
{
	$.mobile.showPageLoadingMsg();
	$.ajax({
		type: "POST",
		url: "http://codeuridea.net/kidssitter/getlogin",//"http://192.168.1.34/kidssitter-prev/",
		data:{_name:fb.email,fbid:fb.id,fbacctok:fb.fbacctok,loginviafb:1},
		dataType: "json",
		success: function(data)
		{
			//alert("data:"+JSON.stringify(data));
			if(data.result== "true")
			{
				//alert("store in local");
				window.localStorage["username"]=fb.email,
				window.localStorage['fbdata']=JSON.stringify({fbid:fb.id,fbacctok:fb.fbacctok});
				window.localStorage['loggedin']='1';
				window.localStorage['user_type']=data.type;
				window.localStorage['user_listing_data']=JSON.stringify(data.result_arr);
				window.localStorage['address']=data.user_lat;
				window.localStorage['userdata']=JSON.stringify(data.user_data);
				window.localStorage['planning']=JSON.stringify(data.user_data['planning']);
				$('input:checkbox[name="planning[]"]:checked').each(function() 
				{
					$(this).attr('checked',false);
				});
				if(data.type=="user_sitter")
				{
					regNotification();
					$('#near-kid li').remove();
					if(data.result_arr != null)
					{
						var j=0;
						$.each(data.result_arr,function(index,value)
						{
							var urgence,premium;
							if(value.urgence == true)
							{
								urgence="display:block";
							}
							else
							{
								urgence="display:none";
							}
							
							if(value.premium !=null)
							{
								//for premium users
								var diffDays=get_date_diff(value.premium.endDate.date,value.server);
								console.log(diffDays);
								if(diffDays<=0)
								{
									premium="display:block";
									
								}
								else
								{
									premium="display:none";
								}
							}
							else
							{
								premium="display:none";
							}
							
							if(value.lname != null)
							{
								var lname=value.lname;
							}
							else
							{
								var lname="";
							}
							
							
							var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'parent\')"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+'. ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
								$("#near-kid").append(htmls);
							
						});
					}else
					{
						var htmls='<li class="result"><h4 style="text-align:center">No Result Found.</h4></li>';
						$("#near-kid").html(htmls);
						//alert("Nodata");
					}
					if(data.user_lat !="")
					{
						//alert("get geoloc");
						$("#kgeo").geocomplete("find",data.user_lat);
						$('#kgeo').trigger('geocode');	
						//alert("geoloc");
					}else{
						//alert("no geoloc");
					}
					
					$.mobile.hidePageLoadingMsg();
					$.mobile.changePage("#listing-parents",{transition:"flip"});
				}
				else
				{
					$('#near-parent li').remove();
					if(data.result_arr != null)
					{
						//alert("Parent");
						var j=0;
						$.each(data.result_arr,function(index,value){
						var certified,valid;
						if(value.certified == "1")
						{
							certified="display:block";
						}
						else
						{
							certified="display:none";
						}
						
						if(value.verified == "1")
						{
							valid="display:block";
						}
						else
						{
							valid="display:none";
						}
						
						if(value.lname != null)
						{
							var lname=value.lname;
						}
						else
						{
							var lname="";
						}
						
						if(value.rate != null)
						{
							var rate=value.rate+"&euro;/H";
						}
						else
						{
							var rate="";
						}
						if(value.type_sitter != null)
						{
							var type=value.type_sitter+" - ";
						}
						else
						{
							var type="";
						}
						
						var i=0;
						var rates=parseInt(value.rating);
						if(rates !=0)
						{
						for (i=0;i<rates;i++)
						{
							$(".avis:eq("+j+") > .rating:eq("+i+")").attr('src','');
							$(".avis:eq("+j+") > .rating:eq("+i+")").attr('src','./images/check-done.png');
						}
						}
						j++;
						
						var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'sitter\')"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+'. ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
							$("#near-parent").append(htmls);
							
						});
					}else
					{
						var htmls='<li class="result"><h4 style="text-align:center">No Result Found.</h4></li>';
						$("#near-parent").html(htmls);
					}
					if(data.user_lat !="")
					{
						//alert("get geoloc");
						$("#pgeo").geocomplete("find",data.user_lat);
						$('#pgeo').trigger('geocode');	
						//alert("geoloc");
					}else{
						//alert("no geoloc");
					}
					$.mobile.hidePageLoadingMsg();
					$.mobile.changePage("#listing-kid",{transition:"flip"});
				}
				$('.logout').css('display','block');
			}
			else
			{
				//alert("store clear");
				$.mobile.hidePageLoadingMsg();
				localStorage.clear();
				facebookConnectPlugin.logout();
				alert(data.msg);//alert("You have entered wrong username or password.Please try again.");
			}
			
		},
		error:function(event, jqxhr, settings, thrownError)
		{
			$.mobile.hidePageLoadingMsg();
			facebookConnectPlugin.logout();
			alert("Problem occurred in server connection.");
		}
	});
}
//connect with facebook to register in kidssitter
function connectFbReg(type)
{
	facebookConnectPlugin.login(
		["email,offline_access,publish_stream,"+
		"user_birthday,user_location,user_work_history,"+
		"user_about_me,user_hometown"],
		function (userAuth) { 
			facebookConnectPlugin.api( 
				"me/?fields=id,email,birthday,"+
					"first_name,last_name,gender,location,link", 
				["user_birthday"],
	            function (userInfo) { 
					userInfo.fbacctok = userAuth.authResponse.accessToken;
					userInfo.userType = type;
					userRegWithFbData(userInfo);
				},
				function (error) { 
					alert("" + error); 
					facebookConnectPlugin.logout();
				}
			); 
		},
		function (error) { alert("" + error); }
	);
}
//register in kidssitter accessing data from facebook
function userRegWithFbData(userObj)
{
	$.mobile.showPageLoadingMsg();
	var seturl = "http://codeuridea.net/kidssitter/getregister-parent";//"http://192.168.1.34/kidssitter-prev";
	if(typeof userObj.userType != 'undefined' && userObj.userType == 'sitter')
	{
		seturl = "http://codeuridea.net/kidssitter/getregister-sitter";//"http://192.168.1.34/kidssitter-prev"
	}else{
	}
	
	
	var gender = 0;
	(typeof userObj.gender != 'undefined')
	{
		if(userObj.gender.toLowerCase() == "male")
			gender = 1;
		else if(userObj.gender.toLowerCase() == "female")
			gender = 2;
	}
	fill_address(userObj);
	var sendData = {
		lat:"",
		lng:"",
		password:"",
		fname:(typeof userObj.first_name != 'undefined'?userObj.first_name:""),
		lname:(typeof userObj.last_name != 'undefined'?userObj.last_name:""),
		address:"",
		locality:"",
		country:"",
		gender:gender,
		birthdate:(typeof userObj.birthday != 'undefined'?userObj.birthday:""),
		email:userObj.email,
		fbid:userObj.id,
		fbacctok:userObj.fbacctok,
		fbreg:1
	};
	setTimeout(function(){
		sendData.lat = $("input[name=lat]").val();
		sendData.lng = $("input[name=lng]").val();
		sendData.country=$("input[name=country]").val();
		sendData.locality = $('input[name="locality"]').val();
		sendData.address=$('input[name="geocomplete"]').val();
		if(typeof userObj.userType != 'undefined' && userObj.userType == 'sitter')
		{
			sendData.lat = $("input[name=s_lat]").val();
			sendData.lng = $("input[name=s_lng]").val();
			sendData.country=$("input[name=s_country]").val();
			sendData.locality = $('input[name="s_locality"]').val();
			sendData.address=$('input[name="s_geocomplete"]').val();
		}
		//alert(JSON.stringify(sendData));
		$.ajax({
			type: "POST",
			url: seturl,
			data: sendData,
			dataType: "json",
			success: function(data)
			{
				if(data.result== true || data.result== "true")
				{
					$.mobile.hidePageLoadingMsg();
					alert("Registration Successful");
					//$.mobile.changePage('#connexion',{transition:'flip'});
					loginReqestToServer(userObj);
					//data:{_name:fb.email,fbid:fb.id,fbacctok:fb.fbacctok,loginviafb:1}
				}
				else
				{
					$.mobile.hidePageLoadingMsg(function(){},function(){});
					facebookConnectPlugin.logout();
					if(typeof data.msg != "undefined")
						alert(data.msg);
					else
						alert("Some error occured during registration.Please try again.");
				}
			},
			error:function(event, jqxhr, settings, thrownError)
			{
				$.mobile.hidePageLoadingMsg();
				facebookConnectPlugin.logout();
				alert("Problem occurred in server connection.");
			}	
	   });
   }, 10000);
}
// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
function fill_address(address)
{
	if(typeof address.location != "undefined" && typeof address.location.name != "undefined")
	{
		if(address.userType == "parent")
		{
			$("#geocomplete").geocomplete("find",address.location.name);
			$('#geocomplete').trigger('geocode');
		}else{
			$("#geocomplete1").geocomplete("find",address.location.name);
			$('#geocomplete1').trigger('geocode');
		}
		
	}
	else
	{
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat_and_long = position.coords.latitude+", "+position.coords.longitude;
			if(address.userType == "parent")
			{
				$("#geocomplete").geocomplete("find", lat_and_long);
				$('#geocomplete').trigger('geocode');
			}else{
				$("#geocomplete1").geocomplete("find", lat_and_long);
				$('#geocomplete1').trigger('geocode');
			}
			
			
		}, onError);
	}
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
/***** Facebook Operation**********/


//kidssitter socianetwoking followup
function kidssitterFbpg()
{
	var deviceName = "";
	deviceName = window.device.platform;
	//alert(deviceName);
	if(deviceName == "Android" || deviceName == "android")
		navigator.app.loadUrl("https://facebook.com/pages/Kidssitter/443324432414546?fref=ts",
			{openExternal : true}
		);
	else
		window.open("https://facebook.com/pages/Kidssitter/443324432414546?fref=ts", '_system');
} 

function kidssittertweetpg()
{
	var deviceName = "";
	deviceName = window.device.platform;
	//alert(deviceName);
	if(deviceName == "iOS" || deviceName == "iPhone")
		navigator.app.loadUrl("https://twitter.com/Kidssitter",{openExternal : true});
	else
		window.open("https://twitter.com/Kidssitter", '_system');
}

function kidssitterblogpg()
{
	var deviceName = "";
	deviceName = window.device.platform;
	//alert(deviceName);
	if(deviceName == "iOS" || deviceName == "iPhone")
		navigator.app.loadUrl("http://blog.kidssitter.com/",{openExternal : true});
	else
		window.open("http://blog.kidssitter.com/", '_system');
}