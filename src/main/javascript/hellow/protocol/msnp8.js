/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors is and will be always
 *  freely distributed under the terms of an GPLv3 license.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function Msnp8(){
	Notification.call(this);
	this.execute = function (msg) {
		var command = msg.substring(0,3);
		var params = msg.trim().split(' ');
		switch(command){
			case "VER":
				this.send(this.cvr());
				break;
			case "CVR":
				this.send(this.usr());
				break;
			case "XFR" :
				var host_port = params[3].split(':');
				this.connect(host_port[0], host_port[1]);
				break;
			case "USR" :
				if (params[2] == "TWN") {
					this.authenticate(params[4]);
					this.send(this.usr());
				}else if (params[2] == "OK") {
					this.onLogged(null);
					this.send(this.syn());
				}
				break;
			case "SYN" :
				this.send(this.chg());
				break;
			case "GTC" :
				break;
			case "BLP" :
				break;
			case "PRP" :
				break;
			case "LSG" :
				this.onAddGroup(params[1], params[2], params[3]);
				break;
			case "LST" :
				//if (sizeof($params) == 5) {						
					this.onAddContact(params[1], params[2], params[3], params[4]);
				//} else {
					//this.onAddContact(params[1], params[2], params[3]);
				//}
				break;
			case "PHH":
			case "PHW":
			case "PHM":
			case "MOB":
			case "MBE":
			case "BPR" :
				break;
			case "ILN" :				
				break;
			case "FLN" :
				//$this->onContactOffline($contact);
				break;
			case "NLN" :
				break;
			case "MSG" :
				break;
			case "RNG" :
				this.onRing(params[1], params[2], params[4], params[5], params[6]);
				break;
			case "CHG" :
				this.onConnected();
				break;
			case "CHL" :
				this.send(this.qry(params[2]));
				break;
			case "QRY" :
			break;				
			case "207" :
				this.disconnect();
				break;
			default :
				//$cont = false;
				//die();
				//$this->disconnect();
		}
	}
}

Msnp8.prototype  = new Notification();
