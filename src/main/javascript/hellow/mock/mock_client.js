/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors will be always
 *  freely distributed under the terms of an GPLv3 license.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function MockClient(){
	this.logged = false;
	this.connected = false;
	this.group = null;
	this.contact = null;
}

MockClient.prototype.onLogged = function (){
	this.logged = true;
}

MockClient.prototype.onConnected = function (){
	this.connected = true;
}

MockClient.prototype.onAddContact = function(contact){
	this.contact = contact;
}

MockClient.prototype.onRemoveContact = function(contact){
}

MockClient.prototype.onAddGroup = function(group){
	this.group = group;
}

MockClient.prototype.onRemoveGroup = function(group){
}
