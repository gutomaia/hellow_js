/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors is and will be always
 *  freely distributable under the terms of an GPLv3 licence.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function Msnp8(){
	Notification.call(this);
	this.execute = function (command) {
		command = "VER";
		switch(command){
			case "VER":
				return this.send(this.cvr());
		}
	}
}

Msnp8.prototype  = new Notification();

msn = new Msnp8();
msn.login("hellowgmn@hotmail.com","123456");

//alert("teste");
