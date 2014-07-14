/**
 * A very basic web server in node.js
 * Stolen from   : Node.js for Front-End Developers by Garann Means (p. 9-10) 
 * Modified from : https://gist.github.com/hectorcorrea/2573391
 */

/**
 * name: Web Server for node.js
 * author: Marco Montalbano
 * 
 * how to use
 * ----------
 *  - install node.js (http://nodejs.org/)
 *  - # node webserver.js 
 */

var server = {
  hostname : '127.0.0.1',
  port     : 8000
};

var http = require('http');
var path = require('path'); 
var url  = require('url'); 
var fs   = require('fs');     

console.log('Starting web server at http://' + server.hostname + ':' + server.port + '/');

http.createServer( function(req, res)
{
  var
    srvUrl    = url.parse( req.url ),
    indexHtml = 'SpecRunner.html',
    mimeTypes = {
      '.html' : 'text/html',      
      '.js'   : 'application/javascript', 
      '.css'  : 'text/css',
      '.txt'  : 'text/plain',
      '.jpg'  : 'image/jpeg',
      '.gif'  : 'image/gif',
      '.png'  : 'image/png',
      '.ico'  : 'image/x-icon'
    },
    filename  = srvUrl.pathname != '/' ? srvUrl.pathname.replace(/\//g, path.sep) : path.sep + indexHtml,
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
        console.log('Serving file: ' + filename);
        getFile(filename, res, mimeType);
      } else {
        console.log('File not found: ' + filename);
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    console.log('Invalid file extension detected: ' + extension);
    res.writeHead(404);
    res.end();
  }
}).listen(server.port, server.hostname);

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
