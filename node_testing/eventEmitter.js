var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();

// listen for error event
logger.on('error', function(message) {
	console.log('ERR:' + message)
});

logger.emit('error', 'SOME ERROR GOES HERE');

// Creat server and listen with EventEmitter
var server = http.createServer();
server.on('request', function(request, response) {.....response code goes here ....});
server.on('close', function(close) {
	console.log("Server is shutting down...");
});


//chat message listener
var events = require('events');
var EventEmitter = events.EventEmitter;

var chat = new EventEmitter();
var users = [], chatlog = [];

chat.on('message', function(message) {
  chatlog.push(message);
});

chat.on('join', function(nickname) {
  users.push(nickname);
});

// Emit events here
chat.emit('join', 'You have now joined');
chat.emit('message', 'You are amazing');

// Streams
var server = http.createServer(function(request, response) {
        response.writeHead(200);
		request.on('readable', function() {
			var chunk = null;
			while(null !== (chunk = request.read())) {
				response.write(chunk);
			}
		)};
		request.on('end', function(){
			resonse.end();
		});
}).listen(8080);

// the above code can be reduced to this
var server = http.createServer(function(request, response) {
        response.writeHead(200);
		request.pipe(response);
}).listen(8080)

// Stream a file form the file system to another file
var fs = require('fs');

var file = fs.createReadStream("reademe.md");
var newFile = fs.createWriteStream("reademe_copy.md");

file.pipe(newFile);

// Read from http and pipe to file
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
		var newFile = fs.createWriteStream("reademe_copy.md");
		request.pipe(newFile);
		
		request.on('end', function(){
			response.end('uploaded!');
		});
}).listen(8080)

//upload a file and show progress
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
		var newFile = fs.createWriteStream("reademe_copy.md");
		var fileBytes = request.headers['content-length'];
		var uploadedBytes = 0;
		
		request.on('readable', function() {
			var chuck = null;
			while(null != (chunk = request.read())) {
				uploadedBytes +== chunk.length;
				var progress = (uploadedBytes / fileBytes) * 100;
				reponse.write("Progress: " + parseInt(progress, 10) + "%\n");
			}
		});
		request.pipe(newFile);
		...
}).listen(8080)

