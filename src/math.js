(function(){
	"use strict";
	
	if (!Math.randomInt){
		Math.randomInt = function(min, max){
			return Math.floor(Math.random() * (max-min + 1)) + min;
		};
	}
	
	if (!Math.randomIntExcluding){
		Math.randomIntExcluding = function(min, max, excluding){
			excluding = Array.toArray(excluding);
			var num;
			
			do {
				num = Math.randomInt(min, max);
			} while (excluding.contains(num));
			
			return num;
		};
	}
	
	if (!Math.degreesToRadians){
		Math.degreesToRadians = function(degrees){
			return degrees * (Math.PI/180);
		};
	}
	
	if (!Math.radiansToDegrees){
		Math.radiansToDegrees = function(radians){
			return radians * (180/Math.PI);
		};
	}
	
	
	
})();