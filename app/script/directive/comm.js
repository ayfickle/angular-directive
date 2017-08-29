define(['app'], function(app) {
    app.directive('lyHref', ['$state', '$location', function($state, $location) {
        return function(scope, element, attr) {
            element.bind('click', function() {
                if (attr.href == $location.path()) {
                    $state.reload();
                }
            })
        }
    }])
})