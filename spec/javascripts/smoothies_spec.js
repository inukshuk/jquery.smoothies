describe('$.fn.smoothie', function () {
	it('should be defined', function () {
		expect($().smoothie).toBeDefined();
	});
	it('should be a function', function () {
		expect($.isFunction($().smoothie)).toBeTruthy();
	});

	describe('When I invoke the method on a jQuery object', function () {
		var original_length;
		
		beforeEach(function () {
			original_length = $.smoothies().length;
		});
		afterEach(function () {
			$.smoothies.remove();
		});
		
		describe('and the object is empty', function () {
			it('then the number of smoothies in the store should not change', function () {
				$().smoothie();
				expect($.smoothies().length).toEqual(original_length);
			});
		});
		describe('and the object is not empty', function () {

			describe('but the object has no data-hash, id, or name attribute', function () {
				it('then the number of smoothies in the store should not change', function () {
					$().smoothie();
					expect($.smoothies().length).toEqual(original_length);
				});				
			});
			
			describe('and the object has a data-hash attribute', function () {
				var div = '<div data-hash="foo-hash", id="foo-id", name="foo-name"/>';
				it('then the objects should be registered by data-hash', function () {
					$(div).smoothie();
					expect($.smoothies('foo-hash')).not.toBeEmpty();
					expect($.smoothies('foo-id')).toBeEmpty();
					expect($.smoothies('foo-name')).toBeEmpty();
				});
			});
			
			describe('and the object has an id attribute (but no data-hash)', function () {
				var div = '<div id="foo-id", name="foo-name"/>';
				it('then the objects should be registered by id', function () {
					$(div).smoothie();
					expect($.smoothies('foo-hash')).toBeEmpty();
					expect($.smoothies('foo-id')).not.toBeEmpty();
					expect($.smoothies('foo-name')).toBeEmpty();
				});
			});
			
		});
		
	});
	
	describe('When I invoke the "remove" method on a jQuery object', function () {
		var original_length;

		beforeEach(function () {
			$('<div id="foo1"/><div id="foo2"/>').smoothie();
			original_length = $.smoothies().length;
		});
		afterEach(function () {
			$.smoothies.remove();
		});

		describe('and the object is empty', function () {
			it('then the number of smoothies in the store should not change', function () {
				$().smoothie('remove');
				expect($.smoothies().length).toEqual(original_length);
			});
		});

		describe('and the object is not empty', function () {
			describe('and all objects are registered smoothies', function () {
				var objects = $('<div id="foo1"/><div id="foo2"/>');
				it('then that number of smoothies should be removed from the store', function () {
					objects.smoothie('remove');
					expect($.smoothies().length + objects.length).toEqual(original_length);
				});
			});
			describe('and some objects are registered smoothies', function () {
				var objects = $('<div id="foo2"/>');
				it('then that number of smoothies should be removed from the store', function () {
					objects.smoothie('remove');
					expect($.smoothies().length + objects.length).toEqual(original_length);
				});
			});
			describe('and no objects are registered smoothies', function () {
				var objects = $('<div id="foo3"/>');
				it('then the number of smoothies in the store should not change', function () {
					objects.smoothie('remove');
					expect($.smoothies().length).toEqual(original_length);
				});
			});
			
		});

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
	
	describe('if there are no smoothies', function () {
		it('should return an empty list', function () {
			expect($.smoothies()).toBeEmpty();	
		});
	});
	
	describe('if there are smoothies', function () {
		beforeEach(function () {
			$('<div id="foo1"/>').smoothie();
			$('<div id="foo2"/>').smoothie();
		});
		afterEach(function () {
			$.smoothies.remove();
		});
		
		it('should not return an empty list', function () {
			expect($.smoothies()).not.toBeEmpty();	
		});
		it('should return all smoothies by default', function () {
			expect($.smoothies().length).toEqual(2);
		});
		it('should return the smoothies for the given hash', function () {
			expect($.smoothies('foo1').length).toEqual(1);
			expect($.smoothies('foo2').length).toEqual(1);
			expect($.smoothies('foo3').length).toEqual(0);
		});
		
	});
	
});

describe('$.smoothies.remove', function () {
	it('should be defined', function () {
		expect($.smoothies.remove).toBeDefined();
	});
	it('should be a function', function () {
		expect($.isFunction($.smoothies.remove)).toBeTruthy();
	});
	
	describe('If there are two smoothies in the store', function () {
		beforeEach(function () {
			$('<div id="foo1"/>').smoothie();
			$('<div id="foo2"/>').smoothie();			
			expect($.smoothies()).not.toBeEmpty();
		});
		afterEach(function () {
			$.smoothies.remove();
		});
		describe('and no hash argument is given', function () {
			it('should remove all smoothies from the store', function () {
				$.smoothies.remove();
				expect($.smoothies().length).toEqual(0);
			});			
		});
		describe('and a hash argument is given', function () {
			it('should remove only smoothie with that hash', function () {
				$.smoothies.remove('foo1');
				expect($.smoothies().length).toEqual(1);
			});
		});
	});
	
});


describe('$.smoothies.settings', function () {
	it('should be defined', function () {
		expect($.smoothies.settings).toBeDefined();
	});
	it('should be an object', function () {
		expect(typeof $.smoothies.settings).toEqual('object');
	});
});

describe('$.smoothies.version', function () {
	it('should be defined', function () {
		expect($.smoothies.version).toBeDefined();
	});
	it('should look like a version string', function () {
		expect($.smoothies.version).toMatch(/\d+\.\d+\.\d+/);
	});
});
