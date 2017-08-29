define(['app'], function(app) {
	app.factory('IndexService', ['ly', function(ly) {
		var curd = ly.curd;

		return {
			'meun': function() {
				return curd.get('data/menu.json');
			} 
		}
	}])
})