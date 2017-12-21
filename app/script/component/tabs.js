define(['app'], function(app) {

	app.run(['$templateCache', function($templateCache) {
        $templateCache.put('template/common/my-tabs.html',
            '<div class="tabbable"> <ul class="nav nav-tabs"> <li ng-repeat="pane in $ctrl.panes" ng-class="{active:pane.selected}"> <a href="" ng-click="$ctrl.select(pane)">{{pane.title}}</a> </li> </ul> <div class="tab-content" ng-transclude></div> </div>');
    }]);

    app.run(['$templateCache', function($templateCache) {
        $templateCache.put('template/common/my-pane.html',
            '<div class="tab-pane" ng-show="$ctrl.selected" ng-transclude></div>');
    }]);

    app.component('myTabs', {
        transclude: true,
        controller: function MyTabsController() {
            var panes = this.panes = [];
            this.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };
            this.addPane = function(pane) {
                if (panes.length === 0) {
                    this.select(pane);
                }
                panes.push(pane);
            };
        },
        templateUrl: 'template/common/my-tabs.html'
    })
    app.component('myPane', {
        transclude: true,
        require: {
            tabsCtrl: '^myTabs'
        },
        bindings: {
            title: '@'
        },
        controller: function() {
            this.$onInit = function() {
                this.tabsCtrl.addPane(this);
                console.log(this);
            };
        },
        templateUrl: 'template/common/my-pane.html'
    });
})