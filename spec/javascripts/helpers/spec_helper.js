beforeEach(function () {

	// click handler to simulate clicking local links
	$('a').live('click', function () {
		var href = $(this).attr('href');
		if (/^#/.test(href)) {
			window.location.hash = href.slice(1);
		}
	});
	
  this.addMatchers({
    toBeVisible: function () {
			return this.actual.is(':in-viewport');
		},
		toHaveMovedFrom: function (original) {
			return this.actual.scrollTop() !== original.left &&
				this.actual.scrollLeft() !== original.left;
		}
  });
});

function create(tag, attributes) {
	return $('<' + (tag || 'div') + '/>', attributes || {}).appendTo('body');
}

function click(element) {
	element.trigger('click');
}

function goToHash(hash) {
	window.location.hash = hash;
}

function getPosition(element) {
	return { top: element.scrollTop(), left: element.scrollLeft() };
}