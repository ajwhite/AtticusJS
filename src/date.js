// Extending the Date prototype
(function(){
	
	"use strict";
	
	if (!Date.now){
		Date.now = function(){
			return +(new Date());
		}
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