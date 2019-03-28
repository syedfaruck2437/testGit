	var connection = require(__dirname+'/db/connection.js'); //Intialize Mysql connection
	
	var express = require('express'); //Intialize required dependency
	var multer  = require('multer');
	var mime    = require('mime');
	var morgan = require('morgan');      
	var app 	= express();
	var bodyParser = require("body-parser");
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	const bcrypt = require('bcrypt'); //For password encryption
	const saltRounds = 5;
	
	
	//Get registration form
	app.get('/formhtml', function(req, res){
		console.log('4');
		res.sendFile(__dirname + '/angularjs/' + 'form.html');
	});

	//Submit data
	app.post("/registerform", function (req, res) {
		console.log('3');
		var hash = bcrypt.hashSync(req.body.password, saltRounds);
		var checkexistmail = 'Select email from members where email="'+req.body.email+'"';
		var query = connection.query(checkexistmail, function(err, result) {
			if(result.length == 0){
				console.log('5');
				res.send('success');
				connection.query('Insert into members(first_name, last_name, email, password) values("'+req.body.firstname+'", "'+req.body.lastname+'", "'+req.body.email+'", "'+hash+'")');
				
			} else {
				console.log('6');
				res.send('Error'); // load the single view file (angular will handle the page changes on the front-end)
				
			}
		});
		

	});

	app.listen(3000);