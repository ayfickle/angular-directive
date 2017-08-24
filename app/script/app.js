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
		})
	})
});