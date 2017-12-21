/**
 * desc: init angular module
 * date: 2017/8/24
 */

define(['angular'], function(angular) {
	return angular.module('fickle', [
		'ngAnimate','ngSanitize', 'ui.router'
	])

	.run(function($rootScope) {
		$rootScope.$on('$stateChangeStart', function(...args) {
			console.log(args);
		});

		$rootScope.$on('$locationChangeSuccess', function(...args) {
			console.log(args);
		})

		// 向上分发 $emit
		/*$includeContentRequested
		$includeContentLoaded
		$viewContentLoaded*/

		// 向下广播 $broadcast
		/*$locationChangeStart
		$locationChangeSuccess
		$routeUpdate
		$routeChangeStart
		$routeChangeSuccess
		$routeChangeError
		$destroy*/
	})
});