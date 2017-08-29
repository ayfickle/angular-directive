define(['app'], function(app) {
	app.factory('core', function() {
		function extend(src, dist) {
			for(var i in dist) {
				src[i] = dist[i];
			}
			return src;
		}

		function tree(data, id, parentId, children) {
			var obj = {},
				root = [];
			var id = id || 'id',
				parentId = parentId || 'parentId',
				children = children || 'children';

			for(var i in data) {
				obj[data[i][id]] = data[i];
				if (children in data[i]) {
					delete data[i][children]
				}
			}

			for(var i in data) {
				var pid = data[i][parentId],
					id = data[i][id];
				if (pid == 0) {
					root.push(data[i]);
				}
				else {
					if (obj[pid]) {
						if (!obj[pid][children]) {
							obj[pid][children] = [];
						}
						obj[pid][children].push(data[i]);
					}
				}
			}
			return root;
		}

		return {
			'extend': extend,
			'tree': tree
		}
	})
})