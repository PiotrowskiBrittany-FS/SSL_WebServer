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

    f = (dir+filen+ext).replace("/","");

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
    };

    if (f){
        fs.readFile(f,function(err,data){
            if(page){
                if(mimeTypes.hasOwnProperty(ext)){
                    res.writeHead(200, {'Context-Type':mimeTypes[ext]});
                    res.write("<script>var page='"+page+"';</script>");
                    res.end(data, 'utf-8')
                }
            }
        })
    }

}).listen("8080")