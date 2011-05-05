/*global jQuery: true */

"use strict";

;(function ($) {

	$.smoothies = {};
	
	// Add ScrollBox as a jQuery plugin
	$.fn.smoothie = function (options) {
			if (this.length) {
				this.each(function () {
					// var sb = Object.create(aScrollBox).init(options, this);
					// $.data(this, 'scrollbox', sb);
				});
			}
			return this;
		};

	return true;

}(jQuery));