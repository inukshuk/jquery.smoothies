/*global jQuery: true */

"use strict";

;(function ($, smoothie, smoothies, version) {
	var store = {},

	aSmoothie = function (scope) {
		var that = {}, my = scope || {};
		
		that.init = function (element, options) {
			my.$ = $(element);
			my.options = $.extend({}, $.fn[smoothie].defaults);			
			
			this.hash = my.hash();
			
			return this;
		};
		
		// Returns the Smoothie's position (cached if enabled in global settings)
		that.position = function () {
			if ($[smoothies].settings.caching === false) {
				my.position.refresh();
			}
			return my.position();
		};

		// Re-calculates Smoothie's position
		that.refresh = function () {
			my.position.refresh();
		};

		that.element = function () {
			return my.$;
		};
		
		that.options = function () {
			return my.options;
		};
		
		// Aliases
		that.start = that.init;
		that.rm = that.remove;
		
		my.position = function () {
			return my._position || my.position.refresh();
		};
		
		my.position.refresh = function () {
			return my._position = { top: my.$.scrollTop(), left: my.$.scrollLeft() };
		};		

		// Returns the Smoothie's hash
		my.hash = function () {
			return my.$.data('hash') || my.$.attr('id') || my.$.attr('name') || null;
		};
		
		return that;
	},
	
	// jQuery plugin methods
	methods = {
		init: function (options) {
			this.each(function () {
				var s = aSmoothie().init(this, options);
				store[s.hash] = s;
			});
		},
		remove: function () {
			this.each(function () {
				var s = aSmoothie().init(this, {});
				delete store[s.hash];
			});
		}
	},
	
	viewport = 'html, body';
	

	// Sanity checks
	if ($ === undefined) {
		return false;
	}
	
	// TODO check for required plugins

	// TODO Work around viewport quirks
	viewport = $('html');
	// $(viewport).each(function () {
	// 	var $this = $(this), reset = $this.attr('scrollTop');
	// 
	// 	$this.attr('scrollTop', reset + 1);
	// 	
	// 	if ($this.attr('scrollTop') === reset + 1) {
	// 		viewport = $(this.nodeName.toLowerCase());
	// 		$this.attr('scrollTop', reset);
	// 		return false;
	// 	}
	// });
	
	
	// The jQuery plugin method
	$.fn[smoothie] = function (argument) {
		var method;
		
		if (this.length) {
			method = typeof argument === 'string' && argument || 'init';
			
			if (methods[method]) {
				methods[method].apply(this, arguments);
			}
			else {
				$.error('Method ' + method + ' is not supported by jquery-' + smoothies);
			}
		}
		
		return this;
	};

	// The default options
	$.fn[smoothie].defaults = {
		offset: 0,
		flavor: 'swing',
		duration: 'normal',
		callback: null 
	};

	// Returns a jQuery collection of all smoothies; or of the smoothie
	// registered with the given hash.
	$[smoothies] = function (hash) {
		var smoothies;
		
		// return single smoothie if hash given
		if (hash) {
			return store[hash] && store[hash].element() || $();
		}
		
		// otherwise return all smoothies
		smoothies = $();
		$.each(store, function () {
			smoothies = smoothies.add(this.element());
		});
		
		return smoothies;
	};
	
	// Removes the smoothie with the given hash from the store; removes all
	// smoothies if no hash given
	$[smoothies].remove = function (hash) {
		if (hash) {
			delete store[hash];
		}
		else {
			store = {};
		}
		return true;
	};
	
	// The plugin settings
	$[smoothies].settings = {
		'data.key': [smoothie, 'data'].join('-'),
		'caching': true
	};
	
	// The plugin version string
	$[smoothies].version = version;
	
	
	$(window).hashchange(function (event) {
		var smoothie = store[window.location.hash];

		if (smoothie) {
			event.preventDefault();
		}

		event.preventDefault();
		
		return true;
	});

	$('body').delegate('a[href^="#"]', 'click', function (event) {
		var hash = this.attr(href).slice(1);
		
		if (store[hash]) {
			event.preventDefault();
			window.location.hash = hash;
		}
		
		return true;
	});

	return true;

}(jQuery, 'smoothie', 'smoothies', '0.0.1'));