/*******************************
* Author: Dallas Bleak
* Created: 11/07/2017
********************************/

/*************************************************************
* Modules
*************************************************************/
var express = require('express');
var bodyParser = require('body-parser');
var calculatePostage = require('./public/js/postalCalculations.js');

/*************************************************************
* Express Instance
*************************************************************/
var app = express();

/*************************************************************
* Set Server, EJS, body-parser
*************************************************************/
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*************************************************************
* Set default page
*************************************************************/
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/form.html');
});

/*************************************************************
* Form processing via the POST method
*************************************************************/
app.post('/getRate', function(request, response) {
   var type   = request.body.type;
   var weight = request.body.weight;

   calculatePostage.calcPostage(type, weight, function(error, data) {
      if (error) {
         console.log(error);
      } else {
         response.render("pages/postalCalcResult", data);
         response.send();
      }
   });
});


/*************************************************************
* Start the server
*************************************************************/
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
