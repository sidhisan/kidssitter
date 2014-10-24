/***** Facebook Operation**********/
var accessToken = "";
function loginByFb()
{
	
}

function connectFbReg(type)
{
	facebookConnectPlugin.login(["email,user_location,user_birthday,public_profile"],
		function (userAuth) { 
			facebookConnectPlugin.api( "me/?fields=id,email,birthday,first_name,last_name,gender,location,link", ["user_birthday"],
            function (userInfo) { 
				userInfo.fbacctok = userAuth.authResponse.accessToken;
				userInfo.userTpe = type;
				userRegWithFbData(userInfo);
			},
            function (response) { alert("" + error) }); 
		},
		function (error) { alert("" + error); }
	);
}

function userRegWithFbData(userObj)
{
	//alert(JSON.stringify(userObj));
	var sendData = {
		lat:"",
		lng:"",
		password:"",
		fname:(typeof userObj.first_name != 'undefined'?userObj.first_name:""),
		lname:(typeof userObj.last_name != 'undefined'?userObj.last_name:""),
		address:((typeof userObj.location != 'undefined' && typeof userObj.location.name != 'undefined')?userObj.location.name:""),
		locality:"",
		country:"",
		birthdate:(typeof userObj.birthday != 'undefined'?userObj.birthday:""),
		email:userObj.email,
		fbid:userObj.id,
		fbacctok:userObj.fbacctok,
		fbreg:1
	};
	//alert(JSON.stringify(sendData));
	var seturl = "http://codeuridea.net/kidssitter-prev/web/app_dev.php/getregister-parent";
	if(typeof userObj.userType != 'undefined' && userObj.userType == 'sitter')
	{
		seturl = "http://codeuridea.net/kidssitter-prev/web/app_dev.php/getregister-sitter";
	}
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
					$.mobile.changePage('#connexion',{transition:'flip'});
				}
				else
				{
					$.mobile.hidePageLoadingMsg(function(){},function(){});
					facebookConnectPlugin.logout();
					alert("Some error occured during registration.Please try again.");
				}
			}
   });
}
/***** Facebook Operation**********/