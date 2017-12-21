define(['app'], function(app) {
	app.directive('drag', ['$document', function($doc) {
		return function(scope, element, attr) {
			var startX = 0, startY = 0, x = 0, y = 0;
			element.css({
				position: 'relative',
				border: '1px solid #f3a9a8',
				padding: '5px 8px',
				cursor: 'pointer'
			});

			element.on('mousedown', function(e) {
				e.preventDefault();
				startX = e.screenX - x;
				startY = e.screenY - y;
				$doc.on('mousemove', mousemove);
				$doc.on('mouseup', mouseup);
			});

			function mousemove(e) {
				y = e.screenY - startY;
				x = e.screenX - startX;
				element.css({
					top: y + 'px',
					left: x + 'px'
				});
			}

			function mouseup(e) {
				$doc.unbind('mousemove', mousemove);
				$doc.unbind('mouseup', mouseup);
			}
		}
	}])
})