/*global jQuery: true */

"use strict";

(function ($, smoothie, smoothies, version, window, undefined) {
	var store = {},

	aSmoothie = function (scope) {
		var that = {}, my = scope || {};
		
		that.init = function (element, options) {
			my.$ = $(element);
			my.options = $.extend({}, $.fn[smoothie].defaults, options);			
			my.viewport = viewport(my.options.viewport);
			
			this.hash = my.hash();
			
			my.$.data('smoothie', this);
			
			return this;
		};
		
		// Returns the Smoothie's position (cached if enabled in global settings)
		that.position = function () {
			if ($[smoothies].settings.caching === false) {
				my.position.refresh();
			}
			return my.position();
		};

		that.go = function () {
			if ($.isFunction(my.options.before)) {
				my.options.before.apply(my.$,[]);
			}
			
			if (!this.visible()) {
				my.viewport.stop().animate(this.position(), my.options.duration,
					my.options.easing, $.proxy(my.options.after, my.$));
			}
			else {
				if ($.isFunction(my.options.after)) {
					my.options.after.apply(my.$,[]);
				}				
			}
		};
		
		// Returns true if the Smoothie is currently inside the viewport
		that.visible = function () {
			var vp = my.viewport, $w = $(window), w = $w.width(), h = $w.height(),
				o = my.$.offset(), dy = o.top - my.options.offset - vp.scrollTop(),
				dx = o.left - my.options.offset - vp.scrollLeft();

			// top and left edges
			if (dy <= 0 || dx <= 0) {
				return false;
			}

			dy = o.top + my.$.outerHeight() - h - vp.scrollTop();
			dx = o.left + my.$.outerWidth() - w - vp.scrollLeft();
			
			// bottom and right edges
			return dy <= 0 && dx <= 0;
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
			var offset = my.$.offset();
			return my._position = {
				scrollTop: offset.top - my.options.offset,
				scrollLeft: offset.left - my.options.offset
			};
		};		

		// Returns the Smoothie's hash
		my.hash = function () {
			return my.$.data('hash') || null; // my.$.attr('id') || my.$.attr('name') || null;
		};
		
		return that;
	},
	
	// jQuery plugin methods
	methods = {
		init: function (options) {
			return this.each(function () {
				var s = aSmoothie().init(this, options);
				store[s.hash] = s;
			});
		},
		get: function () {
			return this.map(function () {
				return store[$(this).data('hash')];
			});
		},
		remove: function () {
			return this.each(function () {
				delete store[$(this).data('hash')];
			});
		}
	},
	
	//
	// Different Browser's use different object's to scroll the viewport.
	// This function tries to select a suitable candidate without doing any
	// browser sniffing.
	//
	// Credit goes to Karl Swedberg's Smooth-Scroll implementation:
	// https://github.com/kswedberg/jquery-smooth-scroll/
	//
	viewport = function (candidates) {
		var vp;
	
		$(candidates).each(function () {
			var $this = $(this);

			if (this === document || this === window) { return true; }

			if ($this.scrollTop() > 0) {
				vp = $this;
				return false;
			}

			$this.scrollTop(1);

			if ($this.scrollTop() > 0) {
				$this.scrollTop(0);
				vp = $this;
				return false;
			}

			return true;
		});	
		
		return vp;
	};
	

	// Sanity checks
	if ($ === undefined) {
		return false;
	}
	
	// TODO check for required plugins

	
	// The jQuery plugin method
	$.fn[smoothie] = function (argument) {
		var method;
		
		if (this.length) {
			method = typeof argument === 'string' && argument || 'init';
			
			if (methods[method]) {
				return methods[method].apply(this, arguments);
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
		easing: 'swing',
		duration: 'normal',
		before: null,
		after: null,
		viewport: 'html,body'
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
		var smoothie = store[window.location.hash.replace(/^#/, '')];
		smoothie && smoothie.go();
		return true;
	}).load(function (event) {
		var smoothie = store[window.location.hash.replace(/^#/, '')];
		smoothie && smoothie.go();
		return true;		
	});

	// $('a[href^="#"]').live('click', function (event) {
	// 	var hash = $(this).attr('href').slice(1);
	// 
	// 	if (store[hash]) {
	// 		event.preventDefault();
	// 		// window.location.hash = hash;
	// 	}
	// 
	// 	return true;
	// });
	

	return true;

}(jQuery, 'smoothie', 'smoothies', '0.0.1', window));