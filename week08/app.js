/***************************************
 * Dallas Bleak
 * CS 313
 * Week 08 - Hello World!
 **************************************/

// Require modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs =  require('querystring');

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
	var path = url.parse(request.url, true);
	var query = path.query;
    // Send to form.html
	if (request.url === "/") {
		response.writeHead(200, {'Content-type': 'text/html'});
		fs.createReadStream('./form.html').pipe(response);
	}
    // Send to home and display contents
    else if (path.pathname === "/home") {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write("<h1>Welcome to the Home Page</h1>");
        response.end();
    // display JSON info
    } else if (path.pathname === "/getData") {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(responseBody));
        response.end();
    // display form results
	} else if (path.pathname === "/info" && request.method === 'POST') {
		var rawData = '';
		request.on('data', data=> rawData += data).on('end', ()=>{
			var info = qs.parse(rawData);
            var number1 = info.num1;
            var number2 = info.num2;
            var result = multiplyNumber(number1, number2);
			response.writeHead(200, {'Content-type': 'text/html'});
			response.end("<b>First Number: </b>" + "<font color='red'>" + number1 + "</font><br>"+
                         "<b>Second Number: </b>" + "<font color='red'>" + number2 + "</font><br>"+
                         "<b>Result: </b>" + "<font color='green'>" + result + "</font>");
		});
    // display error screen
    } else {
        response.writeHead(404, {'Content-type': 'text/html'});
        response.write("Page Not Found");
        response.end();
    }
});

// multiply function
function multiplyNumber(num1, num2) {
	return num1 * num2;
}


// When server is running display information to the console
server.listen(port, hostname, () => {
    console.log('Server started on port ' + port);
});