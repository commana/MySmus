var GameTimeTest = TestCase("GameTimeTest");

GameTimeTest.prototype.testShouldComputeGameTime = function() {
    var fps   = 30;
    var scale = 1.0;
    
    var gametime  = new GameTime(fps, scale);
    
    assertEquals(scale/fps, gametime.value());
}
