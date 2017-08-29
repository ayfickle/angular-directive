/**
 * desc: http request
 * date: 2017/8/29
 */

define(['app'], function(app) {
    app.factory('httpx', ['$http', '$q', '$state', function($http, $q, $state) {

        var base = '';

        var URL = {
            'dev': ['http://10.38.2.92', ':8890/'],
            'pub': [],
            'prod': []
        };

        var env = (
            location.search.match(/env=([^&]+)/) || ['', window.sessionStorage['env'] || '']
        );

        if (!URL[env]) {
            env = 'dev';
        }

        window.sessionStorage['env'] = env;

        base = URL[env][0];

        function url_(url, paras) {
            if (/\:\/\//.test(url)) {
                return url.replace(/local\:\/\/([\w\W]+)/g,'/data/$1.json');
            } else {
                if (angular.isObject(paras)) {
                    url += '?' + serialize(paras);
                }
                var p = url.split(':'),
                    fix = URL[env][1];

                return base + fix + url;
            }
        }

        function get_(url, data) {
            var params = (angular.isString(data) ? data : serialize(data));
            console.log(url_(url))
            return $http.get(
                url_(url) + (params ? ('?' + params) : '')
            )
        }

        function post_(url, data, format) {
            return http_('POST', url, data, format);
        }

        function put_(url, data) {
            return http_('PUT', url, data);
        }

        function http_(type, url, data, format) {
            var format = format == undefined ? 'urlencode' : format;
            var req = {
                method: type,
                url: url_(url),
                data: data
            };
            if (format == 'urlencode') {
                req.data = serialize(data);
                req.headers = {
                    'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8'
                };
            }
            else if(format == 'xml') {
                req.headers = {
                    'Content-Type': 'text/xml'
                };
            }
            else if(format == 'json') {
                req.headers = {
                    'Content-Type': 'application/json'
                };
            }
            return $http(req);
        }

        function serialize(obj) {
            var arr = [];
            for(var i in obj) {
                arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]))
            }
            return arr.join('&');
        }

        var curd = {
            get: function(url, data) {
                return get_(url, data).then(function(res) {
                    return res.data;
                }, function(errMsg) {
                    console.log(errMsg);
                    return $q.reject(errMsg);
                })
            },

            post: function(url, data, format) {
                return post_(url, data, format).then(function(res) {
                    return res.data;
                }, function(errMsg) {
                    console.log(errMsg);
                    return $q.reject(errMsg);
                })
            }
        }

        return {
            'url': url_,
            'serialize': serialize,
            'curd': curd,
            'get': get_,
            'post': post_,
            'put': put_
        }
    }])
})