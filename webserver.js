/**
 * name: Web Server for Node.js
 * author: Marco Montalbano
 * references: Node for Front-End Developers - Garann Means
 *
 * how to use
 * ----------
 *  - install node.js (https://nodejs.org)
 *  - # node webserver.js
 *
 * example of folder structure
 * ---------------------------
 * .
 * ├── public
 * │   ├── index.html
 * │   └── stylesheets
 * │       └── app.css
 * └── webserver.js
 */


var server = {
    hostname     : '127.0.0.1',
    port         : 8000,
    documentRoot : 'public',
};

var http      = require('http');
var path      = require('path');
var url       = require('url');
var fs        = require('fs');
var mimeTypes = fs.existsSync('./mime-types.js') ? require('./mime-types.js') : {
    '.html' : 'text/html',
    '.js'   : 'application/javascript',
    '.css'  : 'text/css',
    '.txt'  : 'text/plain',
    '.jpg'  : 'image/jpeg',
    '.gif'  : 'image/gif',
    '.png'  : 'image/png',
    '.ico'  : 'image/x-icon'
};

console.log('Starting web server at http://' + server.hostname + ':' + server.port + '/');

function getFile(filename, res, mimeType)
{
    fs.readFile(filename, function(err, contents)
    {
        if(!err)
        {
            res.setHeader('Content-Length', contents.length);
            res.setHeader('Content-Type', mimeType);
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}

http.createServer( function(req, res)
{
    var
        srvUrl    = url.parse( req.url ),
        indexHtml = 'index.html',
        filename  = (server.documentRoot ? path.sep + server.documentRoot : '') + (srvUrl.pathname !== '/' ? srvUrl.pathname.replace(/\//g, path.sep) : path.sep  + indexHtml),
        extension = path.extname(filename),
        mimeType  = mimeTypes[extension]
    ;

    if (mimeType)
    {
        filename = __dirname + filename;
        fs.exists(filename, function(exists)
        {
            if(exists)
            {
                console.info('[info]  serving file: ' + filename);
                getFile(filename, res, mimeType);
            } else {
                console.error('[error] file not found: ' + filename);
                res.writeHead(404);
                res.end();
            }
        });
    } else {
        console.log('[error] invalid file extension: ' + extension);
        res.writeHead(404);
        res.end();
    }
}).listen(server.port, server.hostname);
