define(['app'], function(app) {
    app.factory('ly', ['$state', 'core', 'httpx', function($state, core, httpx) {
        var extend = core.extend;

        var local = {};

        core.extend(local, core);

        core.extend(local, httpx);

        return local;
    }])
})