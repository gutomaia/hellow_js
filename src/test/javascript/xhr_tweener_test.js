/*  HellowJs, alpha version
 *  (c) 2010 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors will be always
 *  freely distributed under the terms of an GPLv3 license.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

XHRTweenerTest = TestCase("XHRTweenerTest");

XHRTweenerTest.prototype.EL = "\r\n";

XHRTweenerTest.prototype.setUp = function(){
	this._twn = new XHRTweener();
}

XHRTweenerTest.prototype.tearDown = function (){
	this._twn = null;
}

XHRTweenerTest.prototype.testExtractHttpResponseHeader = function() {
	var header = 'HTTP/1.1 200 OK' + this.EL;
	header += 'Date: Sun, 11 Jul 2010 18:46:58 GMT' + this.EL;
	header += 'Server: Microsoft-IIS/6.0'+ this.EL;
	header += 'PPServer: PPV: 30 H: BAYIDSPRTS1B04 V: 0' + this.EL;
	header += 'PassportURLs: DARealm=Passport.Net,DALogin=login.live.com/login2.srf,DAReg=https://accountservices.passport.net/UIXPWiz.srf,Properties=https://accountservices.msn.com/editprof.srf,Privacy=https://accountservices.passport.net/PPPrivacyStatement.srf,GeneralRedir=http://nexusrdr.passport.com/redir.asp,Help=https://accountservices.passport.net,ConfigVersion=14' + this.EL;
	header += 'Content-Length: 0' + this.EL;
	header += 'Content-Type: text/html' + this.EL;
	header += 'Cache-control: private' + this.EL;
	header += this.EL;
//	var props = this._twn.extractHttpResponseHeader(header);
//	var props = this._twn.extractVarParams(header);
/*	this.assertEquals('Sun, 11 Jul 2010 18:46:58 GMT', props['Date'], 'Date not equals');
	this.assertEquals('Microsoft-IIS/6.0', props['Server'], 'Server not equals');
	this.assertEquals('PPV: 30 H: BAYIDSPRTS1B04 V: 0', props['PPServer'], 'PPServer not equals');
	this.assertEquals('DARealm=Passport.Net,DALogin=login.live.com/login2.srf,DAReg=https://accountservices.passport.net/UIXPWiz.srf,Properties=https://accountservices.msn.com/editprof.srf,Privacy=https://accountservices.passport.net/PPPrivacyStatement.srf,GeneralRedir=http://nexusrdr.passport.com/redir.asp,Help=https://accountservices.passport.net,ConfigVersion=14', props['PassportURLs'], 'PassportURLs not equals');
	this.assertEquals('Sun, 11 Jul 2010 18:46:58 GMT', props['Date'], 'Date not equals');
	this.assertEquals('0', props['Content-Length'], 'Content-Length not equals');
	this.assertEquals('text/html', props['Content-Type'], 'Content-Type not equals');
	this.assertEquals('private', props['Cache-control'], 'Cache-control not equals');*/
}

XHRTweenerTest.prototype.testExtractPassportVars = function() {
	var passportURls = 'ARealm=Passport.Net,DALogin=login.live.com/login2.srf,DAReg=https://accountservices.passport.net/UIXPWiz.srf,Properties=https://accountservices.msn.com/editprof.srf,Privacy=https://accountservices.passport.net/PPPrivacyStatement.srf,GeneralRedir=http://nexusrdr.passport.com/redir.asp,Help=https://accountservices.passport.net,ConfigVersion=14';
	var props = this._twn.extractVarParams(passportURls);
	assertEquals('ARealm not equals', props.ARealm, 'Passport.Net');
	assertEquals('DALogin not equals', props.DALogin, 'login.live.com/login2.srf');
	assertEquals('DAReg not equals', props.DAReg, 'https://accountservices.passport.net/UIXPWiz.srf');
	assertEquals('Properties not equals', props.Properties, 'https://accountservices.msn.com/editprof.srf');
	assertEquals('Privacy not equals', props.Privacy, 'https://accountservices.passport.net/PPPrivacyStatement.srf');
	assertEquals('GeneralRedir not equals', props.GeneralRedir, 'http://nexusrdr.passport.com/redir.asp');
	assertEquals('Help not equals', props.Help, 'https://accountservices.passport.net');
	assertEquals('ConfigVersion not equals', props.ConfigVersion, '14');
}


XHRTweenerTest.prototype.testBuildParamVars = function() {
	var username = 'dvader%40empire.com';
	var password = 'ih8jedis';
	var lc = 'ct=1278901179,rver=5.5.4182.0,wp=FS_40SEC_0_COMPACT,lc=1033,id=507,ru=http:%2F%2Fmessenger.msn.com,tw=0,kpp=1,kv=4,ver=2.1.6000.1,rn=1lgjBfIL,tpf=b0735e3a873dfb5e75054465196398e0';
	var expected = 'Passport1.4 OrgVerb=GET,OrgURL=http%3A%2F%2Fmessenger%2Emsn%2Ecom,sign-in='
			+ username + ',pwd=' + password + ',' + lc;
	/*
	var authParama = {
		"OrgVerb":"GET",
		"OrgURL":"aaa",
		"sign-in":username,
		"pwd":password,
		"lc":lc
	};

	var authParams = array(
		'Passport1.4 OrgVerb' => 'GET',
		'OrgURL' => 'http%3A%2F%2Fmessenger%2Emsn%2Ecom',
		'sign-in' => $username,
		'pwd' => $password,
		'lc' => lc
	);
	var actual = this._twn.buildParamVars(authParams);
	this.assertEquals(expected, actual);
	*/
}

XHRTweenerTest.prototype.testBuildHttpRequestHeader = function () {
	var expected = 'GET /login2.srf HTTP/1.1' + this.EL;
	expected += 'Authorization: Passport1.4 OrgVerb=GET,OrgURL=http%3A%2F%2Fmessenger%2Emsn%2Ecom,sign-in=dvader%40empire.com,pwd=ih8jedis,ct=1278901179,rver=5.5.4182.0,wp=FS_40SEC_0_COMPACT,lc=1033,id=507,ru=http:%2F%2Fmessenger.msn.com,tw=0,kpp=1,kv=4,ver=2.1.6000.1,rn=1lgjBfIL,tpf=b0735e3a873dfb5e75054465196398e0'
			+ this.EL;
	expected +='Host: login.live.com' + this.EL;
	expected += this.EL;
	/*
	var requestParams = array(
		'Authorization' => 'Passport1.4 OrgVerb=GET,OrgURL=http%3A%2F%2Fmessenger%2Emsn%2Ecom,sign-in=dvader%40empire.com,pwd=ih8jedis,ct=1278901179,rver=5.5.4182.0,wp=FS_40SEC_0_COMPACT,lc=1033,id=507,ru=http:%2F%2Fmessenger.msn.com,tw=0,kpp=1,kv=4,ver=2.1.6000.1,rn=1lgjBfIL,tpf=b0735e3a873dfb5e75054465196398e0',
		'Host' => 'login.live.com'
	);
	var requestHeader = this._twn.buildHttpRequestHeader('login.live.com/login2.srf', requestParams);
	this.assertEquals(expected, requestHeader);
	*/
}

XHRTweenerTest.prototype.testEncode = function (){
	var username = 'dvader@empire.com';
	var expected = 'dvader%40empire.com';
	var actual = this._twn.urlencode(username);
	assertEquals(expected, actual);
}

