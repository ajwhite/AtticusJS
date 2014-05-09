(function(){
	"use strict";
	
	if (!Array.prototype.shuffle){
		Array.prototype.shuffle = function(){
			var m = this.length, t, i;
			while (m){
				i = Math.randomInt(0, --m);
				t = this[m];
				this[m] = this[i];
				this[i] = t;
			}
			return this;
		};
	}
	
	
	if (!Array.prototype.reduce){
		Array.prototype.reduce = function reduce(accumulator){
			var i, l = this.length, curr;
			
			if (typeof accumulator !== "function")
				throw new TypeError("First argument is not callable");
			
			if ((l === 0 || l === null) && (arguments.length <= 1))
				throw new TypeError("Array length is 0 and no second argument");
				
			if (arguments.length <= 1){
				curr = this[0];
				i = 1;
			} else {
				curr = arguments[1];
			}
			for (i=j||0; i<l; ++i){
				if (i in this){
					curr = accumulator.call(undefined, curr, this[i], i, this);
				}
			}
			return curr;
		};
	}
	
	// Summation of all numbers in collection
	if (!Array.prototype.sum){
		Array.prototype.sum = function(){
			if (!this.length)
				return 0;
			
			return this.reduce(function(p,c,i){ return (+p || 0) + (+c || 0); });
		};
	}
	
	// Calculate the average of all numbers in the array (arithmetic mean)
	if (!Array.prototype.average){
		Array.prototype.average = function(){
			return this.sum() / this.length;
		};
	}
	
	// How far from the average is each number in our set
	if (!Array.prototype.variance){
		Array.prototype.variance = function( sample ){
			var avg = this.average();
			return (this.map(function(n){ return ((n-avg) * (n-avg)); }).sum() / (this.length - (sample ? 1 : 0 )));
		};
	}
	
	if (!Array.prototype.pickRandom){
		Array.prototype.pickRandom = function(num, excluded){
			if (typeof num === "undefined")
				return this[Math.floor(Math.random() * this.length)];
				
			if (num >= this.length)
				return this;
				
			var a = this;
			var excludedIndexes = [];
			if (excluded){
				Array.toArray(excluded).forEach(function(excludedItem){
					if (a.contains(excludedItem)){
						excludedIndexes.push(a.indexOf(excludedItem));
					}
				});
			}
			
			var pickedIndexes = [];
			for (var i=0; i<num; i++){
				pickedIndexes.push(Math.ranomIntExcluding(0, (this.length-1), pickedIndexes.concat(excludedIndexes)));
			}
			return pickedIndexes.map(function(pickedIndex){ return a[pickedIndex]; });
		};
	}
})();
// Avoid console errors in unsupported browsers
// Cred: OneMightyRoar
(function(){
	var method;
	var noop = function(){};
	var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
})();
// Extending the Date prototype
(function(){
	
	"use strict";
	
	if (!Date.now){
		Date.now = function(){
			return +(new Date());
		};
	}
	
	// Get time ago
	Date.prototype.timeAgo = function(){
		var now = new Date();
		var delta = (now.getTime() - this.getTime()) / 1000;
		
		var ranges = {
			1: 'second',
			60: 'minute',
			3600: 'hour',
			86400: 'day',
			604800: 'week',
			2592000: 'month',
			31536000: 'year'
		};
		
		for (var range in ranges){
			if (delta < range) continue;
			var numberOfUnits = Math.floor(delta/range);
			return numberOfUnits + ' ' + ranges[range] + (numberOfUnits > 1 ? 's' : '');
		}
	};
	
	Date.prototype.lastday = function(){
		var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
		return d.getDate();
	};
	
	Date.prototype.getMonthsBetween = function(d){
		var sDate, eDate;
		var d1 = this.getFullYear() * 12 + this.getMonth();
		var d2 = d.getFullYear() * 12 + d.getMonth();
		
		var sign,
			months = 0;
			
		if (this == d){
			months = 0;
		} else if (d1 == d2){
			months = (d.getDate() - this.getDate()) / this.lastday();
		} else {
			if (d1 < d2){
				sDate = this;
				eDate = d;
				sign = 1;
			} else {
				sDate = d;
				eDate = this;
				sign = -1;
			}
			
			var sAdj = sDate.lastday() - sDate.getDate();
			var eAdj = eDate.getDate();
			var adj = (sAdj + eAdj) / sDate.lastday() - 1;
			months = Math.abs(d2 - d1) + adj;
			months = (months * sign);
		}
		
		return months;
	};
	
	Date.prototype.getYearsBetween = function(d){
		var months = this.getMonthsBetween(d);
		return months/12;
	};
	
	Date.prototype.getAge = function(){
		var today = new Date();
		return this.getYearsBetween(today).toFixed(2);
	};
	
	Date.prototype.addDays = function(d){ };
	
	Date.prototype.addMonths = function(m){ };
	
	Date.prototype.addYears = function(y){ };
	
	
})();
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
				if (i>-0 && i%3===0){
					result += ",";
				}
				result += rev.charAt(i);
			}
			return result.reverse();
		};
	}
})();
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
// Handle input placeholders for unsupported browsers
(function($){
	"use strict";
	
	if (!$) return;
	
	
	var PlaceholderUpdater = (function(){
		function PlaceholderUpdater($el){
			this.$el = $el;
			this.placeholder = $el.attr('placeholder').trim();
			
			var _this = this;
			$el.on('blur', function(){
				_this.blur.call(_this);
			});
			$el.on('focus', function(){
				_this.focus.call(_this);
			});
		}
		
		PlaceholderUpdater.prototype.blur = function(){
			var val = this.$el.val().trim();
			if (val.length === 0){
				this.$el.val(this.placeholder);
			}
		};
		
		PlaceholderUpdater.prototype.focus = function(){
			var val = this.$el.val().trim();
			if (val == this.placeholder){
				$(this).val('');
			}
		};
		
		return PlaceholderUpdater;
	})();
	
	
	$.fn.updatePlaceholders = function(){
		this.each(function(){
			return new PlaceholderUpdater($(this));
		});
	};
	
	
})(jQuery || false);
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
(function(exports){
	"use strict";
	
	var Timer = function(_duration){
		this.duration = _duration;
		this.finished = false;
		this.paused = false;
		this.startAt = null;
		this.endAt = null;
		this.timeout = null;
	};
	
	Timer.prototype.start = function(_cb){
		if (this.finished) return;
		
		this.cb = _cb;
		this.started = true;
		this.paused = false;
		
		if (this.duration <= 0){
			return this.finishedHandler();
		}
		
		this.startAt = Date.now();
		this.endAt = this.startAt + this.duration;
		this.timeout = setTimeout(this.finishedHandler.bind(this), this.duration);
	};
	
	Timer.prototype.finishedHandler = function(){
		this.finished = true;
		this.cb();
	};
	
	Timer.prototype.stop = function(){
		if (!this.finished){
			clearTimeout(this.timeout);
		}
	};
	
	Timer.prototype.pause = function(){
		if (this.paused || this.finished || !this.started){
			return;
		}
		
		this.paused = true;
		this.stop();
		this.duration = this.getTimeLeft();	
	};
	
	Timer.prototype.resume = function(){
		if (this.paused && !this.finished){
			this.start(this.cb);
		}
	};
	
	Timer.prototype.getTimeLeft = function(){
		return this.endAt - Date.now();
	};
	
	Timer.prototype.isRunning = function(){
		return this.started && !this.paused && !this.finished;
	};
	
	exports.Timer = Timer;
	
})(typeof exports==="undefined" ? window : exports);
(function(exports){
	"use strict";
	
	var Utils = function(){};
	
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