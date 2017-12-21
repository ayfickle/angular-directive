'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const os = require('os'); 

const express = require('express');
const config = {
    port: 2900,
    root: './app',
    index:'/index.html'
};

let app = express();
let tmpDir = os.tmpdir();

//静态文件路径
app.use(express.static(config.root));
app.use(express.static(tmpDir));

app.get('*',(req,res)=>{
    fs.readFile(path.resolve(config.root) + config.index, "utf-8", (error, file) => {
        
        res.writeHead(200, { "Content-Type": "text/html"});
        // this is important when you refrash your page
        res.write(file);
        res.end();
    });
    //res.sendFile(path.resolve(config.root) + config.index);
});

app.post('*',(req,res)=>{

    fs.readFile(path.resolve(config.root) + req.url, "utf-8", (error, file) => {
        res.writeHead(200, { "Content-Type": "application/json"});
        res.write(file);
        res.end();
    });
    //res.sendFile(path.resolve(config.root) + config.index);
})

app.listen(config.port);

console.log(new Date().toLocaleString() + ": started. port:" + config.port);