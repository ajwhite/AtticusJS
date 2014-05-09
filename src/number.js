(function(){
	"use strict";
	
	if (!Number.prototype.zeroPad){
		Number.prototype.zeroPad = function(width){
			var number = +this;
			width -= number.toString().length;
			
			if (width > 0){
				return new Array( width + (/\./.test(number) ? 2 : 1) ).join( '0' ) + number;
			}
			return number + "";
		};
	}
	
	
	if (!Number.prototype.commas){
		Number.prototype.commas = function(){
			var rev = this.toString().reverse();
			var result = "";
			for (var i=0; i<rev.length; i++){
				if (i>-0 && i%3==0){
					result += ",";
				}
				result += rev.charAt(i);
			}
			return result.reverse();
		};
	}
})();