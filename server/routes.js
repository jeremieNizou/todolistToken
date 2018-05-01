"use strict";

var users = require("../app/models/users");
var todos = require("../app/models/todos");
var path = require('path');

module.exports = function (app, jwt) {

// LOGIN
	app.post('/signin', function(req, res) {
		users.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				if (user) {
					user.token = jwt.sign(user.toJSON(), "thisIsSecret", {expiresIn:60});
					res.json({
						type: true,
						data: user,
						token: user.token
					}); 
				} else {
					res.json({
						type: false,
						data: "Incorrect email/password"
					});    
				}
			}
		});
	});

	app.post('/signup', function(req, res) {
		users.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				if (user) {
					res.json({
						type: false,
						data: "User already exists!"
					});
				} else {
					var userModel = new users();
					userModel.email = req.body.email;
					userModel.password = req.body.password;
					userModel.role = "user";
					userModel.save(function(err, user) {	                	
						user.token = jwt.sign(user.toJSON(), "thisIsSecret", {expiresIn:60});
						res.json({
							type: true,
							data: user,
							token: user.token
						});
					})
				}
			}
		});
	});

	app.get('/isLogged', function(req, res) {
		var bearerToken;
		var bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			jwt.verify(bearerToken,"thisIsSecret", function(err, verifiedJwt) {
				if(err || !verifiedJwt) {
					res.send(false);
				}
				else {
					res.send(true);
				}
			});
		} else {
			res.send(false);
		}
	});

	app.get('/isAdmin', function(req, res) {
		var bearerToken;
		var bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			jwt.verify(bearerToken,"thisIsSecret", function(err, verifiedJwt) {
				if(err || !verifiedJwt) {
					res.send(false);
				}
				else {
					if (verifiedJwt.role === 'admin') {
						res.send(true);	
					}
					else {
						res.send(false);
					}
				}
			});
		} else {
			res.send(false);
		}
	});



// REST USERS
	app.get('/profil', ensureProfilAuthorized, function(req, res) {
		users.findOne({email: req.email, password: req.password}, function(err, user) {
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				res.json({
					type: true,
					data: user
				});
			}
		});
	});

	app.get('/users', ensureAdminAuthorized, function(req, res) {
		users.find( function(err, users) {
			if (err) {
				res.json({
					type: false,
					data: "Error occured: " + err
				});
			} else {
				res.json({
					type: true,
					data: users
				});
			}
		});	
	});

	function ensureAdminAuthorized(req, res, next) {
		var bearerToken;
		var bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			jwt.verify(bearerToken,"thisIsSecret", function(err, verifiedJwt) {
				if(err || !verifiedJwt) {
					res.sendStatus(401);
				}
				else {
					req.email = verifiedJwt.email;
					req.password = verifiedJwt.password;
					req.role = verifiedJwt.role;

					if(req.role === "admin") {
						next();
					}
					else {
						res.sendStatus(403);
					}
				}
			});
		} else {
			res.sendStatus(403);
		}
	}

	function ensureProfilAuthorized(req, res, next) {
		var bearerToken;
		var bearerHeader = req.headers["authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			jwt.verify(bearerToken,"thisIsSecret", function(err, verifiedJwt) {
				if(err || !verifiedJwt) {
					res.sendStatus(401);
				}
				else {
					req.email = verifiedJwt.email;
					req.password = verifiedJwt.password;
					req.role = verifiedJwt.role;
					next();
				}
			});
		} else {
			res.sendStatus(403);
		}
	}



// REST TOTO
	app.get("/todos", ensureProfilAuthorized, function(req, res) {
		todos.find( function(err, post) {
			if(err) {
				res.send("err");
			}
			else {
				res.json(post);
			}
		});
	});

	app.get("/todos/:id", ensureProfilAuthorized, function(req, res) {
		todos.find({_id: req.params.id}, function(err, post) {
			if(err) {
				res.send("err");
			}
			else {
				res.json(post);
			}
		});
	});

	app.post("/todos", ensureAdminAuthorized, function(req, res) {
		todos.create({nom: req.body.nom, presentation: ""}, function(err, post) {
			if(err) {
				res.send("err");
			}
			else {
				res.json(post);
			}
		});
	});

	app.put("/todos/:id", ensureAdminAuthorized, function(req, res) {
		todos.update({_id: req.params.id}, {$set: {nom: req.body.nom, presentation: req.body.presentation}}, function(err, post) {
			if(err) {
				res.send("err");
			}
			else {
				res.json(post);
			}
		});
	});

	app.delete("/todos/:id", ensureAdminAuthorized, function(req, res) {
		todos.remove({_id: req.params.id}, function(err, post) {
			if(err) {
				res.send("err");
			}
			else {
				res.json(post);
			}
		});
	});


	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, '../app/public/index.html')); 
	});

};