// JavaScript Document
	$(document).ready(function(){
		$.datepicker.setDefaults({
		dateFormat:"yy-mm-dd",
		 changeYear:true,
		 yearRange: "-96:-15",
		 changeMonth:true,
		 regional:'fr'
		});
		$('.logout').css('display','none');
	$( ".datepick" ).datepicker();
	
	});


 



/*function succesFunction(data)
{
//alert('ok');
$.each(data,function(key,value){
$.each(value,function(k,val){
$("#db-id").append("<li>Name:"+val.name+"</li>");

});
$.mobile.changePage('#db', { transition: 'flip'} );
})

		
}
   function show_page()
   {	$.ajax({
		 type: "POST",
            url: "http://192.168.1.34/kidssitter/web/app_dev.php/get-option",
            dataType: "json",
            success: succesFunction
         
   });
		
        //$.mobile.changePage('#database', { transition: "flip"} );

   }*/
   
$(document).ready(function(){
$("input[name=radio-choice]").change(function(){
var selection=$(this).val();
//alert(selection);
if( selection == 'choice-2')
{
$.mobile.changePage('#inscription-kid', { transition: 'flip'} );
}
else{
$.mobile.changePage('#inscription-parent', { transition: 'flip'} );
}
});

});


function onDeviceReady() {
    // Now safe to use the PhoneGap API
	//alert(window.localStorage['loggedin']);
	//checkPreAuth();
	//alert('app start');
	if(window.localStorage['loggedin']=='1')
	{
	//alert("true");
//	$("#connexion-button").css("display","none");

		if(window.localStorage['user_type'] == 'user_sitter')
		{
		//alert(window.localStorage['user_listing_data']);
		if(window.localStorage['user_listing_data'] != null)
			{
				var j=0;
				var user_listing=window.localStorage['user_listing_data'];
				
				$.each(user_listing,function(index,value){
				var urgence,premium;
				alert(user_listing.fname);
				if(value.urgence == "true")
				{
					urgence="display:block";
				}
				else
				{
				urgence="display:none";
				}
				
				if(value.premium == "1")
				{
				premium="display:block";
				}
				else
				{
				premium="display:none";
				}
				
				var lname=value.lname;
				/*if(value.lname != "" || value.lname != null)
				{
				var last=lname.substring(0,1);
				}
				else
				{
				var last="";
				}*/
				/*var i=0;
				var rates=parseInt(value.rating);
				if(rates !=0)
				{
				for (i=0;i<rates;i++)
				{
					
					$(".avis:eq("+j+") > .rating:eq("+i+")").attr('src','');
					$(".avis:eq("+j+") > .rating:eq("+i+")").attr('src','./images/check-done.png');
				}
				}
				j++;*/
				
				var htmls='<li class="result"><a href="#"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+value.lname+'. ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt=""></div></a></li>';
					$("#near-kid").append(htmls);
					
				});
			
			}
			
			$.mobile.changePage("#listing-parents",{transition:"flip"});
		}
		else
		{
			if(window.localStorage['user_listing_data'] != null)
			{
				var j=0;
				var user_listing=window.localStorage['user_listing_data'];
				
				$.each(user_listing,function(index,value){
				console.log(value.fname);
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
				
				var lname=value.lname;
				/*if(value.lname != "" || value.lname != null)
				{
				var last=lname.substring(0,1);
				}
				else
				{
				var last="";
				}*/
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
				
				var htmls='<li class="result"><a href="#"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+value.lname+'. ('+value.age+' ans)</h1><strong>'+value.type_sitter+' - '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+value.rate+'&euro;/H</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt=""></div></a></li>';
					$("#near-parent").append(htmls);
					
				});
			
			}
			$.mobile.changePage("#listing-kid",{transition:"flip"});
		}
	}
	
	
}

 
 
  /*function show_page()
   {	$.ajax({
		 type: "POST",
            url: "http://codeuridea.net/kidssitter-prev/web/app_dev.php/inscription-parent",
            dataType: "json",
            success: succesFunction
         
   });
		
        //$.mobile.changePage('#database', { transition: "flip"} );

   }
   */
   

   
   
   
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
$.mobile.loading( 'show');
      $.ajax({
		 type: "POST",
            url: "http://codeuridea.net/kidssitter-prev/web/app_dev.php/getlogin",
			data:{_name:uname,_password:pwd},
            dataType: "json",
            success: function(data)
			{
			if(data.result== "true")
			{
			window.localStorage["username"]=uname;
			window.localStorage["password"]=pwd;
			window.localStorage['loggedin']='1';
			window.localStorage['user_type']=data.type;
			window.localStorage['user_listing_data']=Json.stringify(data.result_arr);
			
			if(data.type=="user_sitter")
			{
			if(data.result_arr != null)
			{
				var j=0;
				$.each(window.localStorage['user_listing_data'],function(index,value){
				var urgence,premium;
				if(value.urgence == "true")
				{
					urgence="display:block";
				}
				else
				{
				urgence="display:none";
				}
				
				if(value.premium == "1")
				{
				premium="display:block";
				}
				else
				{
				premium="display:none";
				}
				
				var lname=value.lname;
				/*if(value.lname != "" || value.lname != null)
				{
				var last=lname.substring(0,1);
				}
				else
				{
				var last="";
				}*/
				/*var i=0;
				var rates=parseInt(value.rating);
				if(rates !=0)
				{
				for (i=0;i<rates;i++)
				{
					
					$(".avis:eq("+j+") > .rating:eq("+i+")").attr('src','');
					$(".avis:eq("+j+") > .rating:eq("+i+")").attr('src','./images/check-done.png');
				}
				}
				j++;*/
				
				var htmls='<li class="result"><a href="#"><img src="./images/urgence-listing.png" alt="" width="70" height="70" class="float certi" style="'+urgence+'"><img src="./images/premium-listing.png" alt="" width="70" height="70" class="float valid" style="'+premium+'">'+value.src+'<h1>'+value.fname+' '+value.lname+'. ('+value.age+' ans)</h1><strong>'+value.locality+'</strong><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt=""></div></a></li>';
					$("#near-kid").append(htmls);
					
				});
			
			}
			
			$.mobile.changePage("#listing-parents",{transition:"flip"});
			}
			else
			{
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
				
				var lname=value.lname;
				/*if(value.lname != "" || value.lname != null)
				{
				var last=lname.substring(0,1);
				}
				else
				{
				var last="";
				}*/
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
				
				var htmls='<li class="result"><a href="#"><img src="./images/certifie-listing.png" alt="" width="70" height="70" class="float certi" style="'+certified+'"><img src="./images/valide-listing.png" alt="" width="70" height="70" class="float valid" style="'+valid+'">'+value.src+'<h1>'+value.fname+' '+value.lname+'. ('+value.age+' ans)</h1><strong>'+value.type_sitter+' - '+value.locality+'</strong><div class="avis"><span class="rating r'+value.rating+'"></span><b>'+value.rate+'&euro;/H</b></div><div class="distance"><img src="./images/distance-listing.png" height="30" alt=""><br/>'+value.distance+' KM</div><div class="arrow"><img src="./images/arrow-listing.png" height="20" alt=""></div></a></li>';
					$("#near-parent").append(htmls);
					
				});
			
			}
			$.mobile.changePage("#listing-kid",{transition:"flip"});
			}
			$('.logout').css('display','none');
			}
			else
			{
			window.localStorage["username"]="";
			window.localStorage["password"]="";
			window.localStorage['loggedin']='0';
			alert("You have entered wrong username or password.Please try again.");
			}
			}
			
   });
   $.mobile.loading( 'hide');
   }
  }
   
   function checkPreAuth() {
  
   if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
       $("#email").val(window.localStorage["username"]);
       $("#password").val(window.localStorage["password"]);
      login_check();
    }
}
 $(function(){
function register_user()
{
 
}
});

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

    /*$("#find").click(function(){
      $("#geocomplete").trigger("geocode");
	  // var al=$("#geocomplete").val();
	  // alert(al);
    });*/
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

    /*$("#find").click(function(){
      $("#geocomplete").trigger("geocode");
	  // var al=$("#geocomplete").val();
	  // alert(al);
    });*/
  });
  
 //registration-parent


function register_user_parent()
{
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
			alert('confirmation password did not matched.');
			$('input[name="password"]').parent('div').css('border-color','red');
			$('input[name="cpassword"]').parent('div').css('border-color','red');
			}
			else
			{
				$.ajax({
						 type: "POST",
							url: "http://codeuridea.net/kidssitter-prev/web/app_dev.php/getregister-parent",
							data:{lat:lat,lng:lng,password:password,fname:fname,lname:lname,address:address,locality:locality,country:country,birthdate:birthdate,email:email},
							dataType: "json",
							success: function(data)
							{
							if(data.result== true)
							{
								alert("Registration Successful");
								$.mobile.changePage('#connexion',{transition:'flip'});
							}
							else
							{
								alert("Some error occured during registration.Please try again.");
							}
							}
				   });
		} 
	}
}

//registration-Sitter


function register_user_sitter()
{
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
alert('confirmation password did not matched.');
$('input[name="s_password"]').parent('div').css('border-color','red');
$('input[name="s_cpassword"]').parent('div').css('border-color','red');
}
else
{
$.ajax({
		 type: "POST",
            url: "http://codeuridea.net/kidssitter-prev/web/app_dev.php/getregister-sitter",
			data:{lat:lat,lng:lng,password:password,fname:fname,lname:lname,address:address,locality:locality,country:country,birthdate:birthdate,email:email},
            dataType: "json",
            success: function(data)
			{
			if(data.result== "true")
			{
				alert("Registration Successful");
				$.mobile.changePage('#connexion',{transition:'flip'});
			}
			else
			{
				alert("Some error occured during registration.Please try again.");
			}
			}
   });
 }
 }
} 


//concept page navigation

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