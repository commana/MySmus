var ArrayTest = TestCase("ArrayTest");

ArrayTest.prototype.testShouldProduceCartesianProduct = function() {
    var a1 = [1, 2];
    var a2 = [3, 4];
    
    var actual   = a1.cartesianProduct(a2);
    var expected = [[1,3], [1,4], [2,3], [2,4]];
    
    assertEquals(expected, actual);
}

ArrayTest.prototype.testShouldPairUpArray = function() {
    var a = [1, 2, 3, 4];
    
    var actual   = a.pairs();
    var expected = [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]];
    
    assertEquals(expected, actual);
}

ArrayTest.prototype.testShouldAddUpMasses = function() {
    var b1 = new Blob(null, null, 10);
    var b2 = new Blob(null, null, 20);
    var b3 = new Blob(null, null, 30);
    
    assertEquals(60, [b1, b2, b3].mass()); 
}
