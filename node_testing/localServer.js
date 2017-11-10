/***************************************
 * Dallas Bleak
 * CS 313
 * Week 08 - Hello World!
 **************************************/

// Require modules
var http = require('http');
var url = require('url');
var fs = require('fs');

// Hostname and port
var hostname = 'localhost';
var port = 8888;

// JSON 
var responseBody = {
    "name": "Dallas Bleak",
    "class": "CS 313-02"
};

// Start the server and process data in it.
var server = http.createServer(function onRequest(request, response) {
    if (request.url == "/home") {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write("<h1>Welcome to the Home Page</h1>");
        response.end();
    } else if (request.url == "/getData") {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(responseBody));
        response.end();
	} else if (request.url == "/form") {
		if (request.method.toLowerCase() == 'get') {
        displayForm(response);
		} else if (request.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(request, response);
		}
    } else {
        response.writeHead(404, {'Content-type': 'text/html'});
        response.write("Page Not Found");
        response.end();
    }
});

function displayForm(response) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(request, response) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}

// When server is running display information to the console
server.listen(port, hostname, () => {
    console.log('Server started on port ' + port);
});