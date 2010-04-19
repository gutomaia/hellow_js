function ProtocolTest(name){
	TestCase.call(this, name);
}

ProtocolTest.prototype = new TestCase();
ProtocolTest.glue();

function ProtocolTest_setUp(){
	this.value1 = 2;
	this.value2 = 3;
}

function ProtocolTest_testDivideByZero(){
	var zero = 0;
//	this.assertEquals("Infinity", 8/zero);
}

function ProtocolTest_testMe(){
	this.assertTrue(true);
}
