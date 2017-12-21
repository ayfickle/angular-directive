(function() {
    var config = {
        port: 50000 + Math.floor(Math.random() * 10000),
        interval: 0.1, // seconds
        watch: './app',
        ignore: /lib/
    }

    var client = function(){
        (function(factory) {

        if (typeof define === "function" && define.amd) {
            define("livepreview", ['app'], function(app) {
                console.log(app)
                return app.factory('LivePreview', ['$state', function($state) {
                    var LP = factory('%url');
                    LP.on('changed', function(file, ext) {
                        if (ext == 'css') {
                            location.reload();
                        } else if (ext == 'html') {

                        } else if (ext == 'js') {

                        }
                    });
                }]);
            });
        }

        }(function(app) {

            function LP() {
                this.init = function(url) {

                    var storage = window.localStorage;
                    var uuid = storage.uuid || (function() {
                        function S4() {
                            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                        };
                        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
                    }());
                    
                    this.uuid = storage.uuid = uuid;
                    this.handlers = {};

                    var ws = new WebSocket(url, 'echo-protocol');
                    var local = this;

                    ws.onopen = function() {
                        console.log('live preview running at ' + new Date().toTimeString());
                        ws.send(JSON.stringify({ 'event': 'enter', 'value': uuid }));
                    }

                    ws.onmessage = function(data) {
                        data = JSON.parse(data.data);
                        if (data.event == 'changed') {
                            local.emit(data.event , data.value);
                        }
                    }

                    return this;
                }

                this.on = function(evt, callback) {
                    if (!this.handlers[evt]) this.handlers[evt] = [];
                    this.handlers[evt].push(callback);
                }

                this.emit = function(evt, data) {
                    if (this.handlers[evt]) {
                        var handlers = this.handlers[evt];
                        for (var i in handlers) {
                            handlers[i].call(this, data);
                        }

                    }
                }

                this.init();
            }

            return function(url) {
                return new LP().init(url);
            };
        }));
    }

     console.log(client)

    var server = function(cfg) {
        var port = cfg.port;
        var watch = require('watch');
        var http = require('http');
        var ser = http.createServer((req, res) => {
            res.writeHead(200, { "Content-Type": "application/x-javascript" });
            var script = '(' + client.toString().replace('%url', 'ws://127.0.0.1:' + port) + '())';
            res.write(script);
            res.end();

        }).listen(port);


        var socket = function(ser) {
            var clients = {};
            var WebSocketServer = require('websocket').server;

            var ws = new WebSocketServer({
                httpServer: ser,
                //允许跨域
                autoAcceptConnections: false
            });

            ws.on('request', (request) => {
                var connection = request.accept('echo-protocol', request.origin);

                connection.on('message', (message) => {
                    if (message.type === 'utf8') {
                        var data = JSON.parse(message.utf8Data);
                        if (data.event == 'enter') {
                            if (!clients[data.value]) {
                                connection.uuid = data.value;
                                clients[data.value] = {
                                    connection: connection,
                                    timestamp: Date.now()
                                };
                                console.log('Welcome : ' + data.value);
                            }

                        }
                    }
                });

                connection.on('close', (reasonCode, description) => {
                    var uuid = connection.uuid;
                    if (clients[uuid]) {
                        delete clients[uuid];
                    }
                });
            });

            function emit(data) {
                for (var i in clients) {
                    console.log('emit:')
                    clients[i].connection.sendUTF(JSON.stringify(data))
                }
            }

            return {
                'emit': emit
            }
        };

        var io = socket(ser);

        //监听文件变化，并广播到所有接入的客户端
        watch.watchTree(cfg.watch, {
         interval: cfg.interval  , 
         ignoreDirectoryPattern:cfg.ignore,
         ignoreDotFiles:true
        }, (f, curr, prev) => {
            if (typeof f == "object" && prev === null && curr === null) {
                // Finished walking the tree
            } else if (prev === null) {
                // f is a new file
                io.emit({ 'event': 'changed' });
            } else if (curr.nlink === 0) {
                // f was removed
                io.emit({ 'event': 'changed' });
            } else {
                //广播文件修改
                console.log(f);
                io.emit({ 'event': 'changed', 'value': f });
            }
        });

        console.log('live preview running on ' + (port));
    };


    module.exports = {
        init: () => {
            server(config);
        },

        append: (file) => {
            return file.replace('</head>', '<script src="http://127.0.0.1:' + config.port + '"></script></head>');
        }
    }

}());