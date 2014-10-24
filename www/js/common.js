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
			$('#near-kid li:not(:first)').remove();
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
						
						
						var htmls='<li class="result"><a href="#"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" onclick="get_profile_details('+value.id+',\'parent\')"></div></a></li>';
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
			$('#near-parent li:not(:first)').remove();
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
				var htmls='<li class="result"><a href="#"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" onclick="get_profile_details('+value.id+',\'sitter\')"></div></a></li>';
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
						$('#near-kid li:not(:first)').remove();
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
								
								
								var htmls='<li class="result"><a href="#"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" onclick="get_profile_details('+value.id+',\'parent\')"></div></a></li>';
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
							$('#near-parent li:not(:first)').remove();
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
								
								var htmls='<li class="result"><a href="#"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" onclick="get_profile_details('+value.id+',\'sitter\')"></div></a></li>';
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
						$('#near-parent li:not(:first)').remove();
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
							
							var htmls='<li class="result"><a href="#"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+type+' '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+rate+'</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="sitter-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" onclick="get_profile_details('+value.id+',\'sitter\')"></div></a></li>';
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
							$('#near-kid li:not(:first)').remove();
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
									var htmls='<li class="result"><a href="#"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+lname+' ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><input type="hidden" id="parent-distance-'+value.id+'" value="'+value.distance+'"><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt="" onclick="get_profile_details('+value.id+',\'parent\')"></div></a></li>';
									
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
		$('#contact-button').removeClass('btn-red');
		$('#contact-button').addClass('btn-blue');
		$('#comment-count').css('display','none');
		$('#fiche-sitter-profile').find('.annonce').eq(1).css("display","none");
		$('#fiche-sitter-profile').find('.title').eq(1).css("display","none");
		//$('#fiche-sitter-profile .user').find('.h1:first').css('color',"");
	 }
	$('#s_id').val(id);
	//var url="http://codeuridea.net/kidssitter/profile-parent";	
	$.ajax({
		 type: "POST",
            url: url ,
			data:{'id':s_id},
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
						$(link).attr('href','tel:'+data.phone+'');
						$(link).text("");
						$(link).text(data.phone);
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
//My Profile Page (Parent)-----------------------------------------------------------------------------------------

function view_my_profile_parent()
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
		var htmls='<img src="'+userdetails.src+'" height="80" alt=""><h1>'+userdetails.firstname+' '+lname+'<strong> '+type+''+userdetails.locality+'</strong></h1><p>'+kids+'<br/>'+phone+'<br/>'+window.localStorage['username']+'<br/>'+skype+'</p>';
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
	}
		
		$('#fiche-parents').find('.subscription_status').html(premium);
		$.mobile.changePage('#fiche-parents',{transition:'flip'});	
	
}


//My Profile Page (Sitter)-----------------------------------------------------------------------------------------

function view_my_profile_sitter()
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
	var htmls='<img src="'+userdetails.src+'" height="80" alt=""><h1>'+userdetails.firstname+' '+lname+'<strong> '+type+''+userdetails.locality+'</strong></h1><p>'+kids+'<br/>'+phone+'<br/>'+window.localStorage['username']+'<br/>'+skype+'</p>';
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
	}
	
	$('#fiche-kid').find('.subscription_status').html(certified);
	$.mobile.changePage('#fiche-kid',{transition:'flip'});
}


