/**
 * desc: sidebar menu ctrl
 * date: 2017/8/24
 */

define(['app'], function(app) {
	return app.controller('IndexCtrl', ['$scope', 'ly', 'IndexService', function(vm, ly, service) {
		var data = [];

		ly.extend(vm, {
			data: data
		})

		service.meun().then(function(resp) {
			vm.data = ly.tree(resp.returnVal);
		});
	}])
}) 