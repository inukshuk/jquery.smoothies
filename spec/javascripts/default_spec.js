describe('When I click on a link', function () {
	var timeout = 250;
	
	describe('and the target is inside the viewport', function () {
		var link, target, viewport, position;

		beforeEach(function () {
			link = create('a', { text: 'link', href: '#target' });
			viewport = $('html').scrollTop(0).scrollLeft(0);
			position = getPosition(viewport);
			target = create('div', { text: 'target', id: 'target', css: { top: 42 } });
			expect(target).toBeVisible();
		});
		
		afterEach(function () {
			link.remove();
			target.remove();
			position = viewport = null;
			window.location.hash = '';
		});
		
		it('the hash should change', function () {
			var old_hash = window.location.hash;
			
			runs(function () {
				click(link);
			});
			
			waits(timeout);
			
			runs(function () {
				expect(window.location.hash).not.toEqual(old_hash);
			});
		});

		it('the viewport should move', function () {
			runs(function () {
				click(link);
			});
			
			waits(timeout);
			
			runs(function () {
				expect(target).toBeVisible();
				expect(getPosition(viewport)).not.toEqual(position);
			});
		});
		
	});


	describe('and the target is outside the viewport', function () {
		var link, target, viewport, position;

		beforeEach(function () {
			link = create('a', { text: 'link', href: '#target' });
			viewport = $('html').scrollTop(0).scrollLeft(0);
			position = getPosition(viewport);
			target = create('div', { text: 'target', id: 'target', css: { top: 4242 } });
			expect(target).not.toBeVisible();
		});
		
		afterEach(function () {
			link.remove();
			target.remove();
			position = viewport = null;
			window.location.hash = '';
		});
		
		it('the hash should change', function () {
			var old_hash = window.location.hash;
			
			runs(function () {
				click(link);
			});

			waits(timeout);
			
			runs(function () {
				expect(window.location.hash).not.toEqual(old_hash);
			});
		});

		it('the viewport should move to the target', function () {
			runs(function () {
				click(link);
			});
			
			waits(timeout);
			
			runs(function () {
				expect(target).toBeVisible();
				expect(getPosition(viewport)).not.toEqual(position);
			});
		});
		
	});

	
});

describe('When the hash changes', function () {
	var timeout = 250;
	
	describe('and the target is inside the viewport', function () {
		var target, viewport, position;
		
		beforeEach(function () {
			window.location.hash = '';
			viewport = $('html, body').scrollTop(0).scrollLeft(0);
			position = getPosition(viewport);
			target = create('div', { text: 'target', id: 'target', css: { top: 42 } });
			expect(target).toBeVisible();
		});
		
		afterEach(function () {
			window.location.hash = '';
			target.remove();
			position = viewport = null;
		});
		
		it('the viewport should move', function () {
			runs(function () {
				goToHash('target');
			});
			
			waits(timeout);
			
			runs(function () {
				expect(target).toBeVisible();
				expect(getPosition(viewport)).not.toEqual(position);
			});
		});
	});
	
	describe('and the target is above the viewport', function () {
		var target, viewport, position;
		
		beforeEach(function () {
			window.location.hash = '';
			viewport = $('html, body').scrollTop(4000).scrollLeft(0);
			position = getPosition(viewport);
			target = create('div', { text: 'target', id: 'target', css: { top: 42 } });
			expect(target).not.toBeVisible();
		});
		
		afterEach(function () {
			window.location.hash = '';
			target.remove();
			position = viewport = null;
		});
		
		it('the viewport should move up', function () {
			var actual;
			
			runs(function () {
				goToHash('target');
			});
			
			waits(timeout);
			
			runs(function () {
				expect(target).toBeVisible();
				actual = getPosition(viewport);
				expect(actual.top).toBeLessThan(position.top);
				expect(actual.left).toEqual(position.left);
			});
		});		
	});
	
	describe('and the target is below the viewport', function () {
		var target, viewport, position;
		
		beforeEach(function () {
			window.location.hash = '';
			viewport = $('html, body').scrollTop(0).scrollLeft(0);
			position = getPosition(viewport);
			target = create('div', { text: 'target', id: 'target', css: { top: 4242 } });
			expect(target).not.toBeVisible();
		});
		
		afterEach(function () {
			window.location.hash = '';
			target.remove();
			position = viewport = null;
		});
		
		it('the viewport should move down', function () {
			var actual;
			
			runs(function () {
				goToHash('target');
			});
			
			waits(timeout);
			
			runs(function () {
				expect(target).toBeVisible();
				actual = getPosition(viewport);
				expect(actual.top).toBeGreaterThan(position.top);
				expect(actual.left).toEqual(position.left);
			});
		});
	});
	
});
