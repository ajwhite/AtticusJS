(function(){
	"use strict";
	
	if (!Object.keys){
		Object.keys = (function(){
			var hop = Object.prototype.hasOwnPrototype,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable("toString"),
				dontEnums = ["toString", "toLocalString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
				dontEnumsLength = dontEnums.length;
				
			return function (obj){
				if (typeof obj !== "object" && typeof obj !== "function" || obj === null){
					throw new TypeError("Object.keys called on non-object");
				}

				var result = [];
				
				for (var prop in obj){
					if (hop.call(obj, prop)){
						result.push(prop);
					}
				}
				
				if (hasDontEnumBug){
					for (var i=0; i<dontEnumsLength; i++){
						if (hop.call(obj, dontEnums[i])){
							result.push(dontEnums[i]);
						}
					}
				}
				
				return result;
			};
		})();
	}
	
	if (!Object.values){
		Object.values = function(obj){
			var result = [];
			Object.keys(obj).forEach(function(key){
				result.push(obj[key]);
			});
			return result;
		};
	}
	
	if (!Object.forEach){
		Object.forEach = function(obj, cb){
			if (!cb) return;
			
			Object.keys(obj).forEach(function(key, i){
				cb(key, obj[key], i);
			});
		};
	}
	
	if (!Object.every){
		Object.every = function(obj, cb){
			if (!cb) return;
			
			var matches = true;
			Object.keys(obj).forEach(function(key, i){
				matches = cb(key, obj[key], i);
			});
			
			return matches;
		};
	}
	
	if (!Object.merge){
		Object.merge = function(obj1, obj2, dupHandler, onlyKeys){
			var hop = Object.prototype.hasOwnProperty;
			
			Object.forEach(obj2, function(key){
				if (onlyKeys && onlyKeys.indexOf(key) === -1)
					return;
				
				if (!hop.call(obj1, key) || !dupHandler)
					obj1[key] = obj2[key];
				else
					obj1[key] = dupHandler(obj1[key], obj2[key]);
			});
			
			return obj1;
		};
	}
	
	if (!Object.isObject){
		Object.isObject = function(arg){
			return arg !== null && !Array.isArray(arg) && typeof arg === "object";
		};
	}
	
})();