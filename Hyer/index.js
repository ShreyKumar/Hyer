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

// Create Job
app.post('/jobs', (req, res) => {
    var jobsRef = firebase.database().ref("jobs/")
    jobsRef.push({
        name: req.body.jobName,
        description: req.body.jobDescription,
        coordinates: {x: req.body.xCoordinate, y: req.body.yCoordinate },
        pay: {value: req.body.payValue, type: req.body.payType },
        duration: req.body.jobDuration,
        photo: req.body.jobPhoto,
        tags: req.body.jobTags,
        prerequisites: req.body.jobPrerequisites,
        employer: req.body.jobEmployer,
        status: req.body.jobStatus
    })
    console.log('POSTED /jobs')
    res.send('Successfuly received job posting')
})

// Get job with given job ID.
app.get('/jobs', (req, res) => {
    var jobsRef = firebase.database().ref("jobs/")
    jobsRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            var jobID = child.key;
            if (jobID == req.query.jobID){
                res.send(child.val())
            }
        })
    })
    console.log('GETTING job with ID ' + req.query.jobID)
})

// Create User
app.post('/users', (req, res) => {
    var jobsRef = firebase.database().ref("users/")
    jobsRef.push({
        name: {firstName: req.body.firstName, lastName: req.body.lastName },
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        bio: req.body.userBio,
        photo: req.body.userPhoto,
    })
    console.log('POSTED /users')
    res.send('Successfuly received user creation')
})

// Get User by ID
app.get('/users', (req, res) => {
    var usersRef = firebase.database().ref("users/")
    usersRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            var userID = child.key;
            if (userID == req.query.userID){
                res.send(child.val())
            }
        })
    })
    console.log('GETTING user with ID ' + req.query.userID)
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(3000, function() {
    console.log("connected on 3k")
})

