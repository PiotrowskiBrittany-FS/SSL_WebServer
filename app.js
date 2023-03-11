var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");

http.createServer(function(req,res){
    
    var parsed = url.parse(req.url);
    var filename = path.parse(parsed.pathname);

    filen = filename.name==""?"index":filename.name;
    ext = filename.ext==""?".html":filename.ext;
    dir = filename.dir=="/"?"":filename.dir+"/";
    page = filename.name ==""?"index.html":filename.name + filename.ext;



}).listen("8080")