// JavaScript Document
	$(document).ready(function(){
		var today = new Date();
		//setting the date range
		var startDate = new Date(today.getFullYear() -96, 1, 1); 
		var lastDate = new Date(today.getFullYear() -15, 11, 31);
		$.datepicker.setDefaults({
			dateFormat:"yy-mm-dd",
			changeYear:true,
			yearRange: "-96:-15",
			minDate:startDate,
			maxDate:lastDate,
			changeMonth:true,
			regional:'fr'
		});
		$( ".datepick" ).datepicker();
		
		$('.logout').click(function(){
			logout();
		});
		
		$('#flip-min').change(function(){
			change_status_annonce($(this).val());
		});
		
	$('#note1,#note2,#note3,#note4').val('0');
	$('#com_box').val('');
	$('.rating-star-pan ul li').click(function(){
		
		var index =	$(this).index();
		$(this).parent().parent().find('li').removeClass('active');
		$(this).parent().parent().find('li').each(function(i,k){
			
			if(i <= index)
			$(this).addClass('active');
		});
			
		$(this).parent().parent().find('.rating_value').val($(this).parent().parent().find('.active').length);
		
	});
/*$('#urgence').bind('change', function(){
    if($(this).is(':checked')){
        alert('1');
    }
	else{
	alert('2');
	}
});*/
	//favourites 
	
	$('.star').click(function()
	{
		if($(this).children('i').hasClass('favourite') == true)
		{
			
			$(this).children('i').removeClass('favourite');
			favouriteAction('remove');
			
		}
		else{
			$(this).children('i').addClass('favourite');
			favouriteAction('add');
		}
	});
	
	$('.message-menu >li:first').addClass('active');
	//alert($('#message-menu > li ').hasClass('active'));
	$('.message-menu > li ').click(function(){
		if($(this).hasClass('active')==false)
		{
			$('.message-menu > li ').removeClass('active');
			$(this).addClass('active');
			
			view_message_list($(this).index());
		}
	});
	
	$('div').live('pageshow',function(event){
		restrictMenuByLogin();
	});

	});

//logout function-----------------------------------------
function logout()
{
	$.mobile.showPageLoadingMsg();
	window.localStorage.clear();
	$('.logout').css('display','none');
	facebookConnectPlugin.logout();
	$.mobile.hidePageLoadingMsg();
	$('#password').val('');
	$.mobile.changePage('#home',{transition:'flip'});
}
	
   
$(document).ready(function(){

$("input[name=radio-choice]").change(function(){
var selection=$(this).val();
if( selection == 'choice-2')
{
	$.mobile.showPageLoadingMsg();
	$.mobile.changePage('#inscription-kid', { transition: 'flip'} );
	$.mobile.hidePageLoadingMsg();
}
else
{
	$.mobile.showPageLoadingMsg();
	$.mobile.changePage('#inscription-parent', { transition: 'flip'} );
	$.mobile.hidePageLoadingMsg();
}
});
$("#geo-of-parent").geocomplete({componentRestrictions: { country: 'fr' }, details: "#search-parent",
  detailsAttribute: "data-geo"})
      .bind("geocode:result", function(event, result){
      })
      .bind("geocode:error", function(event, status){
      })
      .bind("geocode:multiple", function(event, results){
      });
$("#geo-of-parent").trigger("geocode");
	  
	  //initializing geocomplete for search section
	
$("#pgeo").geocomplete({componentRestrictions: { country: 'fr' }, details: "#mapform-parent",
  detailsAttribute: "data-geo"})
      .bind("geocode:result", function(event, result){
      })
      .bind("geocode:error", function(event, status){
      })
      .bind("geocode:multiple", function(event, results){
      });
$("#pgeo").trigger("geocode");
	  
	  
  $("#kgeo").geocomplete({componentRestrictions: { country: 'fr' }, details: "#mapform-kid",
detailsAttribute: "data-geo"})
  .bind("geocode:result", function(event, result){
   // $.log("Result: " + result.formatted_address);
  })
  .bind("geocode:error", function(event, status){
  //  $.log("ERROR: " + status);
  })
  .bind("geocode:multiple", function(event, results){
   // $.log("Multiple: " + results.length + " results found");
  });
  $("#kgeo").trigger("geocode");
  
  $("#geo-of-sitter").geocomplete({componentRestrictions: { country: 'fr' }, details: "#search-sitter",
detailsAttribute: "data-geo"})
  .bind("geocode:result", function(event, result){
   // $.log("Result: " + result.formatted_address);
  })
  .bind("geocode:error", function(event, status){
  //  $.log("ERROR: " + status);
  })
  .bind("geocode:multiple", function(event, results){
   // $.log("Multiple: " + results.length + " results found");
  });
  $("#geo-of-sitter").trigger("geocode");
	  
	  
	  //planning table
	  
	$('#fiche,#fiche-edit-planning').find('td:not(.left-border)').click(function()
	{
		var dat=$(this).find('div > input[type=checkbox]').attr('checked');
		if(dat=="checked")
		{
			$(this).removeClass('check');
			$(this).find('div > input[type=checkbox]').attr('checked',false);
		}
		else
		{
			$(this).addClass('check');
			$(this).find('div > input[type=checkbox]').attr('checked',true);
		}
	});
});

//checking if logged in or not in app start------------------------------------------------------
function onDeviceReady() {
	if (!window.cordova) {
		var appId = "865266050150720";
		facebookConnectPlugin.browserInit(appId);
	}
	document.addEventListener("backbutton", onBackKeyDown, false);
	if(window.localStorage['loggedin']=='1')
	{
		$.mobile.showPageLoadingMsg();
		$(".home-concept").css("display","block");
		if(window.localStorage['user_type']=='user_sitter')
		{
			$('#home-cgu').text('');
			$('#home-cgu').text('C.G.U. Kidssitter');
			$('#near-kid li').remove();
			var list=[];
			list=JSON.parse(window.localStorage['user_listing_data']);
				if(list != null)
				{
					var j=0;
					$.each(list,function(index,value)
					{
						//console.log(value.urgence);
						var urgence,premium;
						if(value.urgence == true)
						{
							urgence="display:block";
						}
						else
						{
							urgence="display:none";
						}
						
						if(value.lname != null)
						{
							var lname=value.lname.substring(0,1)+".";
						}
						else
						{
							var lname="";
						}
						if(value.premium !=null)
						{
							var diffDays=get_date_diff(value.premium.endDate.date,value.server);
							
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
						
						
						var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'parent\')"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
							$("#near-kid").append(htmls);
						
					});
					
				}else
				{
					var htmls='<li class="result"><h4 style="text-align:center">No Result Found.</h4></li>';
					$("#near-kid").html(htmls);
				}
				if(window.localStorage['address'] != "")
				{
					$("#kgeo").geocomplete("find",window.localStorage['address']);
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
			$('#home-cgu').text('');
			$('#home-cgu').text('C.G.U. Parent');
			$('#near-parent li').remove();
			var list=[];
			list=JSON.parse(window.localStorage['user_listing_data']);
			if(list != null)
			{
				var j=0;
				$.each(list,function(index,value){
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
					var lname=value.lname.substring(0,1)+".";
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
				var user_type="sitter";
				var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'sitter\')"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
					$("#near-parent").append(htmls);
					
				});
			}else
			{
				var htmls='<li class="result"><h4 style="text-align:center">No Result Found.</h4></li>';
				$("#near-parent").html(htmls);
			}
			if(window.localStorage['address'] != "")
			{
				$("#pgeo").geocomplete("find",window.localStorage['address']);
				$('#pgeo').trigger('geocode');
				//alert("geoloc");
			}else{
				$("#pgeo").css("display","block");
				//alert("no geoloc");
			}
			
			$.mobile.hidePageLoadingMsg();
			$.mobile.changePage("#listing-kid",{transition:"flip"});
		}
		$('.logout').css('display','block');
	}
	else
	{
		$('.logout').css('display','none');
	}
	
	
}

 $(function(){

    $("#geocomplete").geocomplete({componentRestrictions: { country: 'fr' }, details: "#mapform",
  detailsAttribute: "data-geo"})
      .bind("geocode:result", function(event, result){
       // $.log("Result: " + result.formatted_address);
      })
      .bind("geocode:error", function(event, status){
      //  $.log("ERROR: " + status);
      })
      .bind("geocode:multiple", function(event, results){
       // $.log("Multiple: " + results.length + " results found");
      });

   
$("#geocomplete").trigger("geocode");


  });
  
  $(function(){

    $("#geocomplete1").geocomplete({componentRestrictions: { country: 'fr' }, details: "#mapform1",
  detailsAttribute: "data-geo"})
      .bind("geocode:result", function(event, result){
       // $.log("Result: " + result.formatted_address);
      })
      .bind("geocode:error", function(event, status){
      //  $.log("ERROR: " + status);
      })
      .bind("geocode:multiple", function(event, results){
       // $.log("Multiple: " + results.length + " results found");
      });
	  $("#geocomplete1").trigger("geocode");

    
  });
//login function---------------------------------------------------------------------------------------------
function login_check()
{
	
	var uname= $('#email').val();
	var pwd=$('#password').val();
	var error_flag=0;
	if(uname == '')
	{
		$('#email').css('border-color','red');
		error_flag+=1;
	}
	if(pwd=='')
	{
		$('#password').css('border-color','red');
		error_flag+=1;
	}

	if(error_flag>0)
	{
		alert('Please enter your username and password properly');
	}
	else
	{
		$.mobile.showPageLoadingMsg();	
		$.ajax({
		 type: "POST",
			url: "http://codeuridea.net/kidssitter/getlogin",
			data:{_name:uname,_password:pwd},
			dataType: "json",
			crossDomain: true,
			success: function(data)
			{
				if(data.result== "true")
				{
					window.localStorage["username"]=uname;
					window.localStorage["password"]=pwd;
					window.localStorage['loggedin']='1';
					window.localStorage['user_type']=data.type;
					window.localStorage['user_listing_data']=JSON.stringify(data.result_arr);
					window.localStorage['address']=data.user_lat;
					window.localStorage['userdata']=JSON.stringify(data.user_data);
					window.localStorage['planning']=JSON.stringify(data.user_data['planning']);
					//alert(window.localStorage['planning']);
					$('input:checkbox[name="planning[]"]:checked').each(function() 
					{
						$(this).attr('checked',false);
					});
					if(data.type=="user_sitter")
					{
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
									var lname=value.lname.substring(0,1)+".";
								}
								else
								{
									var lname="";
								}
								
								
								var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'parent\')"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
									$("#near-kid").append(htmls);
								
							});
						}else
						{
							var htmls='<li class="result"><h4  style="text-align:center">No Result Found.</h4></li>';
							$("#near-kid").html(htmls);
						}
						
							$("#kgeo").geocomplete("find",data.user_lat);
							$('#kgeo').trigger('geocode');
							//alert("geoloc");
						$.mobile.hidePageLoadingMsg();
						$.mobile.changePage("#listing-parents",{transition:"flip"});
						}
						else
						{
							$('#near-parent li').remove();
							if(data.result_arr != null)
							{
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
									var lname=value.lname.substring(0,1)+".";
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
								
								var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'sitter\')"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
									$("#near-parent").append(htmls);
									
								});
							}else
							{
								var htmls='<li class="result"><h4  style="text-align:center">No Result Found.</h4></li>';
								$("#near-parent").html(htmls);
							}
							
								$("#pgeo").geocomplete("find",data.user_lat);
								$('#pgeo').trigger('geocode');
							$.mobile.hidePageLoadingMsg();
							$.mobile.changePage("#listing-kid",{transition:"flip"});
						}
						$('.logout').css('display','block');
					}
					else
					{
						$.mobile.hidePageLoadingMsg();
						window.localStorage["username"]="";
						window.localStorage["password"]="";
						window.localStorage['loggedin']='0';
						window.localStorage['user_type']="";
						alert("You have entered wrong username or password.Please try again.");
					}
			}
			
		});
		
	}
}
   
function checkPreAuth()
{
   if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
       $("#email").val(window.localStorage["username"]);
       $("#password").val(window.localStorage["password"]);
      login_check();
    }
}
 

 
  
 //registration-parent------------------------------------------------


function register_user_parent()
{
	$.mobile.showPageLoadingMsg();
	var lat=$('input[name="lat"]').val();
	var lng= $('input[name="lng"]').val();
	var email=$('input[name="email"]').val();
	var password=$('input[name="password"]').val();
	var cpwd=$('input[name="cpassword"]').val();
	var fname=$('input[name="fname"]').val();
	var lname=$('input[name="lname"]').val();
	var address=$('input[name="geocomplete"]').val();
	var locality=$('input[name="locality"]').val();
	var country=$('input[name="country"]').val();
	var birthdate=$('input[name="birthdate"]').val();
	var error_flag="0";
	if(email=='' || password=='' || cpwd == '' || fname == '' || lname == ''|| address == ''||birthdate=='')
	{
		$.mobile.hidePageLoadingMsg();
		alert("please fill up all the fields.");
		if(email=='')
		{
			$('input[name="email"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="email"]').parent('div').css('border','none');
		}
		if(password=='')
		{
			$('input[name="password"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="password"]').parent('div').css('border','none');
		}
		if(cpwd=='')
		{
			$('input[name="cpassword"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="cpassword"]').parent('div').css('border','none');
		}
		if(fname=='')
		{
			$('input[name="fname"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="fname"]').parent('div').css('border','none');
		}
		if(lname=='')
		{
			$('input[name="lname"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="lname"]').parent('div').css('border','none');
		}
		if(birthdate=='')
		{
			$('input[name="birthdate"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="birthdate"]').parent('div').css('border','none');
		}
		if(address=='')
		{
			$('input[name="geocomplete"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="geocomplete"]').parent('div').css('border','none');
		}
	}

	else{
	
			if(password!=cpwd)
			{
				$.mobile.hidePageLoadingMsg();
				alert('confirmation password did not matched.');
				$('input[name="password"]').parent('div').css('border-color','red');
				$('input[name="cpassword"]').parent('div').css('border-color','red');
			}
			else
			{
				$.ajax({
						 type: "POST",
							url: "http://codeuridea.net/kidssitter/getregister-parent",
							data:{lat:lat,lng:lng,password:password,fname:fname,lname:lname,address:address,locality:locality,country:country,birthdate:birthdate,email:email},
							dataType: "json",
							crossDomain: true,
							success: function(data)
							{
							if(data.result== true)
							{
								$.mobile.hidePageLoadingMsg();
								//alert("Registration Successful");
								//$.mobile.changePage('#connexion',{transition:'flip'});
								$('#email').val(email);
								$('#password').val(password);
								login_check();
							}
							else
							{
								$.mobile.hidePageLoadingMsg();
								alert(data.msg);
							}
							}
				   });
		} 
	}
}

//registration-Sitter-----------------------------------------------------------


function register_user_sitter()
{
	$.mobile.showPageLoadingMsg();
	var lat=$('input[name="s_lat"]').val();
	var lng= $('input[name="s_lng"]').val();
	var email=$('input[name="s_email"]').val();
	var password=$('input[name="s_password"]').val();
	var cpwd=$('input[name="s_cpassword"]').val();
	var fname=$('input[name="s_fname"]').val();
	var lname=$('input[name="s_lname"]').val();
	var address=$('input[name="s_geocomplete"]').val();
	var locality=$('input[name="s_locality"]').val();
	var country=$('input[name="s_country"]').val();
	var birthdate=$('input[name="s_birthdate"]').val();
	var error_flag="0";
	if(email=='' || password=='' || cpwd == '' || fname == '' || lname == ''|| address == ''||birthdate=='')
	{
		$.mobile.hidePageLoadingMsg();
		alert("please fill up all the fields.");
		if(email=='')
		{
			$('input[name="s_email"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_email"]').parent('div').css('border','none');
		}
		if(password=='')
		{
			$('input[name="s_password"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_password"]').parent('div').css('border','none');
		}
		if(cpwd=='')
		{
			$('input[name="s_cpassword"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_cpassword"]').parent('div').css('border','none');
		}
		if(fname=='')
		{
			$('input[name="s_fname"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_fname"]').parent('div').css('border','none');
		}
		if(lname=='')
		{
			$('input[name="s_lname"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_lname"]').parent('div').css('border','none');
		}
		if(birthdate=='')
		{
			$('input[name="s_birthdate"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_birthdate"]').parent('div').css('border','none');
		}
		if(address=='')
		{
			$('input[name="s_geocomplete"]').parent('div').css('border-color','red');
		}
		else
		{
			$('input[name="s_geocomplete"]').parent('div').css('border','none');
		}
	}

	else
	{
		if(password!=cpwd)
		{
			$.mobile.hidePageLoadingMsg();
			alert('confirmation password did not matched.');
			$('input[name="s_password"]').parent('div').css('border-color','red');
			$('input[name="s_cpassword"]').parent('div').css('border-color','red');
		}
		else
		{
			$.ajax({
					 type: "POST",
						url: "http://codeuridea.net/kidssitter/getregister-sitter",
						data:{lat:lat,lng:lng,password:password,fname:fname,lname:lname,address:address,locality:locality,country:country,birthdate:birthdate,email:email},
						dataType: "json",
						crossDomain: true,
						success: function(data)
						{
						if(data.result== true)
						{
							$.mobile.hidePageLoadingMsg();
							//alert("Registration Successful");
							//$.mobile.changePage('#connexion',{transition:'flip'});
							$('#email').val(email);
							$('#password').val(password);
							login_check();
						}
						else
						{
							$.mobile.hidePageLoadingMsg();
							alert(data.msg);
						}
						}
			   });
		 }
	}
} 


//concept page navigation-------------------------------------------------------------------------------

function go_concept()
{
	if(window.localStorage['user_type']=='user_sitter')
	{
		$.mobile.changePage('#concept-kid',{transition:'flip'});
	}
	else
	{
		$.mobile.changePage('#concept-parent',{transition:'flip'});
	}
}


//homepage CGU navigation-----------------------------------------------------------------------------------
function home_cgu_navigation()
{
	if(window.localStorage['user_type'] == 'user_sitter')
	{
		$.mobile.changePage('#cgu-kid',{transition:'flip'});
	}
	else if(window.localStorage['user_type'] == 'user_parent')
	{
		$.mobile.changePage('#cgu-parent',{transition:'flip'});
	}
	else
	{
		$.mobile.changePage('#cgu',{transition:'flip'});
	}
}


//-------------------------------------------------------------faq Page Navigation
function faq_nav()
{
	if(window.localStorage['user_type'] == 'user_sitter')
	{
		$.mobile.changePage('#faq-kid',{transition:'flip'});
	}
	else
	{
		$.mobile.changePage('#faq-parent',{transition:'flip'});
	}
	
}
//---------------------------------------------------------------------------------------------------
//offers page navigation
function offeres_nav()
{
	if(window.localStorage['user_type'] == 'user_sitter')
	{
		$.mobile.changePage('#offres-sitter',{transition:'flip'});
	}
	else
	{
		$.mobile.changePage('#offres-parents',{transition:'flip'});
	}
	
}

//-----------------------------------------------------------------------------------------
//search in parent profile

	function additional_search()
	{	
		$.mobile.showPageLoadingMsg();
		var location=$('#pgeo').val();
		//alert(location);
		if(location == "")
		{
			alert('Please enter a location to search');
		}
		else
		{
			 $("#geo-of-parent").geocomplete('find',location);
			 $("#geo-of-parent").trigger("geocode");
			 $.mobile.hidePageLoadingMsg();
			 $.mobile.changePage('#recherche',{transition:'flip'});
		}
	}
	
	function submit_search_parent()
	{
		$.mobile.showPageLoadingMsg();
		var datas = $("#search-parent").serialize();
		console.log(datas);
		var edu=$("#p_edu :radio:checked").val();
		var type=$("#p_type :radio:checked").val();
		var gender=$("#gp_gender").val();
		var lat=$("input[name=gp_lat]").val();
		var lng=$("input[name=gp_lng]").val();
		var address=$("input[name=gp_address]").val();
		var distance=$("input[name=gp_distance]").val();
		var language=$("input[name=gp_language]").val();
		var pdata=[];
		$('input:checkbox[name="planning[]"]:checked').each(function() 
		{
		   pdata.push($(this).val());
		});
		
		$.ajax({

              url: "http://codeuridea.net/kidssitter/search/sitter-app",
              data:{'gp_education':edu,'gp_type':type,'gp_address':address,'gp_lat':lat,'gp_lng':lng,'gp_language':language,'gp_distance':distance,'p_gender':gender,'planning':pdata},
              dataType: 'json',
              type: 'GET',
              crossDomain: true,
              error: function (xhr, ajaxOptions, thrownError) {
                    alert('error');

                },
              success: function(data)
			  { 
                    if(data.success == true)
					{
						$('#near-parent li').remove();
						var addr=$('#geo-of-parent').val();
						window.localStorage['user_listing_data']=JSON.stringify(data.result);
						window.localStorage['address']=addr;
						if(data.result != null)
						{
							
							var j=0;
							$.each(data.result,function(index,value){
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
								var lname=value.lname.substring(0,1)+".";
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
							
							var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'sitter\')"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
								$("#near-parent").append(htmls);
								
							});
						}
						else{
						
							var htmls="<li class='result'><h4  style='text-align:center'>No Result Found.</h4></li>";
							$("#near-parent").html(htmls);
						}
						$("#pgeo").geocomplete("find",addr);
						$('#pgeo').trigger('geocode');
						$.mobile.hidePageLoadingMsg();
						$.mobile.changePage('#listing-kid',{transition:'flip'});
					}
                }
            });
			

	}
	
	
//search in sitter profile
function additional_search_sitter()
	{
		$.mobile.showPageLoadingMsg();
		var location=$('#kgeo').val();
		if(location == "")
		{
			alert('Please enter a location to search');
		}
		else
		{
			 $("#geo-of-sitter").geocomplete('find',location);
			 $("#geo-of-sitter").trigger("geocode");
			 $.mobile.hidePageLoadingMsg();
			 $.mobile.changePage('#recherche-kid',{transition:'turn'});
		}
	}
function submit_search_sitter()
	{	
		$.mobile.showPageLoadingMsg();
		var type=$("#s_type :radio:checked").val();
		var lat=$("input[name=gs_lat]").val();
		var lng=$("input[name=gs_lng]").val();
		var address=$("input[name=gs_address]").val();
		var distance=$("input[name=gs_distance]").val();
		var pdata=[];
		$('input:checkbox[name="planning[]"]:checked').each(function() 
		{
		   pdata.push($(this).val());
		});
		
		$.ajax({

				  url: "http://codeuridea.net/kidssitter/search/parent-app",
				  data:{'gp_type':type,'gp_address':address,'gp_lat':lat,'gp_lng':lng,'gp_distance':distance,'planning':pdata},
				  dataType: 'json',
				  type: 'GET',
				  crossDomain: true,
				  error: function (xhr, ajaxOptions, thrownError) {
						alert('error');

					},
				  success: function(data){ 
						if(data.success == true)
						{
							$('#near-kid li').remove();
							var addr=$('#geo-of-sitter').val();
							window.localStorage['user_listing_data']=JSON.stringify(data.result);
							window.localStorage['address']=addr;
							if(data.result != null)
							{
								//alert('1');
								var j=0;
								$.each(data.result,function(index,value)
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
									
									if(value.premium != null)
									{
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
										var lname=value.lname.substring(0,1)+".";
									}
									else
									{
										var lname="";
									}
									var htmls='<li class="result"><a href="#" onclick="get_profile_details('+value.id+',\'parent\')"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" ></div></a></li>';
									
										$("#near-kid").append(htmls);
								});
							}
							else{
						
							var htmls="<li class='result'><h4  style='text-align:center'>No Result Found.</h4></li>";
							$("#near-kid").html(htmls);
							}
							$("#kgeo").geocomplete("find",addr);
							$('#kgeo').trigger('geocode');
							$.mobile.hidePageLoadingMsg();
							$.mobile.changePage('#listing-parents',{transition:'flip'});
						}
					}
            });
			

	}
	
//Sitter Profile viewed by Parent
	
function get_profile_details(id,user_type)
{
	var s_id=id;
	 $.mobile.showPageLoadingMsg();
	 //alert(user_type);
	 if(user_type == "sitter")
	 {
		var distance=$('#sitter-distance-'+s_id).val();
		var url="http://codeuridea.net/kidssitter/profile-sitter";	
		$('#contact-button').removeClass('btn-blue');
		$('#contact-button').addClass('btn-red');
		$('#comment-count').css('display','block');
		$('#fiche-sitter-profile').find('.annonce').eq(1).css("display","block");
		$('#fiche-sitter-profile').find('.title').eq(1).css("display","block");
		//$('#fiche-sitter-profile .user').find('.h1:first').css('color','#cb4e5d','important');
	 }
	 else
	 {
		var distance=$('#parent-distance-'+s_id).val();
		var url="http://codeuridea.net/kidssitter/profile-parent";	
		//var url="http://192.168.1.34/kidssitter-prev/profile-parent";	
		$('#contact-button').removeClass('btn-red');
		$('#contact-button').addClass('btn-blue');
		$('#comment-count').css('display','none');
		$('#fiche-sitter-profile').find('.annonce').eq(1).css("display","none");
		$('#fiche-sitter-profile').find('.title').eq(1).css("display","none");
		//$('#fiche-sitter-profile .user').find('.h1:first').css('color',"");
	 }
	$('#s_id').val(id);
	//var url="http://codeuridea.net/kidssitter/profile-parent";	
	var user=JSON.parse(window.localStorage['userdata']);
	$.ajax({
		 type: "POST",
            url: url ,
			data:{'id':s_id,'user':user.id},
            dataType: "json",
			crossDomain: true,
            success: function(data)
			{
				$('.user').find('img:not(.photo)').css("display","none");
				$('.photo > img').css('display','block');
				if(user_type == 'sitter')
				{
					$('#fiche-sitter-profile').find('h1:first').text(" Fiche Sitter");
					if(data.result.verified == true) //for verified profile
					{
						
						$('.user').find('img[src="./images/verifie.png"]').css("display","block");
						
					}
					else
					{
						
						$('.user').find('img[src="./images/verifie.png"]').css("display","none");
					}
					
					if(data.result.certified == true) //for certified profile
					{
						
						$('.user').find('img[src="./images/profil-certifire.png"]').css("display","block");
					}
					else
					{
						
						$('.user').find('img[src="./images/profil-certifire.png"]').css("display","none");
					}
				
					$('.user').find('.sitter_age').html("");
					if(data.result.age != null)
					{
						$('.user').find('.sitter_age').html(data.result.age+' ans');
					}
					$('.user').find('.sitter_kids').html("");
					if(data.result.kidmax != null || data.result.kidmin != null)
					{
						$('.user').find('.sitter_kids').html('Entre '+data.result.kidmin+' et '+data.result.kidmax+' ans');
					}
					$('.user').find('.type_sitter').html("");
					if(data.result.type_sitter != null)
					{
						$('.user').find('.type_sitter').html(data.result.type_sitter+" - "+data.result.locality);
					}
					else
					{
						$('.user').find('.type_sitter').html(data.result.locality);
					}
					$('#fiche-sitter-profile .user').find('.m > span').html("");
					$('#fiche-sitter-profile .user').find('.m > span').html(distance+'KM');
					$('.user').find('.sitter_rate').html("");
					if(data.result.rate != null)
					{
						$('.user').find('.sitter_rate').html(data.result.rate+'&euro;/H');
					}
					$('.comment-count').html("");
					$('#fiche-sitter-profile .comment-count').html(data.result.comments);
					$('#fiche-sitter-profile').find('.sitter_country').html("");
					if(data.result.nationality != null)
					{
						$('#fiche-sitter-profile').find('.sitter_country').html("Nationalit&eacute;:"+data.result.nationality);
					}
					$('#fiche-sitter-profile').find('.sitter_native_lang').html("");
					if(data.result.native != null)
					{
						$('#fiche-sitter-profile').find('.sitter_native_lang').html("Langue maternelle:"+data.result.native);
					}
					$('#fiche-sitter-profile').find('.sitter_exp').html("");
					if(data.result.experience != null)
					{
						$('#fiche-sitter-profile').find('.sitter_exp').html("Exp&eacute;rience:"+data.result.experience);
					}
					$('#fiche-sitter-profile').find('.sitter_edu').html("");
					if(data.result.education != null)
					{
						$('#fiche-sitter-profile').find('.sitter_edu').html("Niveau d'&eacute;tudes:"+data.result.education);
					}
					if(data.result.second_lang != null)
					{
						$('#fiche-sitter-profile').find('.sitter_second_lang').html("");
						$('#fiche-sitter-profile').find('.sitter_second_lang').html(data.result.second_lang);
						if(data.result.third_lang != null)
						{
							$('#fiche-sitter-profile').find('.sitter_second_lang').append(' ,'+data.result.third_lang);
						}
					}
					else
					{
						$('#fiche-sitter-profile').find('.sitter_second_lang').html("");
						
					}
				}
				else
				{
					$('#fiche-sitter-profile').find('h1:first').text(" Fiche Parent");
					if(data.result.premium != null)  //for premium user
					{
						var diffDays=get_date_diff(data.result.premium.endDate.date,data.result.server);
						
						if(diffDays<=0)
						{
							$('.user').find('img[src="./images/premium.png"]').css("display","block");
							
						}
						else
						{
							$('.user').find('img[src="./images/premium.png"]').css("display","none");
						}
					}
					else
					{
						$('.user').find('img[src="./images/premium.png"]').css("display","none");
					}
					$('.user').find('.sitter_age').html("");
					$('.user').find('.sitter_age').html(data.result.kids_number+" enfants");
					if(data.result.kids_number == 0)
					{
						$('.user').find('.sitter_kids').html("");
					}
					else
					{
						var kids="";
						for(i=0;i<data.result.kids.length;i++)
						{
							var kids=data.result.kids[i]+" ans,";
						};
						var kids_age= kids.slice(0,-1); //Removing the last comma from the string
						$('.user').find('.sitter_kids').html("");
						$('.user').find('.sitter_kids').html(kids_age);
					}
					$('.user').find('.type_sitter').html("");
					if(data.result.type_sitter != null)
					{
						$('.user').find('.type_sitter').html("Parent cherchant "+data.result.type_sitter+" -"+data.result.locality);
					}
					else
					{
						$('.user').find('.type_sitter').html("Parent cherchant -"+data.result.locality);
					}
					$('#fiche-sitter-profile .user').find('.m > span').html("");
					$('#fiche-sitter-profile .user').find('.m > span').html(distance+'KM');
					$('.user').find('.sitter_rate').html("");
					$('.comment-count').html("");
					$('#fiche-sitter-profile').find('.annonce:first').html("");
					$('#fiche-sitter-profile').find('.annonce:first').html(data.result.annonce);
					$('#fiche-sitter-profile').find('.sitter_country').html("");
					$('#fiche-sitter-profile').find('.sitter_native_lang').html("");
					$('#fiche-sitter-profile').find('.sitter_exp').html("");
					$('#fiche-sitter-profile').find('.sitter_edu').html("");
				}
				$('#fiche-sitter-profile .user').find('.photo').attr("src","");
				$('#fiche-sitter-profile .user').find('.photo').attr("src",data.result.src);
				$('.user').find('.sitter_name').html("");
				$('.star').children('i').removeClass('favourite');
				if(data.result.fav == true)
				{
					$('.star').children('i').addClass('favourite');
				}
				else
				{
					$('.star').children('i').removeClass('favourite');
				}
				if(data.result.lname != null)
				{
					$('.user').find('.sitter_name').html(data.result.fname+' '+data.result.lname);
				}
				else
				{
					$('.user').find('.sitter_name').html(data.result.fname);
				}
				
				
				//only for contact pages
				$('#fiche-sitter-contact').find('.sitter_annonce').html("");
				$('#fiche-sitter-contact').find('.sitter_annonce').html(data.result.annonce);
				$('#fiche-sitter-contact .user').find('.photo > img').attr("src","");
				$('#fiche-sitter-contact .user').find('.photo > img').attr("src",data.result.src);
				$('#fiche-sitter-contact').find('.smile-icon > li > span').addClass('r'+data.result.rating);
				$('#fiche-sitter-profile .comment-count').html('('+data.result.comments+')');
				//only for plan table
				var i=0;
				$('#plan_table').find('td').removeClass('check');
				var list=[];
				list=data.result.planning;
				var len=list.length;
				for(i=0;i<list.length;i++)
				{
					$('#td_'+data.result.planning[i]).addClass('check');
				}
				$.mobile.hidePageLoadingMsg();
				$.mobile.changePage('#fiche-sitter-profile',{transition:'flip'});
				
				
			}
   });
}
//getting user details-------------------------------------------------- 
function getdetails()
{
	if(window.localStorage['user_type']== "user_parent")
	{
		$('a[name=s_telephone]').text("");
		$('a[name=s_telephone]').text("Telephone");
		$('a[name=s_telephone]').attr("href","#");
		$('a[name=s_skype]').text("");
		$('a[name=s_skype]').text("Skype");
		$.mobile.changePage('#fiche-sitter-contact',{transition:'flip'});
	}
	else
	{
		
		$('#send_messge_parent').popup('open');
	}
	
}

//get phone number-----------------------------------------------------------------------------
function get_phone(link)
{
	var id=$('#s_id').val();
	var quota= JSON.parse(window.localStorage['userdata']);
	//alert(quota.remained_message);
	if(quota.subscription !=null)
	{
		var diffDays=get_date_diff(quota.subscription.endDate.date,quota.server);
		var message;
		if(diffDays<=0)
		{
			message="yes";
			
		}
		else
		{
			message="no";
		}
		
	}
	else
	{
		if(quota.remained_message > 0)
		{
			message="yes";
		}
		else
		{
			message="no";
		}
	}
	if(message == 'yes')
	{
	
		$.ajax({
				type: "POST",
				url: "http://codeuridea.net/kidssitter/phone/get/"+id,
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					//alert(data.phone);
					if(data.phone != null)
					{
						 location.href ='tel:'+data.phone+'';
					}
					else
					{
						$(link).text("");
						$(link).text("Non renseigné");
					}
				}
			});
	}
	else
	{
		alert("please subscribe as premium user to view the details");
	}
	

}


//get skype-------------------------------------------------------------------------
function get_skype(link)
{
	var quota= JSON.parse(window.localStorage['userdata']);
	var id=$('#s_id').val();
	//alert(quota.remained_message);
	
	if(quota.subscription !=null)
	{
		var diffDays=get_date_diff(quota.subscription.endDate.date,quota.server);
		var message;
		if(diffDays<=0)
		{
			message="yes";
			
		}
		else
		{
			message="no";
		}
		
	}
	else
	{
		if(quota.remained_message > 0)
		{
			message="yes";
		}
		else
		{
			message="no";
		}
	}
	if(message == "yes" )
	{
		$.ajax({
				type: "POST",
				url: "http://codeuridea.net/kidssitter/skype/get/"+id,
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					//$(link).attr('href','tel:'+data.phone+'');
					if(data.skype != null)
					{
						$(link).text("");
						$(link).text(data.skype);
					}
					else
					{
						$(link).text("");
						$(link).text("Non renseigné");
					}
				}
			});
	}
	else
	{
		alert("please subscribe as premium user to view the details");
	}


}
//function to get time difference-------------------------------------------------------------------------------------------
function get_date_diff(start,end)
{
	var date1 = start;
	var dat = date1.replace(/-/g,'/');
	var date1 = new Date(dat);
	var date2 = new Date(end);
	var timeDiff = date2.getTime() - date1.getTime();
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return diffDays;
}
//handle device back with app back--------------------------------------------------------------------
function onBackKeyDown(e) {
	e.preventDefault();
	$( ".datepick" ).datepicker("hide");
    $(".back-link").trigger("click");
}

//profile page related common functions----------------------------------------------------------------------
function add_report()
{
	var comment=$('#add_report').val();
	var target_id=$('#s_id').val();
	if(comment == '')
	{
		alert('please enter some text');
	}
	else
	{
		$('#popupReport').popup('close');
		$.mobile.showPageLoadingMsg();
		var user=[];
		user=JSON.parse(window.localStorage['userdata']);
		$.ajax({
					type: "POST",
					url: "http://codeuridea.net/kidssitter/report-profile/add",
					data:{'user_id':user.id,'comment':comment,'target_id':target_id},
					dataType: "json",
					success: function(data)
					{
						alert('Signalement envoyé');
						$('#add_report').val('');
						$.mobile.hidePageLoadingMsg();
						
					}
				});
	}
}
function view_profile() //profile-navigation
{
	if(window.localStorage['user_type'] == 'user_parent')
	{
		view_my_profile_parent();
	}
	else
	{
		view_my_profile_sitter();
	}
}

function edit_planning() //edit-planning
{
	$.mobile.showPageLoadingMsg();
	var pdata=[];
	$('input:checkbox[name="e_planning[]"]:checked').each(function() 
	{
	   pdata.push($(this).val());
	});
	var user=JSON.parse(window.localStorage['userdata']);
	$.ajax({
				type: "POST",
				url: "http://codeuridea.net/kidssitter/edit-planning/"+user.id,
				data:{'planning':pdata},
				dataType: "json",
				success: function(data)
				{
					
					window.localStorage['planning']=JSON.stringify(data.plan);
					$.mobile.hidePageLoadingMsg();
					alert("Planning Changed Successfully");
					if(window.localStorage['user_type'] != 'user_sitter')
					{
						$.mobile.changePage('#fiche-parents',{transition:'flip'});
					}
					else
					{
						$.mobile.changePage('#fiche-kid',{transition:'flip'});
					}
					view_planning();
				}
			});
}

function view_planning()
{
	
	$('#fiche-edit-planning').find('input:checkbox[name="e_planning[]"]:checked').each(function() 
	{
		$(this).attr('checked',false);
	});
	$('#fiche-edit-planning').find('td').removeClass('check');
	var plan=[];
	plan=JSON.parse(window.localStorage['planning']);
	//alert(plan);
	for(i=0;i<plan.length;i++)
	{
		$('#fiche-edit-planning').find('#e_planning_'+plan[i]).attr('checked',true);
		$('#fiche-edit-planning').find('#e_planning_'+plan[i]).parent('div').parent('td').addClass('check');
	}
	
	
}

function view_annonce() //view annonce page
{
	var user=[];
	user=JSON.parse(window.localStorage['userdata']);
	if(user['profile_enabled'] == true)
	{
		$('#flip-min').val("on");
	}
	else
	{
		$('#flip-min').val("off");
	}
	//alert(user['annonce']);
	$('#user-annonce').html('');
	$('#user-annonce').html(user['annonce']);
	$('#edit_annonce').val('');
	$('#edit_annonce').val(user['annonce']);
	//this section is for parent
	if(window.localStorage['user_type'] == "user_sitter")
	{
		$('#modifier-annonce').find('.block').css('display','none');
	}
	else
	{
		$('#modifier-annonce').find('.block').css('display','block');
		if(user.premium != null)
		{
			var diffDays=get_date_diff(user.premium.endDate.date,user.server);
			var premium;
			if(diffDays<=0)
			{
				window.localStorage['premium']="yes";
				
			}
			else
			{
				window.localStorage['premium']="no";
			}
		}
		else
		{
			window.localStorage['premium']="no";
		}
		
	}
	$.mobile.changePage('#modifier-annonce',{transition:'flip'});
}

function change_status_annonce(data) //change publish status
{
	$.mobile.showPageLoadingMsg();
	var user=[];
	user=JSON.parse(window.localStorage['userdata']);
	$.ajax({
				type: "POST",
				url: "http://codeuridea.net/kidssitter/change-activation-status/"+user.id,
				dataType: "json",
				success: function(data)
				{
					var user=[];
					user=JSON.parse(window.localStorage['userdata']);
					user['profile_enabled']=data.status;
					window.localStorage['userdata']=JSON.stringify(user);
					$.mobile.hidePageLoadingMsg();
					alert("Status Changed Successfully");
					if(window.localStorage['user_type'] != 'user_sitter')
					{
						$.mobile.changePage('#fiche-parents',{transition:'flip'});
					}
					else
					{
						$.mobile.changePage('#fiche-kid',{transition:'flip'});
					}
				}
			});
}

function modify_annonce() // modifying annonce
{
	
	var annonce=$('#edit_annonce').val();
	if(annonce == '')
	{
		alert('please enter some text');
	}
	else
	{
		$('#popupAnnonce').popup('close');
		$.mobile.showPageLoadingMsg();
		var user=[];
		user=JSON.parse(window.localStorage['userdata']);
		$.ajax({
					type: "POST",
					url: "http://codeuridea.net/kidssitter/edit-annonce/"+user.id,
					data:{'annonce':annonce},
					dataType: "json",
					success: function(data)
					{
						user['annonce']=data.annonce;
						window.localStorage['userdata']=JSON.stringify(user);
						$('#user-annonce').html('');
						$('#user-annonce').html(user['annonce']);
						$('#edit_annonce').val('');
						$('#edit_annonce').val(user['annonce']);
						$.mobile.hidePageLoadingMsg();
						
					}
				});
			}
}
//My Profile Page (Parent)-----------------------------------------------------------------------------------------

function view_my_profile_parent()
{
	if(window.localStorage['loggedin'] == '1')
	{
		var userdetails=[];
		userdetails=JSON.parse(window.localStorage['userdata']);
		var lname,kids,type,phone,skype,premium;
		if(userdetails.lastname != null)
		{
			lname=userdetails.lastname;
		}
		else
		{
			lname="";
		}
		if(userdetails.type_sitter != null)
		{
			type=userdetails.type_sitter+" - ";
		}
		else
		{
			type="";
		}
		if(userdetails.kids != 0)
		{
			
			for(i=0;i<userdetails.kids.length;i++)
			{
				var kids_age_arr=userdetails.kids[i]+" ans,";
			};
			var kids_age= kids_age_arr.slice(0,-1); 
			kids=userdetails.kids.length+' enfants - Agé'+kids_age;
		}
		else
		{
			kids=userdetails.kids+' enfants ';
		}
		if(userdetails.phone != null)
		{
			phone=userdetails.phone;
		}
		else
		{
			phone="";
		}
		
		if(userdetails.skype != null)
		{
			skype='Skype :'+userdetails.skype;
		}
		else
		{
			skype="";
		}
		if(userdetails.premium != null)
		{
			var diffDays=get_date_diff(userdetails.premium.endDate.date,userdetails.server);
			if(diffDays<=0)
			{
				premium="Premium";
				$('#fiche-parents').find('.abonnement').css('display','none');
			}
			else
			{
				premium="Gratuit ";
				$('#fiche-parents').find('.abonnement').css('display','block');
			}
		}
		else
		{
			premium="Gratuit ";
			$('#fiche-parents').find('.abonnement').css('display','block');
		}
		var htmls='<a  href="#par-ppedit-image" data-rel="popup" data-transition="pop" class="signalement edit-image">'+
		'<img src="'+userdetails.src+'" height="80" alt=""></a><h1>'+userdetails.firstname+' '+lname+'<strong> '+type+''+userdetails.locality+'</strong></h1><p>'+kids+'<br/>'+phone+'<br/>'+window.localStorage['username']+'<br/>'+skype+'</p>';
		$('#fiche-parents .user').html('');
		$('#fiche-parents .user').html(htmls);
		$('#fiche-edit-planning').find('input:checkbox[name="e_planning[]"]:checked').each(function() 
		{
			$(this).attr('checked',false);
		});
		$('#fiche-edit-planning').find('td').removeClass('check');
		var plan=[];
		plan=JSON.parse(window.localStorage['planning']);
		//alert(plan);
		for(i=0;i<plan.length;i++)
		{
			$('#fiche-edit-planning').find('#e_planning_'+plan[i]).attr('checked',true);
			$('#fiche-edit-planning').find('#e_planning_'+plan[i]).parent('td').addClass('check');
			$('#fiche-edit-planning').find('#e_planning_'+plan[i]).parent('div').parent('td').addClass('check');
		}
		
		$('#fiche-parents').find('.subscription_status').html(premium);
		$.mobile.changePage('#fiche-parents',{transition:'flip'});	
	}
	else
	{
		alert('please login to view your profile.');
	}
	
}



function enable_urgence(check)
{

$.mobile.showPageLoadingMsg();
	var user=[];
	user=JSON.parse(window.localStorage['userdata']);
	if(window.localStorage['premium']=='yes')
	{
		if($(check).is(':checked'))
		{
			var urgence=true;
			
		}
		else
		{
			var urgence=false;
		}
		$.ajax({
					type: "POST",
					url: "http://codeuridea.net/kidssitter/change-urgence-status/"+user.id,
					dataType: "json",
					success: function(data)
					{
						user['urgence']=data.status;
						window.localStorage['userdata']=JSON.stringify(user);
						alert("Status Changed Successfully");
						$.mobile.hidePageLoadingMsg();
					}
				});
		
	}
	else
	{
		alert("Pour pouvoir pleinement utiliser cette fonctionnalité, nous vous invitons à souscrire à l'un de nos Pass Premium.");
		$(check).attr('checked',false);
		$.mobile.hidePageLoadingMsg();
	}
	
	
}

//My Profile Page (Sitter)-----------------------------------------------------------------------------------------

function view_my_profile_sitter()
{
	if(window.localStorage['loggedin'] == '1')
	{
		var userdetails=[];
		userdetails=JSON.parse(window.localStorage['userdata']);
		var lname,kids,type,phone,skype,verified,certified;
		if(userdetails.lastname != null)
		{
			lname=userdetails.lastname;
		}
		else
		{
			lname="";
		}
		if(userdetails.type_sitter != null)
		{
			type=userdetails.type_sitter+" - ";
		}
		else
		{
			type="";
		}
		if(userdetails.kidmin != null && userdetails.kidmax != null)
		{
			
			kids="Entre "+userdetails.kidmin+" et "+userdetails.kidmax+" ans";
		}
		else
		{
			kids="";
		}
		if(userdetails.phone != null)
		{
			phone=userdetails.phone;
		}
		else
		{
			phone="";
		}
		
		if(userdetails.skype != null)
		{
			skype='Skype :'+userdetails.skype;
		}
		else
		{
			skype="";
		}
		if(userdetails.certified == 1)
		{
			certified="certified";
			$('#fiche-kid').find('.abonnement').css('display','none');
		}
		if(userdetails.verified == 1)
		{
			certified="Verified";
			$('#fiche-kid').find('.abonnement').css('display','block');
		}
		if(userdetails.certified == 1 && userdetails.verified == 1)
		{
			certified="Gratuit ";
			$('#fiche-kid').find('.abonnement').css('display','block');
		}
		var htmls='<a  href="#kid-ppedit-image" data-rel="popup" data-transition="pop" class="signalement edit-image">'+
		'<img src="'+userdetails.src+'" height="80" alt=""></a><h1>'+userdetails.firstname+' '+lname+'<strong> '+type+''+userdetails.locality+'</strong></h1><p>'+kids+'<br/>'+phone+'<br/>'+window.localStorage['username']+'<br/>'+skype+'</p>';
		$('#fiche-kid .user').html('');
		$('#fiche-kid .user').html(htmls);
		$('#fiche-edit-planning').find('input:checkbox[name="e_planning[]"]:checked').each(function() 
		{
			$(this).attr('checked',false);
		});
		$('#fiche-edit-planning').find('td').removeClass('check');
		var plan=[];
		plan=JSON.parse(window.localStorage['planning']);
		//alert(plan);
		for(i=0;i<plan.length;i++)
		{
			$('#fiche-edit-planning').find('#e_planning_'+plan[i]).attr('checked',true);
			$('#fiche-edit-planning').find('#e_planning_'+plan[i]).parent('td').addClass('check');
			$('#fiche-edit-planning').find('#e_planning_'+plan[i]).parent('div').parent('td').addClass('check');
		}
		
		$('#fiche-kid').find('.subscription_status').html(certified);
		$.mobile.changePage('#fiche-kid',{transition:'flip'});
	}
	else
	{
		alert('Please login to view your profile');
	}
}
/************edit profile********/
function update_user_pofile(type)
{	
	$.mobile.showPageLoadingMsg();
	var sortUser = "kid";
	if(window.localStorage['user_type']== "user_parent")
		sortUser = "par";
	var geoEle = $("#editprof-"+sortUser+" [name=address]");
	$(geoEle).geocomplete("find",$(geoEle).val());
	$(geoEle).trigger('geocode');
	var userdata = JSON.parse(window.localStorage['userdata']);
	setTimeout(function(){
		var lat=$("#editprof-"+sortUser+' input[name="lat"]').val();
		var lng= $("#editprof-"+sortUser+' input[name="lng"]').val();
		var email=$("#editprof-"+sortUser+' input[name="email"]').val();
		var fname=$("#editprof-"+sortUser+' input[name="fname"]').val();
		var lname=$("#editprof-"+sortUser+' input[name="lname"]').val();
		var address=$("#editprof-"+sortUser+' input[name="address"]').val();
		var locality=$("#editprof-"+sortUser+' input[name="locality"]').val();
		var country=$("#editprof-"+sortUser+' input[name="country"]').val();
		var birthdate=$("#editprof-"+sortUser+' input[name="birthdate"]').val();
		var telephone=$("#editprof-"+sortUser+' input[name="telephone"]').val();
		var skypeid=$("#editprof-"+sortUser+' input[name="skypeid"]').val();
		var gender=$("#editprof-"+sortUser+" [name=gender]:checked").val();
		//$("#editprof-"+sortUser+' input[name="gender"]').val();
		var error_flag="0";
		//Email, pwd
		
		if(email=='' || fname == '' || address == ''|| birthdate=='')
		{
			$.mobile.hidePageLoadingMsg();
			alert("please fill up all the fields.");
			if(email=='')
			{
				$("#editprof-"+sortUser+' input[name="email"]').parent('div').css('border-color','red');
			}
			else
			{
				$("#editprof-"+sortUser+' input[name="email"]').parent('div').css('border-color','transparent').css('border','none');
			}
			
			if(fname=='')
			{
				$("#editprof-"+sortUser+' input[name="fname"]').parent('div').css('border-color','red');
			}
			else
			{
				$("#editprof-"+sortUser+' input[name="fname"]').css('border-color','transparent').css('border','none');
			}
			
			if(birthdate=='')
			{
				$("#editprof-"+sortUser+' input[name="birthdate"]').parent('div').css('border-color','red');
			}
			else
			{
				$("#editprof-"+sortUser+' input[name="birthdate"]').css('border-color','transparent').css('border','none');
			}
			if(address=='')
			{
				$("#editprof-"+sortUser+' input[name="address"]').parent('div').css('border-color','red');
			}
			else
			{
				$("#editprof-"+sortUser+' input[name="address"]').css('border-color','transparent').css('border','none');
			}
		}else{
			var senddata = {lat:lat,lng:lng,fname:fname,
							lname:lname,address:address,
							locality:locality,country:country,
							birthdate:birthdate,gender:gender,
							email:email,telephone:telephone,skypeid:skypeid};
			console.log(senddata);
			$.ajax({
					 type: "POST",
						url: "http://codeuridea.net/kidssitter/edit-my-info",
						data:senddata,
						dataType: "json",
						crossDomain: true,
						success: function(data)
						{
							if(data.success== true || data.success== "true")
							{
								$.mobile.hidePageLoadingMsg();
								alert("Edit successful");
								userdata.firstname = senddata.fname;
								userdata.lastname = senddata.lname;
								userdata.birthday.date = senddata.birthdate;
								userdata.phone = senddata.telephone;
								userdata.skype = senddata.skypeid;
								userdata.locality = senddata.locality;
								userdata.gender = senddata.gender;
								window.localStorage['userdata'] = JSON.stringify(userdata);
								console.log(window.localStorage['userdata'] );
								window.localStorage['address']= senddata.address;
								view_profile();
							}else{
								$.mobile.hidePageLoadingMsg();
								alert(data.msg);
							}
						}
			   });
			
		}
	}, 10000);
}
function gotoEditProf()
{
	var sortUser = "kid";
	var userdata = JSON.parse(window.localStorage['userdata']);
	if(window.localStorage['user_type']== "user_parent")
		sortUser = "par";
	$.mobile.changePage('#edit-profile-'+sortUser,{transition:'flip'});
	var dttm = (userdata.birthday.date).split(' ');
	var arr = (dttm[0]).split('-');
	var geoEle = $("#editprof-"+sortUser+" [name=address]");
	initgeoloc(geoEle,"editprof-"+sortUser);
	$(geoEle).val(window.localStorage['address']);
	$("#editprof-"+sortUser+" [name=fname]").val(userdata.firstname);
	$("#editprof-"+sortUser+" [name=lname]").val(userdata.lastname);
	$("#editprof-"+sortUser+" [name=birthdate]").val(dttm[0]);
	$("#editprof-"+sortUser+" [name=email]").val(window.localStorage["username"]);
	$("#editprof-"+sortUser+" [name=telephone]").val(userdata.phone);
	$("#editprof-"+sortUser+" [name=skypeid]").val(userdata.skype);
	
	var html = '<label class="required">Sexe</label>\
				<input type="radio" name="gender" value="1" id="edit-prof-'+sortUser+'h" '+(parseInt(userdata.gender) == 1?'checked="checked"':'')+'>\
				<label for="edit-prof-'+sortUser+'h">Homme</label>\
				<input type="radio" name="gender" value="2" id="edit-prof-'+sortUser+'f" '+(parseInt(userdata.gender) == 2?'checked="checked"':'')+'>\
				<label for="edit-prof-'+sortUser+'f">Femme</label>';
	
	$("."+sortUser+"-edit-prof-gender").html(html);
	$.datepicker.formatDate( "yy-mm-dd", new Date(dttm[0]) );
}
function initgeoloc(geoEle,mapid){
    $(geoEle).geocomplete({
	componentRestrictions: { country: 'fr' }, 
	details: "#"+mapid,
	detailsAttribute: "data-geo"})
      .bind("geocode:result", function(event, result){
       // $.log("Result: " + result.formatted_address);
      })
      .bind("geocode:error", function(event, status){
      //  $.log("ERROR: " + status);
      })
      .bind("geocode:multiple", function(event, results){
       // $.log("Multiple: " + results.length + " results found");
      });
	$(geoEle).geocomplete("find",$(geoEle).val());
	$(geoEle).trigger('geocode');
}

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}


function underDevMsg(event)
{
	event.preventDefault() 
	alert("The section is under development.");
}


var pictureSource;
var destinationType;
document.addEventListener("deviceready",function(){
	pictureSource=navigator.camera.PictureSourceType; 
	destinationType=navigator.camera.DestinationType;
},false);
function underDevMsg(event)
{
	event.preventDefault() 
	alert("The section is under development.");
}

function getPhoto(source) {
// Retrieve image file location from specified source 
	if(source == "camera")
		navigator.camera.getPicture(onPhotoURISuccess, onFail, 
		{quality: 50, destinationType: destinationType.FILE_URI,
		sourceType: pictureSource.CAMERA,
		targetWidth: 100,
		targetHeight: 100,
		correctOrientation:true });
	else
		navigator.camera.getPicture(onPhotoURISuccess, onFail, 
		{quality: 50, destinationType: destinationType.FILE_URI,
		sourceType: pictureSource.SAVEDPHOTOALBUM, 
		targetWidth: 100,
		targetHeight: 100 });
}
function onFail(message) {
	alert("Failed because: " + message);
}
// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
	options = new FileUploadOptions();
	// parameter name of file:
	options.fileKey = "my_image";
	// name of the file:
	options.fileName = imageURI.substr(imageURI.lastIndexOf("/") + 1);
	// mime type:
	options.mimeType = "image/jpeg";
	var params = {};
	params.value1 = "test";
	params.value2 = "param";
	options.params = params;
	ft = new FileTransfer();
	var userdata = JSON.parse(window.localStorage['userdata']);
	$.mobile.showPageLoadingMsg();
	ft.upload(imageURI, encodeURI("http://codeuridea.net/kidssitter/change-image/"+userdata.id), function(r){
		//success/
		var valres = JSON.parse(r.response);
		var sortUser = "kid";
		if(window.localStorage['user_type']== "user_parent")
			sortUser = "par";
		$("#"+sortUser+"-ppedit-image").popup("close");
		$.mobile.hidePageLoadingMsg();
		if(valres.result == "true" ||valres.result == true)
		{	
			if(window.localStorage['user_type']== "user_parent")
				$("#fiche-parents").find('.user').find("a>img").attr("src",imageURI);
			else
				$("#fiche-kid").find('.user').find("a>img").attr("src",imageURI);
			userdata.src = valres.src;
			window.localStorage['userdata'] = JSON.stringify(userdata);
		}else{
			alert("An error has occurred in server.");
		}
		
	}, function(error){
		alert("An error has occurred: Code = "+ error.code);
		$.mobile.hidePageLoadingMsg();
	}, options);
}
/************edit profile********/


//view comment in sitter profile ------------------------------------------------
function view_comments()
{
	$.mobile.showPageLoadingMsg();
	var id=$('#s_id').val();
	$.ajax({
				type: "POST",
				url: "http://codeuridea.net/kidssitter/view-comment/"+id,
				dataType: "json",
				success: function(data)
				{
					if(data.comment != "")
					{
						$('#for-sitter > li').remove();
						var month,day,year,time;
						$.each(data.comment,function(index,value){
							if(value.isApproved==true)
							{
								var time=getConnected(value.created.date,value.server);
								
							
								var htmls='<li class="result" style="height:auto"><a href="#"><div style="height:70px">'+value.src+'<h1>'+value.author+'</h1><strong>- écrit il y a '+time+'</strong></div><h1>Ponctualité  <span class="rating r'+value.note1+'"></span></h1><h1>Sérieux <span class="rating r'+value.note2+'"></span></h1><h1>Pédagogie <span class="rating r'+value.note3+'"></span></h1><h1> Activité <span class="rating r'+value.note4+'"></span></h1><div class="mesperent-fevoris"><p>'+value.comment+'</p></div></a></li>';
								$('#for-sitter').append(htmls);
							}
							
						});
						
					}
					var html=$('#for-sitter').html();
					//alert(html);
					if($('#for-sitter li').length ===0 )
					{
						$('#for-sitter > li').remove();
						var htmls='<li class="result" ><a href="#"><h4 style="text-align:center">Aucun commentaire</h4></a></li>';
						$('#for-sitter').append(htmls);
					}
				
					$.mobile.hidePageLoadingMsg();
					$.mobile.changePage('#listing-comment',{transition:'flip'});
				}
			});
}



//get connected time------------------------

function getConnected(Ctime,stime)
{
	var month,day,year,time;
	var connected=get_date_diff(Ctime,stime);
						
	if(connected > 30)
	{
	month=connected/30;
	if(month >12)
	{
		year=month/12;
		time=Math.round(year)+" ans";
	}
	else
	{
		time=Math.round(month)+" mois";
	}
	}
	else
	{
		time=Math.round(connected)+" jours";
	}

	return time;
}

//add Comment
function add_comment()
{
	//alert('1');
	
	$.mobile.changePage('#recherche-comment',{transition:'flip'});
}
function submit_comment()
{
	var userdata = JSON.parse(window.localStorage['userdata']);
	var note1=$('#note1').val();
	var note2=$('#note2').val();
	var note3=$('#note3').val();
	var note4=$('#note4').val();
	var comments=$('#com_box').val();
	var sitter=$('#s_id').val();
	if(comments=="")
	{
		alert("please enter some comment");
	}
	else{
	$.mobile.showPageLoadingMsg();
	var senddata={'note1':note1,'note2':note2,'note3':note3,'note4':note4,'comment_data':comments,'sitter':sitter};
	$.ajax({
			 type: "POST",
				url: "http://codeuridea.net/kidssitter/add-comment/"+userdata.id,
				data:senddata,
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					if(data.success == true)
					{
						//$('#recherche-comment').find('.back-link').click();
						alert('Commentaire envoyé et en attente de modération ');
						get_profile_details(sitter,'sitter');
					}
					
				}
	   });
	   }
}

function favouriteAction(type)
{
	var url;
	var fav_id=$('#s_id').val();
	var user=JSON.parse(window.localStorage['userdata']);
	if(type == 'remove')
	{
		var url="http://codeuridea.net/kidssitter/favorite-app/remove/"+fav_id;
	}
	else
	{
		var url="http://codeuridea.net/kidssitter/favorite-app/add/"+fav_id;
	}
	$.ajax({
			 type: "POST",
				url: url,
				data:{'user':user.id},
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					if(data.success == true)
					{
					
					}
					
					
				}
	   });
}

//get favourites list--------------------------------------------------


function favourite_list()
{	
	if(window.localStorage['loggedin'] == '1')
	{
		var user=JSON.parse(window.localStorage['userdata']);
		$.mobile.showPageLoadingMsg();
		if(window.localStorage['user_type'] == 'user_parent')
		{
			var url="http://codeuridea.net/kidssitter/get-fav-parent/"+user.id;
			var button="btn-red";
		}
		else
		{
			var url="http://codeuridea.net/kidssitter/get-fav-sitter/"+user.id;
			var button="btn-blue";
		}
		
		$.ajax({
				 type: "POST",
					url: url,
					dataType: "json",
					crossDomain: true,
					success: function(data)
					{
						if(typeof data.result != "undefined" && data.result != "")
						{
							$('#fav-list > li ').remove();
							$.each(data.result,function(index,value){
							
							var lname;
							if(value.lname != null)
							{
								lname=value.lname;
							}
							else
							{
								lname="";
							}
							if(value.annonce != null)
							{
								annonce=value.annonce;
							}
							else
							{
								annonce="";
							}
							//alert(typeof(value.login));
							if(value.login != null)
							{
								var time=getConnected(value.login['date'],value.server);
							}
							else
							{
								var time="";
							}
							var htmls="<li id='fav-"+value.id+"'><a href='#'><img class='photo' src='"+value.src+"' width='70' height='70' alt=''><h1>"+value.firstname+" "+lname+"</h1><strong>connecte (e) il a "+time+"</strong><div class='mesperent-fevoris' style='margin-Top:25px'><p>"+annonce+"</p><a href='#' data-role='button' class='"+button+"' onclick='view_popup("+value.id+")'>Envoyer un message</a><a href='#' data-role='button' onclick='removeFromfavourite("+value.id+")'> Supprimer des favoris</a></div></a></li>";
							$('#fav-list').append(htmls);
							});
							
						}
						else{
							$('#fav-list').html('');
							var htmls="<li style='height:45px;'><h4 style='text-align:center'>Aucun favoris</h4></li>";
							$('#fav-list').append(htmls);
						}
						$.mobile.hidePageLoadingMsg();
						
						$.mobile.changePage('#listing-fav',{transition:'flip'});
						$('#listing-fav').find('a[data-role="button"]').not('.ui-btn').button();
						
					}
				});
	}
	else
	{
		alert('please login to view your favourites');
	}
}

function removeFromfavourite(id)
{
	var user=JSON.parse(window.localStorage['userdata']);
	$.ajax({
			 type: "POST",
				url:"http://codeuridea.net/kidssitter/favorite-app/remove/"+id,
				data:{'user':user.id},
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					if(data.success == true)
					{
						$('#fav-'+id).remove();
						if($('#fav-list li').length ===0 )
						{
							var htmls="<li style='height:45px;'><h4 style='text-align:center'>Aucun favoris</h4></li>";
							$('#fav-list').append(htmls);
						}
					}
					
					
				}
	   });
	   
}

//send message-------------------------------------------------------------


function send_message()
{
	var receiver=$('#s_id').val();
	var user=JSON.parse(window.localStorage['userdata']);
	
	var body,subject;
	if(window.localStorage['user_type'] == 'user_sitter')
	{
		var url="http://codeuridea.net/kidssitter/parent-app/new/message/"+receiver;
		subject=$('#p_m_1').val();
		body=$('#p_b_1').val();
	}
	else
	{
		var url="http://codeuridea.net/kidssitter/sitter-app/new/message/"+receiver;
		subject=$('#s_m_1').val();
		body=$('#s_b_1').val();
	}
	if(subject =='' || body == '')
	{
		alert("please fill all the fields");
	}
	else
	{	
		if(window.localStorage['user_type'] == 'user_sitter')
		{
			$('#send_messge_parent').popup('close');
		}
		else
		{
			$('#send_messge_sitter').popup('close');
		}
		$.mobile.showPageLoadingMsg();
		$.ajax({
				 type: "POST",
					url:url,
					data:{'user':user.id,'subject':subject,'body':body},
					dataType: "json",
					crossDomain: true,
					success: function(data)
					{
						alert(data.msg);
						$.mobile.hidePageLoadingMsg();
						$('[id*=_1]').val('');
						user['remained_message']=data.qouta;
						window.localStorage['userdata']=JSON.stringify(user);
						
					}
		   });
	 }
}


function send_message_fav()
{
	var receiver=$('#re_id').val();
	var user=JSON.parse(window.localStorage['userdata']);
	
	var body,subject;
	if(window.localStorage['user_type'] == 'user_sitter')
	{
		var url="http://codeuridea.net/kidssitter/parent-app/new/message/"+receiver;
		
	}
	else
	{
		var url="http://codeuridea.net/kidssitter/sitter-app/new/message/"+receiver;
		
	}
	subject=$('#f_m_1').val();
	body=$('#f_b_1').val();
	if(subject =='' || body == '')
	{
		alert("please fill all the fields");
	}
	else
	{	
		$('#fav_message').popup('close');
		$.mobile.showPageLoadingMsg();
		$.ajax({
				 type: "POST",
					url:url,
					data:{'user':user.id,'subject':subject,'body':body},
					dataType: "json",
					crossDomain: true,
					success: function(data)
					{
						alert(data.msg);
						$.mobile.hidePageLoadingMsg();
						$('[id*=_1]').val('');
						user['remained_message']=data.qouta;
						window.localStorage['userdata']=JSON.stringify(user);
						
					}
		   });
	 }
}

function view_popup(ids)
{
	$('#re_id').val('');
	$('#re_id').val(ids);
	$('#fav_message').popup('open');
}


function gotoMesinfants()
{
	var user=JSON.parse(window.localStorage['userdata']);
	$.mobile.showPageLoadingMsg();
	$.ajax({
		type: "POST",
		url:"http://codeuridea.net/kidssitter/parent-app/kid/get/"+user.id,
		dataType: "json",
		crossDomain: true,
		success:function(list){
			$('#mes-infants ul.listing > li ').remove();
						
			inflist = list.kid;
			var htmlcnt = '<li><a href="#">Pas d\'enfants ajoutés.</a></li>';
			if(inflist != "" || inflist != null){
				htmlcnt = "";
				$.each(inflist,function(index,value){
					htmlcnt = '<li>'+
							'<div class="" id="infant-entr-'+value.id+'">'+
								'<div><span class="mesinfname">'+value.name+'</span> <strong>'+value.age+' ans</strong></div>'+
								'<a href="#" data-role="button" class="btn-red idft-butn-1" onClick="modifyInfant(this,1);">Editer</a>'+
								'<a href="#" data-role="button" class="idft-butn-2" onClick="modifyInfant(this,0);"> Supprimer</a>'+
							'</div>'+
						'</li>';
					$('#mes-infants ul.listing').append(htmlcnt);
				});
			}
			$.mobile.hidePageLoadingMsg();
			$.mobile.changePage('#mes-infants',{transition:'flip'});
			$('#mes-infants .listing').listview().listview('refresh');
			$('#mes-infants ul.listing').find('a[data-role="button"]').not('.ui-btn').button();
				
		}
	});
}

function editInfant(obj)
{
	
	if($.trim($("#par-ppedit-infant #infant_form_name").val()) == "" || $("#par-ppedit-infant #infant_form_age").val()=="")
	{
		alert("Se il vous plaît remplir tous les champs");
		return false;
	}
	var user=JSON.parse(window.localStorage['userdata']);
	var senddata = {id:$("#par-ppedit-infant #infantid").val(),
		name:$("#par-ppedit-infant #infant_form_name").val(),
		age:$("#par-ppedit-infant #infant_form_age").val()
	};
	url = "http://codeuridea.net/kidssitter/parent-app/kid/edit/"+parseInt(senddata.id);
	if(isNaN(parseInt(senddata.id)) || parseInt(senddata.id) == 0)
	{
		url = "http://codeuridea.net/kidssitter/parent-app/kid/add/"+user.id;
	}
	$.ajax({
		type: "POST",
		url:url,
		dataType: "json",
		data:senddata,
		crossDomain: true,
		success:function(responce){
			if(parseInt(responce.kid) != 0)
			{
				alert("Fait avec succès.");
				if(isNaN(parseInt(senddata.id)) || parseInt(senddata.id) == 0)
				{
					var htmlcnt = '<li>'+
							'<div id="infant-entr-'+responce.kid+'">'+
								'<div><span class="mesinfname">'+senddata.name+'</span> <strong>'+senddata.age+' ans</strong></div>'+
								'<a href="#" data-role="button" class="btn-red" onClick="modifyInfant(this,1);">Editer</a>'+
								'<a href="#" data-role="button" onClick="modifyInfant(this,0);"> Supprimer</a>'+
							'</div>'+
						'</li>';
					$('#mes-infants ul.listing').append(htmlcnt);
					$('#mes-infants .listing').listview().listview('refresh');
					
				}else{
					var updateref = $('#mes-infants ul.listing').find("#infant-entr-"+senddata.id);
					$(updateref).find(".mesinfname").html($("#par-ppedit-infant #infant_form_name").val());
					$(updateref).find("strong").html($("#par-ppedit-infant #infant_form_age").val());
				}
				$("#par-ppedit-infant").popup("close");
				$('#mes-infants ul.listing').find('a[data-role="button"]').not('.ui-btn').button();
			}
			
		}
	});
}
function modifyInfant(obj,edit){
	if(edit == 1)
	{
		$("#infant_edit_form").get(0).reset();
		if($(obj).attr("id") != "addnewinfant")
		{
			var infantid =  $(obj).parents("[id*=infant-entr-]").attr("id").replace("infant-entr-","");
			var infantname =  $.trim($(obj).parents("[id*=infant-entr-]").find(".mesinfname").text());
			var infantage =  $.trim($(obj).parents("[id*=infant-entr-]").find("strong").text());
			$("#par-ppedit-infant #infant_form_name").val(infantname);
			$("#par-ppedit-infant #infant_form_age").val(infantage.replace ( /[^\d.]/g, '' ));
			$("#par-ppedit-infant #infantid").val(infantid);
			$("#infant_edit_form #saveoreditinfant").html("Editer");
		}else{
			$("#infant_edit_form #saveoreditinfant").html("Save");
			$("#infant_edit_form").get(0).reset();
		}
		$('#infant_edit_form select').selectmenu('refresh', true);
		$("#par-ppedit-infant").popup("open");
	}else{
		var infantid =  $(obj).parents("[id*=infant-entr-]").attr("id").replace("infant-entr-","");
		$.ajax({
			type: "POST",
			url:"http://codeuridea.net/kidssitter/parent-app/kid/remove/"+infantid,
			dataType: "json",
			crossDomain: true,
			success:function(responce){
			if(responce.success == true)
			{
				$('#mes-infants ul.listing').find("#infant-entr-"+infantid).parent().remove();
			}
			}
		});
	}
}


function view_message()
{
	
	$('.message-menu >li').removeClass('active');
	$('.message-menu >li:first').addClass('active');
	view_message_list(0);
	
}

function view_message_list(index)
{
	
	var url;
	var user=JSON.parse(window.localStorage['userdata']);
	if(index == 0)
	{
		//alert('inbox');
		if(window.localStorage['user_type']=="user_parent")
		{
			var url="http://codeuridea.net/kidssitter/parent-app/inbox/"+user.id;
		}
		else
		{
			var url="http://codeuridea.net/kidssitter/sitter-app/inbox/"+user.id;
		}
	}
	else if(index == 1)
	{
		if(window.localStorage['user_type']=="user_parent")
		{
			var url="http://codeuridea.net/kidssitter/parent-app/sent/"+user.id;
		}
		else
		{
			var url="http://codeuridea.net/kidssitter/sitter-app/sent/"+user.id;
		}
	}
	else
	{
		if(window.localStorage['user_type']=="user_parent")
		{
			var url="http://codeuridea.net/kidssitter/parent-app/deleted/"+user.id;
		}
		else
		{
			var url="http://codeuridea.net/kidssitter/sitter-app/deleted/"+user.id;
		}
	}
	$.mobile.showPageLoadingMsg();
	$.ajax({
			 type: "POST",
				url:url,
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					$('#thread-list').html('');
					var html='';
					if(data.message != '')
					{
						
						$.each(data.message,function(index,value)
						{
							html+='<div class="message" id="thread_'+value.id+'" ><div class="author"><img src="'+value.src+'" height="80" alt=""><h1>'+value.sent_by+'<strong><a href="#" thread="'+value.id+'" onclick="view_thread('+value.id+',$(this));">'+value.subject+'</a></strong><small>'+value.created_at.date+'</small></h1></div><a href="#" onClick="del_undel_thread('+value.id+')" data-role="button" class="btn-red">Supprimer</a><a href="#" onClick="view_thread('+value.id+',\''+value.subject+'\')" data-role="button" class="btn-green" id="">Répondre</a></div>';
							
						
						});
						
					}
					else
					{
						html="<div class='message'><h4 style='text-align:center'>No result found</h4></div>"
					}
					$('#thread-list').html(html);
					$.mobile.hidePageLoadingMsg();
					$.mobile.changePage('#messagerie',{transition:'flip'});
					$('#thread-list').find('a[data-role="button"]').not('.ui-btn').button();
				}
		   });
}

function view_thread(ids,subject)
{
	var url;
	var sub=$(subject).text();
	var t=$(subject).attr('thread');
	//alert(t);
	$('#subject').val(sub);
	$('#thread').val(t);
	var user=JSON.parse(window.localStorage['userdata']);
	if(window.localStorage['user_type']=="user_sitter")
	{
		url="http://codeuridea.net/kidssitter/sitter-app/thread/"+ids;
	}
	else
	{
		url="http://codeuridea.net/kidssitter/parent-app/thread/"+ids
	}
	$.ajax({
			 type: "POST",
				url:url,
				dataType: "json",
				crossDomain: true,
				success: function(data)
				{
					$('#thread-message-list').html('');
					var html='';
					if(data.msg != '')
					{
						
						$.each(data.msg,function(index,value)
						{
							html+='<div class="message" ><div class="author"><img src="'+value.src+'" height="70" alt=""><h1>'+value.created_by+'<small>'+value.created_at.date+'</small></h1></div><div class="content"><p>'+value.body+'</p></div></div>';
							//$('#participant').val('');
							
							if(value.created_by_id != user.id)
							{
								
								$('#participant').val(value.created_by_id);
							}
						});
					}
					else
					{
						html="<div class='message'><h4 style='text-align:center'>No result found</h4></div>"
					}
					$('#thread-message-list').html(html);
					$('#response').val('');
					$.mobile.hidePageLoadingMsg();
					$.mobile.changePage('#messagerie-list',{transition:'flip'});
				}
		   });
}

function send_response()
{
	var receiver=$('#participant').val();
	var user=JSON.parse(window.localStorage['userdata']);
	
	var body,subject;
	if(window.localStorage['user_type'] == 'user_sitter')
	{
		//var url="http://localhost/kidssitter-prev/parent/send/"+receiver;
		var url="http://codeuridea.net/kidssitter/parent/send/"+receiver;
		
	}
	else
	{
		var url="http://codeuridea.net/kidssitter/sitter/send/"+receiver;
		
	}
	subject=$('#subject').val();
	body=$('#response').val();
	var thread=$('#thread').val();
	if(body == '')
	{
		alert("please fill all the fields");
	}
	else
	{	
		$.mobile.showPageLoadingMsg();
		$.ajax({
				 type: "POST",
					url:url,
					data:{'user':user.id,'body':body,'thread':thread},
					dataType: "json",
					crossDomain: true,
					success: function(data)
					{
						alert(data.msg);
						$('#response').val('');
						$.mobile.hidePageLoadingMsg();
						/*user['remained_message']=data.qouta;
						window.localStorage['userdata']=JSON.stringify(user);
						view_thread(thread);*/
						view_thread(thread,subject);
					}
		   });
	 }
}

function del_undel_thread(thread)
{
	var index=$('.message-menu').find('.active').index();
	var url;
	var user=JSON.parse(window.localStorage['userdata']);
	if( index != 2)
	{
		if(window.localStorage['user_type'] == 'user_sitter')
		{
			url="http://codeuridea.net/kidssitter/sitter-app/delete/"+user.id;
		}
		else
		{
			url="http://codeuridea.net/kidssitter/parent-app/delete/"+user.id;
		}
		
	}
	else
	{
		if(window.localStorage['user_type'] == 'user_sitter')
		{
			url="http://codeuridea.net/kidssitter/sitter-app/undelete/"+user.id;
		}
		else
		{
			url="http://codeuridea.net/kidssitter/parent-app/undelete/"+user.id;
		}
	}
		$.ajax({
				 type: "POST",
					url:url,
					data:{'thread':thread},
					dataType: "json",
					crossDomain: true,
					success: function(data)
					{
						
						alert(data.msg);
						$.mobile.hidePageLoadingMsg();
						view_message();
						/*user['remained_message']=data.qouta;
						window.localStorage['userdata']=JSON.stringify(user);
						view_thread(thread);*/
						
					}
		   });
		
	
}
/********Exit app*********/
function exitFromApp()
{
	navigator.app.exitApp();
}
/********Exit app*********/
/******** News letter **********/
function gotoNewsletter()
{
	$.mobile.changePage('#newsletterpp',{transition:'flip'});
}
function savenewsletter()
{
	//check proper email
	var valid = true;
	var mail= $("#optin_add").find("#optin_email").val();
    var atpos = mail.indexOf("@");
    var dotpos = mail.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=mail.length) {
        $("#optin_add").find(".return").html("Not a valid e-mail address");
        valid = false;
    }
	$("#optin_add").find("#optin_email").focus(function(){
		$("#optin_add").find(".return").html("");
	});
	if(valid)
	{
		datasnd = {optin:{email:mail}};
		console.log(datasnd);
		$.ajax({
			type: "POST",
			url:"http://codeuridea.net/kidssitter/ajax/optin/add",
			data:datasnd,
			dataType: "json",
			crossDomain: true,
			success: function(data)
			{
				if(data.status=="ok")
				{
					 $("#optin_add").find(".return").html(data.value);
				}
			}
		});

	}
}



/******** News letter **********/
/***********************share my profile ***************/
function sharemyprofile()
{
	if(window.localStorage['loggedin']=='1'){
		var user_data = JSON.parse(window.localStorage['userdata']);
		var typeUser = "sitter";
		if(window.localStorage['user_type']== "user_parent")
			typeUser = "parent";
		window.plugins.socialsharing.share(user_data.firstname+': Mon profil',
	      null,
	      null,
	      'http://codeuridea.net/kidssitter/'+typeUser+user_data.id)
	 }
}

function restrictMenuByLogin()
{
	setTimeout(function(){
		if(typeof window.localStorage['loggedin'] == "undfined" || parseInt(window.localStorage['loggedin'])!=1){
			$(".ifloggedin").hide();
		}else{
		}
	},1000);
}
/***********************share my profile ***************/
/*********in app browser for offers************/
function gotoPurchaseOffer(oferselected)
{
	var user_data = JSON.parse(window.localStorage['userdata']);
	var typeUser = "sitter";
	if(window.localStorage['user_type']== "user_parent")
		typeUser = "parent";
	var ref = window.open('http://codeuridea.net/paymentgw/transaction_intermediet.php?ofertype='+typeUser+"-"+oferselected+'&uid='+user_data.id, '_blank', 'location=yes');
	ref.addEventListener('exit', function(event) { alert("under development"); });
	//ref.executeSript({file: "myscript.js"});
}
/*********in app browser for offers************/
/*********in app browser for offers************/