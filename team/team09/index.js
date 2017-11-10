var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/math', function(request, response) {
  getFormValues(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getFormValues(request, response) {
	//var requestUrl = url.parse(request.url, true);
	//console.log("Form Values: " + JSON.stringify(requestUrl.query));

	var mathOperation = request.body.mathOperation;
    var num1 = Number(request.body.num1);
    var num2 = Number(request.body.num2);
    // GET FUNCTION
	/*var mathOperation = requestUrl.query.mathOperation;
	var num1 = Number(requestUrl.query.num1);
	var num2 = Number(requestUrl.query.num2);
	*/

	calculateMath(response, mathOperation, num1, num2);
}

function calculateMath(response, mathOperation, num1, num2) {

	var result = 0;

	switch(mathOperation) {
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
        result = "Hmmm... Something went wrong";
    }

    var parameters = {mathOperation: mathOperation, num1: num1, num2: num2, result: result};

    response.render('pages/result', parameters);

}