(function(){
	"use strict";
	
	if (!String.prototype.reverse){
		String.prototype.reverse = function(){
			var i= this.length; 
			var result = "";
			while (i>0){
				result += this.charAt(--i);
			}
			return result;
		};
	}
	
	if (!String.prototype.startsWith){
		String.prototype.startsWith = function(s){
			return this.indexOf(s) === 0;
		};
	}
	
	if (!String.prototype.endsWith){
		String.prototype.endsWith = function(e){
			return this.reverse().startsWith(e);
		};
	}
	
	if (!String.prototype.contains){
		String.prototype.contains = function(substr){
			return this.indexOf(substr) !== -1;
		};
	}
	
	if (!String.prototype.replaceAll){
		String.prototype.replaceAll = function(match, replacement){
			return this.replace(new RegExp(needle, "g"), replacement);
		};
	}
	
	if (!String.prototype.strip){
		String.prototype.strip = function(){
			var chars = Array.isArray(arguments[0]) ? arguments[0].join() : Array.prototype.slice.call(arguments).join();
			return this.replace(new RegEx('[' + chars + ']', 'g'), "");
		};
	}
	
	if (!String.prototype.capitalize){
		String.prototype.capitalize = function(){
			return this.charAt(0).toUpperCase() + this.substr(1);
		};
	}
	
	if (!String.prototype.captalizeFirt){
		String.prototype.capatalizeFirst = function(){
			var parts = this.split(" ");
			return (parts.map(function(part){
				return part.capitalize();
			})).join(" ");
		};
	}
	
	if (!String.prototype.toProperCase){
		String.prototype.toProperCase = function(){
			return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
		};
	}
	
	if (!String.prototype.parts){
		String.prototype.parts = function(){
			return this.split(" ");
		};
	}
	
	if (!String.prototype.toArray){
		String.prototype.toArray = function(){
			return this.split("");
		};
	}
	
})();