describe('$.fn.smoothie', function () {
	
	it('should be defined', function () {
		expect($().smoothie).toBeDefined();
	});
	it('should be a function', function () {
		expect($.isFunction($().smoothie)).toBeTruthy();
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
	it('should be a function', function () {
		expect($.isFunction($.smoothies)).toBeTruthy();
	});
	
	it('should return all smoothies by default', function () {	
	});
	
});

describe('$.smoothies.refresh', function () {
	it('should be defined', function () {
		expect($.smoothies).toBeDefined();
	});
	it('should be a function', function () {
		expect($.isFunction($.smoothies)).toBeTruthy();
	});
	
	it('should re-calculate smoothie positions by default', function () {	
	});
	
});


describe('$.smoothies.settings', function () {
	it('should be defined', function () {
		expect($.smoothies.settings).toBeDefined();
	});
});

describe('$.smoothies.version', function () {
	it('should be defined', function () {
		expect($.smoothies.version).toBeDefined();
	});
});
