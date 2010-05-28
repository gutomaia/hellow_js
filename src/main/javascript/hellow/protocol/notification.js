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
	this._contactListener = null;
	this._presenceListener = null;	
}

Notification.prototype = new Msnp();

Notification.prototype.authenticate = function (lc){
	this._passport = this._authenticationHandle.authenticate(this._username,this._password,lc);
}

Notification.prototype.setAuthenticationHandle = function (authenticationHandle){
	this._authenticationHandle = authenticationHandle;
}

Notification.prototype.superConnect = Msnp.prototype.connect;

Notification.prototype.connect = function (host, port){
	this.superConnect(host,port);
	this.send(this.ver());
	//this.listen();
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

Notification.prototype.addContactListener = function (contactListener){
	this._contactListener = contactListener;
}

Notification.prototype.addPresenceListener = function (presenceListener){
	this._presenceListener = presenceListener;
}

//Connection
Notification.prototype.onLogged = function (){
	if (this._connectionListener != null) this._connectionListener.onLogged();
}

Notification.prototype.onConnected = function (){
	if (this._connectionListener != null) this._connectionListener.onConnected();
}

//Contact
Notification.prototype.onAddContact = function (user, nick, lists, groups){
	if(this._contactListener != null) this._contactListener.onAddContact({'user':user,'nick':nick,'lists':lists,'groups':groups});
}

Notification.prototype.onRemoveContact = function (user){
//if(!empty($this->_contactListener)) $this->_contactListener->onRemoveContact($user);
}

Notification.prototype.onAddGroup = function (id, name, unk){
	if(this._contactListener != null) this._contactListener.onAddGroup({'group_id':id,'name':name});
}

Notification.prototype.onRemoveGroup = function (group){}

// Presence
Notification.prototype.onContactOnline = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactOnline(contact);
}

Notification.prototype.onContactOffline = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactOffline(contact);
}

Notification.prototype.onContactAvaiable = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactAvaiable(contact);
}

Notification.prototype.onContactBusy = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactBusy(contact);
}

Notification.prototype.onContactIdle = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactIdle(contact);
}

Notification.prototype.onContactBeRightBack = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactBeRightBack(contact);
}

Notification.prototype.onContactAway = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactAway(contact);
}

Notification.prototype.onContactOnPhone = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactOnPhone(contact);
}

Notification.prototype.onContactOutLunch = function (contact){
	if(this._presenceListener != null) this._presenceListener.onContactOutLunch(contact);
}

//abstract
Notification.prototype.execute = function (command) {};

Notification.prototype.ver = function () {
	return "VER "+ this._trid + " " + this.PROTOCOL_VERSION + " CVR0" + this.EL;
}

Notification.prototype.cvr = function () {
	return "CVR " + this._trid + " " + this.LOCALE_ID + " " + this.OS_TYPE + " " + this.OS_VERSION + " " + this.CPU_ARCHITECTURE + " " + this.CLIENT_NAME + " " + this.CLIENT_VERSION + " " + this.CLIENT_ID + " " + this._username + this.EL;
}

Notification.prototype.usr = function () {
	if (this._passport == null)
		return "USR " + this._trid + " TWN I " + this._username + this.EL;
	 else 
		return "USR " + this._trid + " TWN S " + this._passport + this.EL;
}

Notification.prototype.syn = function () {
	return "SYN 1 0" + this.EL;
}

Notification.prototype.chg = function () {
	return "CHG " + this._trid + " NLN 0" + this.EL;
}

Notification.prototype.qry = function (chl) {
}

Notification.prototype.challenger = function (chl) {
	return MD5(chl+this.CLIENT_CODE);
}

Notification.prototype.out = function () {
	return "OUT" + this.EL;
}