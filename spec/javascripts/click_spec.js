describe('When I click on a link', function () {
	describe('and the target is inside the viewport', function () {
		var link, target, viewport, position;

		beforeEach(function () {
			link = create('a', { text: 'link', href: '#target' });
			viewport = $('html, body');
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
			
			waits(250);
			
			runs(function () {
				expect(window.location.hash).not.toEqual(old_hash);
			});
		});

		it('the viewport should not move', function () {
			runs(function () {
				click(link);
			});
			
			waits(250);
			
			runs(function () {
				expect(target).toBeVisible();
				expect(getPosition(viewport)).toEqual(position);
			});
		});
		
	});


	describe('and the target is outside the viewport', function () {
		var link, target, viewport, position;

		beforeEach(function () {
			link = create('a', { text: 'link', href: '#target' });
			viewport = $('html, body').scrollTop(0).scrollLeft(0);
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

			waits(250);
			
			runs(function () {
				expect(window.location.hash).not.toEqual(old_hash);
			});
		});

		it('the viewport should move to the target', function () {
			runs(function () {
				click(link);
			});
			
			waits(250);
			
			runs(function () {
				expect(target).toBeVisible();
				expect(getPosition(viewport)).not.toEqual(position);
			});
		});
		
	});

	
});
