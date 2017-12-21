/**
 * desc: 入口文件
 * date: 2017/8/24
 */

require.config({
	baseUrl: 'script/',

	urlArgs: "?" + Date.now(),

	waitSeconds: 0,

	package: [],

	// file url config
	paths: {
		'jquery': '../lib/jquery/dist/jquery.min',
		'angular': '../lib/angular/angular.min',
		'ui_router': '../lib/angular-ui-router/release/angular-ui-router.min',
		'angular_sanitize': '../lib/angular-sanitize/angular-sanitize.min',
        'angular_animate': '../lib/angular-animate/angular-animate.min'
	},

	// file shim
	shim: {
		'jquery':{
            exports:'jquery'
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ui_router':{
            deps: ['angular'],
            exports: 'ui_router'
        },
        'angular_sanitize': {
            deps: ['angular'],
            exports: 'angular_sanitize'
        },
        'angular_animate': {
            deps : ['angular'],
            exports : 'angular_animate'
        },
	}
});

require([
	// base
	'jquery', 'angular', 'ui_router', 'angular_sanitize', 'angular_animate',

	'app', 'route',

	// comm
	'service/common/core',
	'service/common/httpx',
	'service/common/ly',

	// controller
	'controller/index',
	'controller/tabs',

	// service
	'service/index',

	// directive
	'directive/drag',

	'component/tabs'

], function($, angular) {

	$(function() {
		// 没有ng-app 手工启动angular
		angular.bootstrap(document, ['fickle']);
	})
})