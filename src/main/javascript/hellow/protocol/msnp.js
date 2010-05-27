/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors is and will be always
 *  freely distributable under the terms of an GPLv3 licence.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function alert(test){
	java.lang.System.out.println(test);
};

function Msnp () {
	this._connectionHandle = new SocketConnectionHandle();
};

Msnp.prototype = {
	EL:"\r\n",
	_trid:1,
	_connectionHandle:null,
	_commandListener:null
}

Msnp.prototype.addCommandListener = function(commandListener){
	this._commandListener = commandListener;
}

Msnp.prototype.onCommandReceived = function (command) {
}

Msnp.prototype.onCommandSended = function (command) {
	
}

Msnp.prototype.setConnectionHandle = function (connectionHandle){
	this._connectionHandle = connectionHandle;
}

//abstract see if it is going to be needed
Msnp.prototype.execute = function (){
}

//final
Msnp.prototype.send = function (command){
	this._connectionHandle.send(command);
//	this.onCommandSended(command);
	this._trid++;
}

Msnp.prototype.connect = function (host, port) {
	this._connectionHandle.connect(host,port);
}

Msnp.prototype.disconnect = function () {
	this._connectionHandle.disconnect();
}

Msnp.prototype.listen = function () {
	var command = "";
	while (this._connectionHandle.hasMoreCommands()){
		command = this._connectionHandle.nextCommand();
		this.execute(command);
		//this.onCommandReceived(command);
	}
	this._connectionHandle.disconnect();
}
