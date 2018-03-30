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
firebase.initializeApp(config)

// User Requests

// Get users (GET /users)
app.get("/users", (req, res) => {
	var ref = firebase.database().ref("users")
	var users = []
	ref.once("value").then(function(snapshot) {
		// Get user by username
		if (req.query.username) {
			if (snapshot.hasChild(req.query.username)) {
				user = {}
				user[req.query.username] = snapshot.child(req.query.username).val()
				users.push(user)
				console.log("GET /users/" + req.query.username)
			} else {
				res.sendStatus(400)
				console.log("get at /users/" + req.query.username + " failed: username does not exist")
			}
		}
		// Get users
		else {
			snapshot.forEach(function(childSnapshot) {
				var user = {}
				user[childSnapshot.key] = childSnapshot.val()
				users.push(user)
			})
			console.log("GET /users")
		}
		res.send(users)
	}, function(err) {
			res.sendStatus(400)
			console.log(err)
	})
})

// Create a user (POST /users)
app.post("/users", (req, res) => {
    var ref = firebase.database().ref("users")
    var key = ref.once("value").then(function(snapshot) {
    	if (snapshot.hasChild(req.body.username)) {
    		res.sendStatus(400)
    		console.log("post at /users/" + req.body.username + " failed: username exists")
    	} else {
    		ref.child(req.body.username).set({
    			password: req.body.password,
        		firstName: req.body.firstName,
        		lastName: req.body.lastName,
        		email: req.body.email,
        		phoneNumber: req.body.phoneNumber,
        		bio: req.body.bio,
        		photo: req.body.photo,
        		credits: 0.00
    		}).then(function() {
    			res.send(req.body.username)
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
			var update = {}
			if (req.body.password) {
				update.password = req.body.password;
			} if (req.body.firstName) {
				update.firstName = req.body.firstName;
			} if (req.body.lastName) {
				update.lastName = req.body.lastName;
			} if (req.body.email) {
				update.email = req.body.email
			} if (req.body.phoneNumber) {
				update.phoneNumber = req.body.phoneNumber;
			} if (req.body.bio) {
				update.bio = req.body.bio
			} if (req.body.photo) {
				update.photo = req.body.photo
			} if (req.body.credits) {
				update.credits = parseFloat(req.body.credits)
			}
			ref.child(req.body.username).update(update).then(function() {
				res.sendStatus(200)
				console.log("PUT /users/" + req.body.username)
			}, function(err) {
				res.sendStatus(400)
				console.log(err)
			})
		} else {
			res.sendStatus(400)
			console.log("put /users/" + req.body.username + " failed: username does not exist")
		}
	}, function(err) {
		res.sendStatus(400)
		console.log(err)
	})
})

// Delete user. (POST /delete/users)
// May be changed to (DELETE /users)
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
    		console.log("delete /users/" + req.body.username + " failed: username does not exist")
    	}
  	}, function(err) {
  		res.sendStatus(400)
  		console.log(err)
  	});
})

// Job Requests

function deg2rad(deg) {
	return deg * Math.PI / 180
}

function getDistance(lon1, lat1, lon2, lat2) {
	var radLat1 = deg2rad(lat1)
	var radLat2 = deg2rad(lat2)
	var deltaLon = deg2rad(lon2 - lon1)
	var deltaLat = deg2rad(lat2 - lat1)
	var a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLon / 2), 2)
	return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Get jobs (GET /jobs)
app.get('/jobs', (req, res) => {
	var ref = firebase.database().ref("jobs")
	var jobs = []
	ref.once("value").then(function(snapshot) {
		// Get job by jobID
		if (req.query.jobID) {
			if (snapshot.hasChild(req.query.jobID)) {
				var job = {}
				job[req.query.jobID] = snapshot.child(req.query.jobID).val()
				jobs.push(job)
				console.log("GET /jobs/" + req.query.jobID)
			} else {
				res.sendStatus(400)
				console.log("get /jobs/" + req.query.jobID + " failed: jobID does not exist")
			}
		}
		// Get job by search
		else if (req.query.search) {
			snapshot.forEach(function(childSnapshot) {
				if (childSnapshot.child("name").val().match(new RegExp(req.query.search, "i")) || childSnapshot.child("tags").val().match(new RegExp(req.query.search, "i"))) {
					var job = {}
					job[childSnapshot.key] = childSnapshot.val()
					jobs.push(job)
					console.log("GET /jobs with " + req.query.search)
				}
			})
			if (jobs.length == 0) {
				res.sendStatus(400)
				console.log("get /jobs/ with " + req.query.search + " failed: no jobs found")
			}
		}
		// Get jobs by specific employer
		else if (req.query.employer) {
			snapshot.forEach(function(childSnapshot) {
				if (childSnapshot.child("employer").val().match(new RegExp(req.query.employer))) {
					var job = {}
					job[childSnapshot.key] = childSnapshot.val()
					jobs.push(job)
					console.log("GET /jobs by " + req.query.employer)
				}
			})
			if (jobs.length == 0) {
				res.sendStatus(400)
				console.log("get /jobs/ by " + req.query.employer + " failed: no jobs found")
			}
		}
		// Get jobs
		else {
			snapshot.forEach(function(childSnapshot) {
				var job = {}
				job[childSnapshot.key] = childSnapshot.val()
				jobs.push(job)
				console.log("GET /jobs")
			})
			if (jobs.length == 0) {
				res.sendStatus(400)
				console.log("get /jobs failed: no jobs found")
			}
		}
		// Order the jobs
		if (req.query.order) {
			// Filter by payment
			if (req.query.order == "pay") {
				jobs.sort(function(a, b) {
					if (a[Object.keys(a)[0]].pay < b[Object.keys(b)[0]].pay) {
						return 1
					} else if (a[Object.keys(a)[0]].pay > b[Object.keys(b)[0]].pay) {
						return -1
					} else {
						return 0
					}
				})
				console.log("GET /jobs sorted by pay")
			}
			// Order by distance
			else if (req.query.order == "distance" && req.query.longitude && req.query.latitude) {
				jobs.sort(function(a, b) {
					if (getDistance(a[Object.keys(a)[0]].longitude, a[Object.keys(a)[0]].latitude, req.query.longitude, req.query.latitude) > getDistance(b[Object.keys(b)[0]].longitude, b[Object.keys(b)[0]].latitude, req.query.longitude, req.query.latitude)) {
						return 1
					} else if (getDistance(a[Object.keys(a)[0]].longitude, a[Object.keys(a)[0]].latitude, req.query.longitude, req.query.latitude) < getDistance(b[Object.keys(b)[0]].longitude, b[Object.keys(b)[0]].latitude, req.query.longitude, req.query.latitude)) {
						return -1
					} else {
						return 0
					}
				}) 
				console.log("GET /jobs sorted by distance")
			}
		}
		// Filter the jobs by distance
		if (req.query.longitude && req.query.latitude && req.query.km) {
			for (i = jobs.length - 1; i > -1; i--) {
				if (getDistance(jobs[i][Object.keys(jobs[i])[0]].longitude, jobs[i][Object.keys(jobs[i])[0]].latitude, req.query.longitude, req.query.latitude) > req.query.km) {
					jobs.splice(i, 1)
				}
			} if (jobs.length == 0) {
				res.sendStatus(400)
				console.log("get /jobs filtered by distance failed: no jobs found")
			} else {
				console.log("GET /jobs filtered by distance")
			}
		}
		res.send(jobs)
	}, function(err) {
		res.sendStatus(400)
		console.log(err)
	})
})

// Create a job (POST /jobs)
app.post('/jobs', (req, res) => {
    var ref = firebase.database().ref("jobs")
    var key = ref.push().key
    ref.child(key).set({
        name: req.body.name,
        description: req.body.description,
        longitude: parseFloat(req.body.longitude),
        latitude: parseFloat(req.body.latitude),
        pay: parseFloat(req.body.value),
        type: req.body.type,
        duration: parseFloat(req.body.duration),
        photo: req.body.photo,
        tags: req.body.tags,
        prerequisites: req.body.prerequisites,
        employer: req.body.employer,
        status: "open",
		applicants: "",
		hired: ""
    }).then(function() {
    	res.send(key)
    	console.log("POST /jobs/" + key)
    }, function(err) {
    	res.sendStatus(400)
    	console.log(err)
    })
})

// Update a job (POST /put/jobs)
// May be changed to (PUT /jobs)
app.post('/put/jobs', (req, res) => {
	var ref = firebase.database().ref("jobs")
	ref.once("value").then(function(snapshot) {
		if (snapshot.hasChild(req.body.jobID)) {
			var update = {};
			if (req.body.name) {
				update.name = req.body.name
			} if (req.body.description) {
				update.description = req.body.description
			} if (req.body.longitude) {
				update.longitude = parseFloat(req.body.longitude)
			} if (req.body.latitude) {
				update.latitude = parseFloat(req.body.latitude)
			} if (req.body.value) {
				update.pay = parseFloat(req.body.value)
			} if (req.body.type) {
				update.type = req.body.type
			} if (req.body.duration) {
				update.duration = parseFloat(req.body.duration)
			} if (req.body.photo) {
				update.photo = req.body.photo
			} if (req.body.tags) {
				update.tags = req.body.tags
			} if (req.body.prerequisites) {
				update.prerequisites = req.body.prerequisites
			} if (req.body.employer) {
				update.employer = req.body.employer
			} if (req.body.status) {
				update.status = req.body.status
			} if (req.body.applicants) {
				update.applicants = req.body.applicants
			} if (req.body.hired) {
				update.hired = req.body.hired;
			}
			ref.child(req.body.jobID).update(update).then(function() {
				res.sendStatus(200)
				console.log("PUT /jobs/" + req.body.jobID)
			}, function(err) {
				res.sendStatus(400)
				console.log(err)
			})
		} else {
			res.sendStatus(400)
			console.log("put /jobs/" + req.body.jobID + " failed: jobID does not exist")
		}
	}, function(err) {
		res.sendStatus(400)
		console.log(err)
	})
})

// Delete job. (POST /delete/jobs)
// May be changed to (DELETE /jobs)
app.post("/delete/jobs", (req, res) => {
    var ref = firebase.database().ref("jobs")
	ref.once("value").then(function(snapshot) {
    	if (snapshot.hasChild(req.body.jobID)) {
    		ref.child(req.body.jobID).remove().then(function() {
    			res.sendStatus(200)
    			console.log("DELETE /users/" + req.body.jobID)
    		}, function(err) {
    			res.sendStatus(400)
    			console.log(err)
    		})
    	} else {
    		res.sendStatus(400)
    		console.log("delete /users/" + req.body.jobID + " failed: username does not exist")
    	}
  	}, function(err) {
  		res.sendStatus(400)
  		console.log(err)
  	});
})

// When you go to localhost:3000,
app.get('/', (req, res) => {
    var HTMLfile = __dirname + '/index.html'
    res.sendFile(HTMLfile)
})

if (!module.parent) {
	app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	});
}

module.exports = app;
