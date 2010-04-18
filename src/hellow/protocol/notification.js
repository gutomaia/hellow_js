/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors is and will be always
 *  freely distributable under the terms of an GPLv3 licence.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function Notification () {
	Msnp.call(this);
	this.MSN_HOST = "messenger.hotmail.com";
	this.MSN_PORT = 1863;
	this.PROTOCOL_VERSION = "MSNP8";
	this.LOCALE_ID = "0x0409";
	this.OS_TYPE = "win";
	this.OS_VERSION = "4.10"; //windows 98;
	this.CPU_ARCHITECTURE = "i386";
	this.CLIENT_NAME = "MSNMSGR";
	this.CLIENT_VERSION = "6.0.0602"; //5.0.0544
	this.CLIENT_ID = "MSMSGS";
	this.CLIENT_IDCODE = "msmsgs@msnmsgr.com";
	this.CLIENT_CODE = "Q1P7W2E4J9R8U3S5"; // needed for the chalenger
	this._username = null
	this._password = null;
	this._passport = null;
	this._connectionListener = null;
};

Notification.prototype = new Msnp();

Notification.prototype.authenticate = function (lc){
	this._passport = this._authenticationHandle.authenticate(this._username,this._password,lc);
}


Notification.prototype.connect = function (host, port){
	//_super.connect(host,port);
	this.send(ver());
	this.listen();
}

Notification.prototype.login = function (username, password) {
	this._username = username;
	this._password = password;
	this.connect(this.MSN_HOST, this.MSN_PORT);	
};

Notification.prototype.logout = function () {
	this.send(this.out());
	this.disconnect();
};

Notification.prototype.addConnectionListener = function (connectionListener){
	this._connectionListener = connectionListener;
}

Notification.prototype.addContactListener = function (contactListener){
	this._contactListener = contactListener;
}

//abstract
Notification.prototype.execute = function (command) {};

Notification.prototype.ver = function () {
	return "VER "+ this._trid + " " + this.PROTOCOL_VERSION + " CVR0" + EL;
};
Notification.prototype.cvr = function () {
	return "CVR " + this._trid + " " + this.LOCALE_ID + " " + this.OS_TYPE + " " + this.OS_VERSION + " " + this.CPU_ARCHITECTURE + " " + this.CLIENT_NAME + " " + this.CLIENT_VERSION + " " + this.CLIENT_ID + " " + this._username + this.EL;
};
Notification.prototype.usr = function () {
	if (this._passport == null)
		return "USR " + this._trid + " TWN I " + this._username + this.EL;
	 else 
		return "USR " + this._trid + " TWN S " + this._passport + this.EL;
	
};

Notification.prototype.syn = function () {
	return "SYN 1 0" + this.EL;
};

Notification.prototype.chg = function () {
	return "CHG " + this._trid + " NLN 0" + this.EL;
};

Notification.prototype.qry = function (chl) {
};

Notification.prototype.challenger = function (chl) {
	return MD5(chl+this.CLIENT_CODE);
};

Notification.prototype.out = function () {
	return "OUT" + this.EL;
};
