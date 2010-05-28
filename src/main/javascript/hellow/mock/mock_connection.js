/*  HellowPhp, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors will be always
 *  freely distributable under the terms of an GPLv3 licence.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function MockConnection(){
	this.sended = null;
	this.received = null;
	this.host = null;
	this.port = null;
}

MockConnection.prototype.connect = function(host, port) {
	this.host = host;
	this.port = port;
}

MockConnection.prototype.disconnect = function() {
}

MockConnection.prototype.send = function(cmd){
	this.sended = cmd;
}

MockConnection.prototype.receive = function (cmd){
}

MockConnection.prototype.nextCommand = function(){
	return null;
}

MockConnection.prototype.hasMoreCommands = function(){
	return false;
}