/*  HellowJs, alpha version
 *  (c) 2010 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors will be always
 *  freely distributed under the terms of an GPLv3 license.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function XHRTweener(){};

XHRTweener.prototype.urlencode = function(str) {
	str = escape(str);
	str = str.replace('+', '%2B');
	str = str.replace('%20', '+');
	str = str.replace('*', '%2A');
	str = str.replace('/', '%2F');
	str = str.replace('@', '%40');
	return str;
}

XHRTweener.prototype.newXMLHttpRequest = function(){
	var xhr = null;
	try {
		xhr = Components.classes["@mozilla.org/xmlextras/xmlhttprequest;1"].createInstance();
	}catch(e){
		try {
			xhr = new XMLHttpRequest();	
		}catch(e){
			xhr = new ActiveXObject("Msxml2.XMLHTTP")
		}		
	}
	return xhr;
}


// extractHttpResponseHeader

XHRTweener.prototype.extractVarParams = function (params){
	var parameters = params.split(',');
	var keyvalue = null;
	var map = {};
	for (var i=0; i < parameters.length;i++){
		var cutter = parameters[i].indexOf("=");
		var key = parameters[i].substring(0,cutter);
		var value = parameters[i].substring(cutter+1,parameters[i].length);
		key = (key == 'Passport1.4 da-status')?'daStatus':key;
		key = (key == 'from-PP')?'fromPP':key;
		eval("map."+key+"= value;");
	}
	return map;
}

XHRTweener.prototype.authenticate = function (username, password, lc){
	try {
		var xhr = this.newXMLHttpRequest()
		xhr.open("get", "https://nexus.passport.com/rdr/pprdr.asp", false);
		xhr.send();
		while (xhr.readyState != 4) {};
		if (xhr.getResponseHeader("PassportURLs") != null){
			var passportURLs = xhr.getResponseHeader("PassportURLs");
			var login = this.extractVarParams(passportURLs);
			var xhr = this.newXMLHttpRequest()
			xhr.open("get", "https://"+login.DALogin, false);
			var autorization = "Passport1.4 OrgVerb=GET,";
			autorization += "OrgURL=http%3A%2F%2Fmessenger%2Emsn%2Ecom,";
			autorization += "sign-in="+this.urlencode(username)+",";
			autorization += "pwd="+this.urlencode(password)+",";
			autorization += lc;
			xhr.setRequestHeader("Authorization", autorization);
			xhr.send();
			while (xhr.readyState != 4) {};
			if (xhr.getResponseHeader("Authentication-Info") != null){
				var authinfo = xhr.getResponseHeader("Authentication-Info");
				var auth = this.extractVarParams(authinfo);
				return auth.fromPP.substring(1,auth.fromPP.length - 1);
			}else{
				//fail;
			}
		};
	} catch (e){
		//fail
	}
	return "";
}
