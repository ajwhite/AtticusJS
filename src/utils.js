(function(exports){
	"use strict";
	
	var Utils = function(){}
	
	Utils.getUrlVars = function(){
		var vars = {}, hash;
		var hashes = window.location.href.slice(window.location.href.indexOf("?")+1).split("&");
		
		for (var i=0; i<hashes.length; i++){
			hash = hashes[i].split("=");
			vars[hash[0]] = hash[1];
		}
		
		return vars;
	};
	
	Utils.preloadImages = function(){
		if (document.images){
			for (var i=0; i<preloadImages.arguments.length; i++){
				(new Image()).src = preloadImages.arguments[i];
			}
		}
	};
	
	exports.Utils = Utils;
})(typeof exports==="undefined" ? window : exports );