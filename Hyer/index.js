const express = require('express')
const bodyParser = require('body-parser')
var firebase = require('firebase')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

var config = {
	apiKey: "AIzaSyATZQRhK6vLE47RVDkTZUHMTQySlJLabIA",
	authDomain: " haier-89e55 .firebaseapp.com",
	databaseURL: "https://haier-89e55.firebaseio.com",
	storageBucket: "haier-89e55.appspot.com",
  };
firebase.initializeApp(config);

// Create User (POST /users)
app.post('/users', (req, res) => {
    var ref = firebase.database().ref("users/" + req.body.username)
    ref.set({
        name: {firstName: req.body.firstName, lastName: req.body.lastName},
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        bio: req.body.bio,
        photo: req.body.photo,
    })
    console.log('POST ' + req.body.username);
    res.send('Successfully created ' + req.body.username);
})

// Get all users or a specific user with a username.
app.get('/users', (req, res) => {

	var ref = firebase.database().ref("users/")
	// Get user by username
	if (req.query.username != undefined) {
		console.log("Attempting to GET user with username: " + req.query.username)
		ref.once("value", function(snapshot) {
			if (snapshot.hasChild(req.query.username)){
				res.send(snapshot.child(req.query.username).val())
				console.log('Success, found user.')
			} else {
				res.sendStatus(400)
				console.log('Failure, no user with given username')
			}
		})

	// Get all users
	} else {
		ref.once("value", function(snapshot) {
			res.send(snapshot.val());
		})
		console.log('GET all users');
	}

})

app.post('/put/users', (req, res) => {
	var ref = firebase.database().ref("users/" + req.body.userID);
	var update = {};
	if (req.body.firstName != '') {
		update.name = {};
		update.name.firstName = req.body.firstName;
	} if (req.body.lastName != '') {
		if (req.body.firstName == '') {
			update.name = {};
		}
		update.name.lastName = req.body.lastName;
	} if (req.body.email != '') {
		update.email = req.body.email;
	} if (req.body.phoneNumber != '') {
		update.phoneNumber = req.body.phoneNumber;
	} if (req.body.bio != '') {
		update.bio = req.body.bio;
	} if (req.body.photo != '') {
		update.photo = req.body.photo;
	}
	ref.update(update)
	res.send('Successfully updated ' + req.body.userID);
})

// Delete user with given user ID. (DELETE /users/{user ID})
app.post('/delete/users', (req, res) => {
    var ref = firebase.database().ref("users/" + req.body.userID);
    ref.remove();
    console.log('DELETE ' + req.body.userID);
    res.send('Successfully deleted ' + req.body.userID);
})

// Create Job (POST /jobs)
app.post('/jobs', (req, res) => {
    var ref = firebase.database().ref("jobs")
    ref.push({
        name: req.body.name,
        description: req.body.description,
        coordinates: {x: req.body.xCoordinate, y: req.body.yCoordinate},
        pay: {value: req.body.value, type: req.body.type},
        duration: req.body.duration,
        photo: req.body.photo,
        tags: req.body.tags,
        prerequisites: req.body.prerequisites,
        employer: req.body.employer,
        status: req.body.status
    })
    console.log('POST ' + req.body.name);
    res.send('Successfuly created ' + req.body.name);
})

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
			
	// Get all jobs
	} else {
	var ref = firebase.database().ref("jobs");
	ref.once("value", function(snapshot) {
		res.send(snapshot.val());
	})
	console.log('GET all jobs');
	}
})

app.post('/put/jobs', (req, res) => {
	var ref = firebase.database().ref("jobs/" + req.body.jobID);
	var update = {};
	if (req.body.name != '') {
		update.name = req.body.name;
	} if (req.body.description != '') {
		update.description = req.body.description;
	} if (req.body.xCoordinate != '') {
		update.coordinates = {};
		update.coordinates.xCoordinate = req.body.xCoordinate;
	} if (req.body.yCoordinate != '') {
		if (req.body.xCoordinate == '') {
			update.coordinates = {};
		}
		update.coordinates.yCoordinate = req.body.yCoordinate;
	} if (req.body.value != '') {
		update.pay = {};
		update.pay.value = req.body.value;
	} if (req.body.type != '') {
		if (req.body.value == '') {
			update.pay = {};
		}
		update.pay.type = req.body.type;
	} if (req.body.duration != '') {
		update.duration = req.body.duration;
	} if (req.body.photo != '') {
		update.photo = req.body.photo;
	} if (req.body.tags != '') {
		update.tags = req.body.tags;
	} if (req.body.prerequisites != '') {
		update.prerequisites = req.body.prerequisites;
	} if (req.body.employer != '') {
		update.employer = req.body.employer;
	} if (req.body.status != '') {
		update.status = req.body.status;
	}
	ref.update(update)
	res.send('Successfully updated ' + req.body.userID);
})

app.post('/delete/jobs', (req, res) => {
    var ref = firebase.database().ref("jobs/" + req.body.jobID);
    ref.remove();
    console.log('DELETE ' + req.body.jobID);
    res.send('Successfully deleted ' + req.body.jobID);
});

// When you go to localhost:3000, 
app.get('/', (req, res) => {
    var HTMLfile = __dirname + '/index.html'
    res.sendFile(HTMLfile)
})

app.listen(3000, function() {
    console.log("connected on port 3000")
})
