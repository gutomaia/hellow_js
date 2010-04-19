function ProtocolTest(name){
	TestCase.call(this, name);
}

function ProtocolTest_setUp(){
	this.value1 = 2;
	this.value2 = 3;
}

function ProtocolTest_testDivideByZero(){
	var zero = 0;
	this.assertEquals("Infinity", 0/zero);
}

function ProtocolTest_testMe(){
	this.assertTrue(false);
}
