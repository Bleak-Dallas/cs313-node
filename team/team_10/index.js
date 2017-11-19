var express = require('express');
var app = express();
var pg = require('pg');

const connectionString = 'postgres://team10:team10@localhost:5432/familyhistory';


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/getPerson', function(request, response) {
  getPerson(request, response);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


function getPerson(request, response) {

	var id = request.query.id;

	if (id === null || id <= 0) {
		console.log("INVALID ID");
	}

	getpersonDB(id, function(error, result) {

		if (error || result === null) {
			response.status(500).json({data: error, success: false});
		}
		else {
			response.status(200).json(result[0]);
		}
	});
}

function getpersonDB(id, callback) {

	var client = new pg.Client(connectionString);

	client.connect(function(error){
		if(error) {
			console.log('ERROR: connection problem');
			console.log(error);
			callback(error, null);
		}

		var sql = 'SELECT personID, personFirstName, personLastName, personBirthDate FROM person WHERE personID = $1::int';

		var paramaters = [id];

		var query = client.query(sql, paramaters, function(error, result){
			client.end(function(error) {
				if (error) throw error;
			});

			if (error) {
				console.log("QUERY PROBLEM");
				console.log(error);
				callback(error, null);
			}

			console.log('RESULTS: ' + JSON.stringify(result.rows));

			callback(null, result.rows);
		});

	});

}