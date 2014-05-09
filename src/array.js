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