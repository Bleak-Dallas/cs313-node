var express = require('express');
var app = express();
var url = require('url');
var parameters;


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/form.html');
});

app.get('/math', function(request, response) {
  getFormValues(request, response);
  response.render('pages/result', parameters);
  response.end();
});

app.get('/math_service', function(request, response) {
  getFormValues(request, response);
  response.json(parameters);
  response.end();
});


function getFormValues(request, response) {
	var requestUrl = url.parse(request.url, true);
	console.log("Form Values from requestUrl: " + JSON.stringify(requestUrl.query));

	var operation = requestUrl.query.mathOperation;
	var num1 = Number(requestUrl.query.num1);
	var num2 = Number(requestUrl.query.num2);
	var parameters = calcmath(response, operation, num1, num2);
}

function calcmath(response, operation, num1, num2) {

	switch(operation) {
		case "Add":
			result = num1 + num2;
			break;
		case "Subtract":
			result = num1 - num2;
			break;
		case "Multiply":
			result = num1 * num2;
			break;
		case "Divide":
			result = num1 / num2;
			break;
		default:
			result = "Oopps... You done messed up.";
	}

	return parameters = {operation: operation, num1 : num1, num2 : num2, result : result};
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
