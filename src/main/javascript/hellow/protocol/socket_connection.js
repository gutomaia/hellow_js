/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors is and will be always
 *  freely distributable under the terms of an GPLv3 licence.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

//var socket = new WebSocket(location);
//socket.onopen = function(event) {
//  socket.postMessage(“Hello, WebSocket”);
//}
//socket.onmessage = function(event) { alert(event.data); }
//socket.onclose = function(event) { alert(“closed”); }

//if ("WebSocket" in window) {
//  var ws = new WebSocket("ws://example.com/service");
//  ws.onopen = function() {
//    // Web Socket is connected. You can send data by send() method.
//    ws.send("message to send"); ....
//  };
//  ws.onmessage = function (evt) { var received_msg = evt.data; ... };
//  ws.onclose = function() { // websocket is closed. };
//} else {
//  // the browser doesn't support WebSocket.
//}

function SocketConnectionHandle () {
}

SocketConnectionHandle.prototype = {
	_socket:null
}

SocketConnectionHandle.prototype.getSocket = function() {
	return this._socket;
}

SocketConnectionHandle.prototype.connect = function(host, port){
	this._socket = new WebSocket('ws://'+host+':'+port);
	//this._socket.onmessage = function (event) {alert(event.data));}; 
}

SocketConnectionHandle.prototype.disconnect = function(){
}

SocketConnectionHandle.prototype.send = function (cmd) {
	this._socket;
}

SocketConnectionHandle.prototype.nextCommand = function () {
}

SocketConnectionHandle.prototype.hasMoreCommands = function() {

}

//	public class SocketConnection implements ConnectionHandle {
//		private var _socket:Socket;

//		public function SocketConnection(){}

//		private function getSocket():Socket {
//		if ($this->_socket < 0) {
//			$this->disconnect();
//		} else {
//			return $this->_socket;
//		}

//			return _socket;
//		}

//		public function connect(host:String, port:int):void {
//		if ($this->getSocket()) {
//			socket_close($this->_socket);
//			$this->_socket == null;
//		}
//		$this->_socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
//		$result = socket_connect($this->_socket, $host, $port);
			
//		}

//		public function disconnect():void {
//		if ($this->_socket) {
//			socket_close($this->_socket);
//			$this->_socket = null;
//		} else {
//			$this->_socket = null;
//		}

//		}
//		
//		public function send(cmd:String):void {
//		if ($this->getSocket()) {
//			socket_write($this->getSocket(), $cmd, strlen($cmd));
//			flush();
//		}

//		}

//		public function nextCommand(): String {
//		if ($this->getSocket()) {
//			$command = socket_read($this->getSocket(), 2048, PHP_NORMAL_READ);
//			$cmd = substr($command, 0, 3);
//			if ($cmd == 'MSG') {
//				$command_aux = explode(' ', $command);
//				$bytes = intval($command_aux[sizeof($command_aux) - 1]);
//				$payload = socket_read($this->getSocket(), $bytes);
//				$command .= $this->EL. $payload;
//			}
//		}
//		return $command;
//
//			return "";
//		}

//		public function hasMoreCommands():Boolean {
//			return true;
//		}

