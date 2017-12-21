/**
 * desc: router
 * date: 2017/8/24
 */

define(['app'], function(app) {
	return app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider
		.otherwise('test/tabs');

		$stateProvider
		.state('app', {
			url: '/',
			templateUrl: function() {
				return 'view/index.html?' + Date.now();
			},
			controller: 'IndexCtrl'
		})

		.state('app.tab', {
			url: 'test/tabs',
			templateUrl: function() {
				return 'view/tabs/index.html?' + Date.now();
			},
			controller: 'TabsCtrl'
		})

		.state('app.test', {
			url: 'test/test',
			templateUrl: function() {
				return 'view/test/index.html?' + Date.now();
			}
		})

		// 配置html5Mode，需要加<base>，或者requireBase设为false
		$locationProvider
		/*.html5Mode({
			enabled: true,
			requireBase: false
		})*/
		// 为true时，会出现刷新页面not found的情况
		.html5Mode(true)
		.hashPrefix('!');
	}])
})