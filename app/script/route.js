/**
 * desc: router
 * date: 2017/8/24
 */

define(['app'], function(app) {
	return app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
		.otherwise('/index');

		$stateProvider
		.state('app', {
			url: '/index',
			templateUrl: function() {
				return 'view/index.html?' + Date.now();
			},
			controller: 'IndexCtrl'
		})

		// 配置html5Mode，需要加<base>，或者requireBase设为false
		$locationProvider
		/*.html5Mode({
			enabled: true,
			requireBase: false
		})*/
		.html5Mode(true)
		.hashPrefix('!');
	}])
})