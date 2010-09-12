/*  HellowJs, alpha version
 *  (c) 2009 Gustavo Maia Neto (gutomaia)
 *
 *  HellowJs and all other Hellow flavors will be always
 *  freely distributed under the terms of an GPLv3 license.
 *
 *  Human Knowledge belongs to the World!
 *--------------------------------------------------------------------------*/

function MessageTest(name){
	TestCase.call(this, name);
}

MessageTest.prototype = new TestCase();
MessageTest.glue();

function MessageTest_testMsgReveiceTypingUser() {
	var command = "MSG dvader@empire.com Vader 90\r\n"
			+ "MIME-Version: 1.0\r\n"
			+ "Content-Type: text/x-msmsgscontrol\r\n"
			+ "TypingUser: dvader@empire.com\r\n" + "\r\n" + "\r\n";
	var message = new Message(command);
	this.assertNotNull(message.getHeader());
	this.assertEquals("1.0", message.getHeaderParameter("MIME-Version"));
	this.assertEquals("text/x-msmsgscontrol", message.getHeaderParameter("Content-Type"));
	this.assertEquals("dvader@empire.com", message.getHeaderParameter("TypingUser"));
	this.assertEquals("\r\n", message.getBody());
}

function MessageTest_testMsgReceiveHello() {
	var command = "MSG dvader@empire.com Vader 143\r\n"
			+ "MIME-Version: 1.0\r\n"
			+ "Content-Type: text/plain; charset=UTF-8\r\n"
			+ "X-MMS-IM-Format: FN=Lucida%20Sans%20Unicode; EF=B; CO=ff0000; CS=0; PF=22\r\n"
			+ "\r\n" + "Hello.";
	var message = new Message(command);
	this.assertNotNull(message.getHeader());
	this.assertEquals("1.0", message.getHeaderParameter("MIME-Version"));
	this.assertEquals("text/plain; charset=UTF-8",message.getHeaderParameter("Content-Type"));
	this.assertEquals("FN=Lucida%20Sans%20Unicode; EF=B; CO=ff0000; CS=0; PF=22",message.getHeaderParameter("X-MMS-IM-Format"));
	this.assertEquals("Hello.", message.getBody());
}

function MessageTest_testMsgSendTypingUser() {
	var command = "MSG 2 U 90\r\n" + "MIME-Version: 1.0\r\n"
			+ "Content-Type: text/x-msmsgscontrol\r\n"
			+ "TypingUser: dvader@empire.com\r\n" + "\r\n" + "\r\n";
	var message = new Message(null, 2, "dvader@empire.com");
	this.assertEquals(command, message.send());
}

function MessageTest_testMsgSendAreYouThere() {
	var command = "MSG 5 N 138\r\n"
			+ "MIME-Version: 1.0\r\n"
			+ "Content-Type: text/plain; charset=UTF-8\r\n"
			+ "X-MMS-IM-Format: FN=MS%20Sans%20Serif; EF=; CO=0; CS=0; PF=0\r\n"
			+ "\r\n" + "Are you there?";
	var message = new Message("Are you there?", 5);
	this.assertEquals(command, message.send());
}

function MessageTest_testMsnSendILikeTurtles(){
	var command = "MSG 8 A 139\r\n"+
    "MIME-Version: 1.0\r\n"+
    "Content-Type: text/plain; charset=UTF-8\r\n"+
    "X-MMS-IM-Format: FN=MS%20Sans%20Serif; EF=; CO=0; CS=0; PF=0\r\n"+
    "\r\n"+
    "I like turtles.";
	var message = new Message("I like turtles.", 8);
	//assertEquals(command, message.send());
}



