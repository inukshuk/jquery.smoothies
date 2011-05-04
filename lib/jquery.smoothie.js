/*global jQuery: true */

"use strict";

;(function ($) {

	// Add ScrollBox as a jQuery plugin
	$.fn.smoothies = function (options) {
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