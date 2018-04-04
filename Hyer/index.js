const express = require("express")
const bodyParser = require("body-parser")
var firebase = require("firebase")
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(require("body-parser").json())

var config = {
	apiKey: "AIzaSyATZQRhK6vLE47RVDkTZUHMTQySlJLabIA",
	authDomain: "haier-89e55.firebaseapp.com",
	databaseURL: "https://haier-89e55.firebaseio.com",
	storageBucket: "gs://haier-89e55.appspot.com",
  };

if(module.parent) {
	console.log('Running on test config');
		config = {
	    apiKey: "AIzaSyCkuP6GeDvKQAFX64XPpO3ZAmdKg9znrWg",
	    authDomain: "testing-2e99d.firebaseapp.com",
	    databaseURL: "https://testing-2e99d.firebaseio.com",
	    projectId: "testing-2e99d",
	    storageBucket: "",
	    messagingSenderId: "67777942943"
  	};
}
firebase.initializeApp(config)


// Get users (GET /users)
app.get("/users", (req, res) => {
	var ref = firebase.database().ref("users")
	ref.once("value").then(function(snapshot) {
		// Get user by username
		if (req.query.username) {
			if (snapshot.hasChild(req.query.username)) {
				res.send(snapshot.child(req.query.username).val())
				console.log("GET /users/" + req.query.username)
			} else {
				res.sendStatus(400)
				console.log("get at /users/" + req.query.username + " failed: username does not exist")
			}
		}
		// Get users
		else {
			res.send(snapshot.val())
			console.log("GET /users")
		}
	}, function(err) {
			res.sendStatus(400)
			console.log(err)
	})
})

// Create a user (POST /users)
app.post("/users", (req, res) => {
    var ref = firebase.database().ref("users")
    ref.once("value").then(function(snapshot) {
    	if (snapshot.hasChild(req.body.username)) {
    		res.sendStatus(400)
    		console.log("post at /users/" + req.body.username + " failed: username exists")
    	} else {
    		ref.child(req.body.username).set({
    			password: req.body.password,
        		name: {firstName: req.body.firstName, lastName: req.body.lastName},
        		email: req.body.email,
        		phoneNumber: req.body.phoneNumber,
        		bio: req.body.bio,
        		photo: req.body.photo
    		}).then(function() {
    			res.sendStatus(200)
    			console.log("POST /users/" + req.body.username)
    		}, function(err) {
    			res.sendStatus(400)
    			console.log(err)
    		})
    	}
    }, function(err) {
    	res.sendStatus(400)
    	console.log(err)
    })
})

// Update a user (POST /put/users)
// May be changed to (PUT /users)
app.post('/put/users', (req, res) => {
	var ref = firebase.database().ref("users");
	ref.once("value").then(function(snapshot) {
		if (snapshot.hasChild(req.body.username)) {
			ref = ref.child(req.body.username);
			var update = {};
			if (req.body.password) {
				update.password = req.body.password;
			} if (req.body.firstName) {
				update.name = {};
				update.name.firstName = req.body.firstName;
			} if (req.body.lastName) {
				if (!req.body.firstName) {
					update.name = {};
				}
				update.name.lastName = req.body.lastName;
			} if (req.body.email) {
				update.email = req.body.email;
			} if (req.body.phoneNumber) {
				update.phoneNumber = req.body.phoneNumber;
			} if (req.body.bio) {
				update.bio = req.body.bio;
			} if (req.body.photo) {
				update.photo = req.body.photo;
			}
			ref.update(update).then(function() {
				res.sendStatus(200)
				console.log("UPDATE /users/" + req.body.username)
			}, function(err) {
				res.sendStatus(400)
				console.log(err)
			})
		} else {
			res.sendStatus(400)
			console.log("UPDATE /users/" + req.body.username + " failed: username does not exist")
		}
	}, function(err) {
		res.sendStatus(400)
		console.log(err)
	})
})

// Delete user. (POST /delete/users)
app.post("/delete/users", (req, res) => {
    var ref = firebase.database().ref("users")
	ref.once("value").then(function(snapshot) {
    	if (snapshot.hasChild(req.body.username)) {
    		ref.child(req.body.username).remove().then(function() {
    			res.sendStatus(200)
    			console.log("DELETE /users/" + req.body.username)
    		}, function(err) {
    			res.sendStatus(400)
    			console.log(err)
    		})
    	} else {
    		res.sendStatus(400)
    		console.log("DELETE /users/" + req.body.username + " failed: username does not exist")
    	}
  	}, function(err) {
  		res.sendStatus(400)
  		console.log(err)
  	});
})

// Create Job (POST /jobs)
app.post('/jobs', (req, res) => {
    var ref = firebase.database().ref("jobs")
    var key = ref.push({
        name: req.body.name,
        description: req.body.description,
        coordinates: {x: parseFloat(req.body.xCoordinate), y: parseFloat(req.body.yCoordinate)},
        pay: parseFloat(req.body.value),
        type: req.body.type,
        duration: parseFloat(req.body.duration),
        photo: req.body.photo,
        tags: req.body.tags,
        prerequisites: req.body.prerequisites,
        employer: req.body.employer,
        status: req.body.status
    }).key
    console.log('POST ' + req.body.name);
    res.send(key);
})

function getDistance(lat1, lon1, lat2, lon2) {
	var a = Math.pow(Math.sin(deg2rad(lat2 - lat1) / 2), 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.pow(Math.sin(deg2rad(lon2 - lon1) / 2), 2)
	return 6378.13 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function deg2rad(deg) {
	return deg * Math.PI / 180
}

// Get a specific job or all jobs.
app.get('/jobs', (req, res) => {

	// Get job by ID
	if (req.query.jobID != undefined) {
		// Algorithm: Get all jobs, then check if it has the ID as a child.
		console.log("Attempting to GET job with jobID: " + req.query.jobID)
		var ref = firebase.database().ref("jobs/")
		ref.once("value").then(function(snapshot) {
				if (snapshot.hasChild(req.query.jobID)){
					// Found matching job
					res.send(snapshot.child(req.query.jobID).val())
					console.log("Success, found job with ID.")
				} else {
					// No corresponding job
					res.sendStatus(400)
					console.log("Failure, no job with the given ID.")
				}
			})

	// Get job by name
	} else if (req.query.jobName != undefined) {
		console.log("Attempting to GET job with jobName:" + req.query.jobName)
		var ref = firebase.database().ref("jobs/")
		ref.once("value").then(function(snapshot) {
			var jobsObject = snapshot.val()

			for (var jobID in jobsObject) {
				if (jobsObject[jobID].name == req.query.jobName) {
					res.send(jobsObject[jobID])
					console.log("Success, found job with the name.")
					return;
				}
			}
			res.sendStatus(400)
			console.log("Failure, no job with the given name.")
		})

	// Get all jobs by order
	} else if(req.query.orderby != undefined) {
		var ref = firebase.database().ref("jobs/")
		var jobs = {"jobs" : []}
		if(req.query.orderby == "duration") {
			console.log('GET all jobs by duration')
			ref.orderByChild("duration").on("value", function(snapshot) {
				snapshot.forEach(function(child) {
					jobs.jobs.push(JSON.parse('{"' + child.key + '":' + JSON.stringify(child) + '}'))
        		});
				return res.send(jobs);
			});
		} else if (req.query.orderby == "pay") {
			console.log('GET all jobs by pay')
			ref.orderByChild("pay").on("value", function(snapshot) {
				snapshot.forEach(function(child) {
					jobs.jobs.push(JSON.parse('{"' + child.key + '":' + JSON.stringify(child) + '}'))
        		});
				return res.send(jobs);
			});
		} else {
			res.sendStatus(400)
			console.log("Failure, improper query.")
		}

	// Get all jobs within the given distance
	} else if(req.query.lat != undefined && req.query.lon != undefined && req.query.km != undefined) {
		var ref = firebase.database().ref("jobs/")
		var jobs = {"jobs" : []}
		console.log('GET all jobs within given distance')
		ref.once("value", function(snapshot) {
			snapshot.forEach(function(child) {
				if(getDistance(child.val().coordinates.x, child.val().coordinates.y, parseFloat(req.query.lat), parseFloat(req.query.lon)) <= parseFloat(req.query.km)) {
					jobs.jobs.push(JSON.parse('{"' + child.key + '":' + JSON.stringify(child) + '}'))
				}
			});
			res.send(jobs);
		});

	// Get all jobs
	} else {
		var ref = firebase.database().ref("jobs");
		var jobs = {"jobs" : []}
		ref.once("value", function(snapshot) {
			snapshot.forEach(function(child) {
				jobs.jobs.push(JSON.parse('{"' + child.key + '":' + JSON.stringify(child) + '}'))
			})
			res.send(jobs);
		})
		console.log('GET all jobs');
	}
})

app.post('/put/jobs', (req, res) => {
	var ref = firebase.database().ref("jobs/" + req.body.jobID);
	var update = {};
	if (req.body.name) {
		update.name = req.body.name;
	} if (req.body.description) {
		update.description = req.body.description;
	} if (req.body.xCoordinate) {
		update.coordinates = {};
		update.coordinates.xCoordinate = parseFloat(req.body.xCoordinate);
	} if (req.body.yCoordinate ) {
		if (!req.body.xCoordinate) {
			update.coordinates = {};
		}
		update.coordinates.yCoordinate = parseFloat(req.body.yCoordinate);
	} if (req.body.value) {
		update.pay = parseFloat(req.body.value);
	} if (req.body.type) {
		update.type = req.body.type;
	} if (req.body.duration) {
		update.duration = parseFloat(req.body.duration);
	} if (req.body.photo) {
		update.photo = req.body.photo;
	} if (req.body.tags) {
		update.tags = req.body.tags;
	} if (req.body.prerequisites) {
		update.prerequisites = req.body.prerequisites;
	} if (req.body.employer) {
		update.employer = req.body.employer;
	} if (req.body.status) {
		update.status = req.body.status;
	}
	ref.update(update)
	res.send('Successfully updated ' + req.body.userID);
})

app.post('/delete/jobs', (req, res) => {
	var ref = firebase.database().ref("jobs/" + req.body.jobID);
	ref.once("value").then(function(snapshot) {
    	if(snapshot.exists()) {
    		ref.remove();
    		console.log('DELETE ' + req.body.jobID);
    		res.send('Successfully deleted ' + req.body.jobID);
    	} else {
    		res.sendStatus(400)
    	}
  	});
});

// When you go to localhost:3000,
app.get('/', (req, res) => {
    var HTMLfile = __dirname + '/index.html'
    res.sendFile(HTMLfile)
})

if(!module.parent) {
	app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	});
}

module.exports = app;
