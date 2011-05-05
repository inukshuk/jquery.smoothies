describe('$.fn.smoothie', function () {
	
	it('should be defined', function () {
		expect($().smoothie).toBeDefined();
	});

	it('should be a function', function () {
		var span = create('span', { text: 'foo', id: 'foo', css: { backgroundColor: 'red' } });
		expect($.isFunction($().smoothie)).toBeTruthy();
		span.remove();
	});
	
});

describe('$.fn.smoothie.defaults', function () {
	it('should be defined', function () {
		expect($.fn.smoothie.defaults).toBeDefined();
	});
});

describe('$.smoothies', function () {
	it('should be defined', function () {
		expect($.smoothies).toBeDefined();
	});
});