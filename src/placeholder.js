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