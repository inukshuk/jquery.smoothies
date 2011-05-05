/*global jQuery: true */

"use strict";

;(function ($, smoothie, smoothies, version) {
	var store = {},

	counter = 0,
	
	viewport = 'html, body',
	
	methods = {
		init: function (options) {
			var opts = $.extend({}, $.fn[smoothie].defaults),
			postion = { top: this.scrollTop(), left: this.scrollLeft() };
				
			opts.hash = opts.hash || this.attr('id') || this.attr('name') || smoothie + counter++;
			
			// save options as data
			this.data($[smoothies].settings['data.key'], {
				options: opts
			});
			
			// TODO remove old smoothie if hash clash?
			
			// put the smoothie in the store
			store[opts.hash] = { smoothie: this, position: position };
			
			return true;
		},
		options: function () {
			return this.data($[smoothies].settings['data.key'].options);
		},
		disable: function () {
			return this.data($[smoothies].settings['data.key'].options).disabled = true;
		},
		enable: function () {
			this.data($[smoothies].settings['data.key'].options).disabled = false;
			return true;
		},
		remove: function () {
			var opts = this.data($[smoothies].settings['data.key'].options);
			
			// remove smoothie from store
			store[opts.hash] = null;
			
			// remove options
			this.data($[smoothies].settings['data.key'], null);
			
			return true;
		}
	};
	
	// Aliases
	methods.start = methods.init;

	methods.opts = methods.options;
	
	methods.rm = methods.remove;
	methods.stop = methods.remove;

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
		
		if (hash) {
			return (smoothies = store[hash]) && smoothies.smoothie || $();
		}
		
		smoothies = $();
		
		$.each(store, function () {
			smoothies = smoothies.add(this.smoothie);
		});
		
		return smoothies;
	};
	
	// The plugin settings
	$[smoothies].settings = {
		'data.key': smoothie,
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