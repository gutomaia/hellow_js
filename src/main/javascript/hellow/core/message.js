/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors will be always
 *  freely distributed under the terms of an GPLv3 license.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function Message(message, trid, username){
	this.EL = "\r\n";
	this.TYPE_CONTROL = 1;
	this.TYPE_MSG = 2;
	this._trid = -1;
	this._header = [];
	this._body = null;
	this._messageType = 0;
	if (message != null && trid == null && username == null){
		this._header = this.extractMsgHeader(message);
		this._body = this.extractBody(message);
	}else if (message != null && trid != null && username == null){
		this._trid = trid;
		this._messageType = this.TYPE_MSG;
		this._body = message;
		this._header[0]="MIME-Version: 1.0";
		this._header[1]="Content-Type: text/plain; charset=UTF-8";
		this._header[2]="X-MMS-IM-Format: FN=MS%20Sans%20Serif; EF=; CO=0; CS=0; PF=0";
	}else if (message == null && trid != null && username != null){
		this._trid = trid;
		this._messageType = this.TYPE_CONTROL;
		this._body = this.EL;
		this._header[0]="MIME-Version: 1.0";
		this._header[1]="Content-Type: text/x-msmsgscontrol";
		this._header[2]="TypingUser: "+username;
	}
}

Message.prototype.getBody = function(){
	return this._body;
}

Message.prototype.getHeader = function(){
	return this._header;
}

Message.prototype.getHeaderParameter = function(parameter){
	for (var i=0; i< this._header.length; i++){
		if (this._header[i].indexOf(parameter) == 0){
			return this._header[i].substring(parameter.length+2,this._header[i].length);
		}
	}
	return null;
}


Message.prototype.extractMsgHeader = function (message){
	var cutter = message.indexOf(this.EL+this.EL);
	var headerStr = message.substring(0,cutter);
	var parameters = headerStr.split(this.EL);
	var header = [];
	var hc=0;
	for (var i=0;i<parameters.length;i++){
		if (parameters[i].substring(0,3) == "MSG"){
		}else{
			header[hc]=parameters[i];
			hc++;
		}
	}
	return header;
}

Message.prototype.extractBody = function(message){
	var cutter = message.indexOf(this.EL+this.EL) + 4;
	return message.substring(cutter, message.length);
}

Message.prototype.formatHeader = function(){
	var headerStr = "";
	for (var i=0;i< this._header.length;i++){
		headerStr += this._header[i] + this.EL;		
	}
	return headerStr;
}

Message.prototype.send = function(){
	var envelope = "";
	envelope += this.formatHeader();
	envelope += this.EL;
	envelope += this._body;
	var mode = (this._messageType == this.TYPE_CONTROL)?" U ":" N ";
	var cmd = "MSG "+ this._trid + mode + envelope.length + this.EL + envelope;
	return cmd;
}