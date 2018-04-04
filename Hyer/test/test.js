const assert = require('assert');
const app = require('../index.js');
const request = require('request');

var chai = require('chai');
chaiHttp = require('chai-http');
chai.use(chaiHttp);

var key1;
var key2;
var key3;

describe('Server', () => {
    before((done) => {
        this.port = 3000;
        this.server = app.listen(this.port, (err, result) => {
        if (err) { 
            return done(err);
        }
            return done();
        }); 
        this.request = request.defaults({
            baseUrl: 'http://localhost:3000/',
        }); 
    });

    after(() => {
        this.server.close();
    });

    beforeEach((done) => {
        var userInfo1 = {username: "a", userID: "a", firstName: "a", lastName: "a", email: "a", phoneNumber: "a", bio: "a", photo: "a", password: "a"}
        var userInfo2 = {username: "b", userID: "a", firstName: "a", lastName: "a", email: "a", phoneNumber: "a", bio: "b", photo: "a", password: "a"}
        var userInfo3 = {username: "c", userID: "a", firstName: "a", lastName: "a", email: "a", phoneNumber: "a", bio: "c", photo: "a", password: "a"}

        var jobInfo1 = {name: "a", description: "a", longitude: "1", latitude: "1", value: "3", type: "a", duration: "3", photo: "a", tags: "a", prerequisites: "a", employer: "a", status: "a", applicants: "a", hired: "a"}
        var jobInfo2 = {name: "a", description: "a", longitude: "1", latitude: "1", value: "3", type: "a", duration: "3", photo: "a", tags: "a", prerequisites: "a", employer: "a", status: "a", applicants: "a", hired: "a"}
        var jobInfo3 = {name: "a", description: "a", longitude: "1", latitude: "1", value: "3", type: "a", duration: "3", photo: "a", tags: "a", prerequisites: "a", employer: "a", status: "a", applicants: "a", hired: "a"}

        chai.request(app)
        .post('/users')
        .type('form')
        .send(userInfo1)
        .end(function(error, response) {
            if (error) { 
                console.log("error")
                done(error);
            } else {
                chai.request(app)
                .post('/users')
                .type('form')
                .send(userInfo2)
                .end(function(error, response) {
                    if (error) { 
                        console.log("error")
                        done(error);
                    } else {
                        chai.request(app)
                        .post('/users')
                        .type('form')
                        .send(userInfo3)
                        .end(function(error, response) {
                            if (error) { 
                                console.log("error")
                                done(error);
                            } else {
                                chai.request(app)
                                .post('/jobs')
                                .type('form')
                                .send(jobInfo1)
                                .end(function(error, response) {
                                    if (error) { 
                                        done(error);
                                    } else {
                                        key1 = response.text
                                        chai.request(app)
                                        .post('/jobs')
                                        .type('form')
                                        .send(jobInfo2)
                                        .end(function(error, response) {
                                            if (error) { 
                                                done(error);
                                            } else {
                                                key2 = response.text
                                                chai.request(app)
                                                .post('/jobs')
                                                .type('form')
                                                .send(jobInfo3)
                                                .end(function(error, response) {
                                                    if (error) { 
                                                        done(error);
                                                    } else {
                                                        key3 = response.text
                                                        done();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    afterEach((done) => {
        var user1 = {username: "a"}
        var user2 = {username: "b"}
        var user3 = {username: "c"}

        chai.request(app)
        .post('/delete/users')
        .send(user1)
        .end(function(error, response) {
            chai.request(app)
            .post('/delete/users')
            .send(user2)
            .end(function(error, response) {
                chai.request(app)
                .post('/delete/users')
                .send(user3)
                .end(function(error, response) {
                    chai.request(app)
                    .post('/delete/jobs')
                    .send({jobID: key1})
                    .end(function(error, response) {
                        if (error) { 
                            done(error); 
                        }
                        chai.request(app)
                        .post('/delete/jobs')
                        .send({jobID: key2})
                        .end(function(error, response) {
                            if (error) { 
                                done(error); 
                            }
                            chai.request(app)
                            .post('/delete/jobs')
                            .send({jobID: key3})
                            .end(function(error, response) {
                                if (error) { 
                                    done(error); 
                                }
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    it('should exist', () => {
        assert(app);
    });

    describe('GET /jobs', () => {
        it('should not return 400', (done) => {
            this.request.get('/jobs', (error, response) => {
                if (error) { 
                    done(error); 
                }
                assert.notEqual(response.statusCode, 400);
                done();
            });
        });
    });

    describe('Delete a job that does not exist, then add and delete one', () => {
        var key;
        var job = {jobID: "1"}
        var jobInfo = {name: "a", description: "a", longitude: "1", latitude: "1", value: "3", type: "a", duration: "3", photo: "a", tags: "a", prerequisites: "a", employer: "a", status: "a", applicants: "a", hired: "a"}

        it('Delete a job that does not exist: should return 400', (done) => {
            chai.request(app)
            .post('/delete/jobs')
            .send(job)
            .end(function(error, response) {
                assert.equal(response.statusCode, 400);
                done();
            });
        });

        it('Add a job and delete the job: should return 200', (done) => {
            chai.request(app)
            .post('/jobs')
            .type('form')
            .send(jobInfo)
            .end(function(error, response) {
                if (error) { 
                    done(error);
                } else {
                    assert.equal(response.statusCode, 200);
                    key = response.text
                    chai.request(app)
                    .post('/delete/jobs')
                    .send({jobID: key})
                    .end(function(error, response) {
                        assert.equal(response.statusCode, 200);
                        done();
                    });
                }
            });
        });
    });

    describe('Delete a user that does not exist, then add and delete one', () => {
        var key = "aaa"
        var user = {username: key}
        var userInfo = {username: key, userID: "aaaa", firstName: "a", lastName: "a", email: "a", phoneNumber: "a", bio: "a", photo: "a", password: "a", credits: 0.00}

        it('Delete a user that does not exist: should return 400', (done) => {
            chai.request(app)
            .post('/delete/users')
            .send(user)
            .end(function(error, response) {
                assert.equal(response.statusCode, 400);
                done();
            });
        });

        it('Add a user: should return 200', (done) => {
            chai.request(app)
            .post('/users')
            .type('form')
            .send(userInfo)
            .end(function(error, response) {
                if (error) { 
                    done(error);
                } else {
                    assert.equal(response.statusCode, 200);
                    done();
                }
            });
        });

        it('Delete the user: should return 200', (done) => {
            chai.request(app)
            .post('/delete/users')
            .send(user)
            .end(function(error, response) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });
    });


    describe('Test get users, get user, and delete user', () => {
        var user1 = {username: "a"}
        var user2 = {username: "b"}
        var user3 = {username: "c"}
        var expected1 = {bio: "a", credits: 0.00, email: "a", firstName: "a", lastName: "a", password: "a", phoneNumber: "a", photo: "a"}
        var expected2 = {bio: "b", credits: 0.00, email: "a", firstName: "a", lastName: "a", password: "a", phoneNumber: "a", photo: "a"}
        var expected3 = {bio: "c", credits: 0.00, email: "a", firstName: "a", lastName: "a", password: "a", phoneNumber: "a", photo: "a"}
        var temp1 = {}
        var temp2 = {}
        var temp3 = {}
        temp1["a"] = expected1
        temp2["b"] = expected2
        temp3["c"] = expected3


        var expected = [temp1, temp2, temp3]

        it('Get users: should return all users', (done) => {
            chai.request(app)
            .get('/users')
            .end(function(error, response) {
                assert.equal(JSON.stringify(response.body), JSON.stringify(expected));
                done();
            });
        });

        it('Get user: should return the proper user', (done) => {
            chai.request(app)
            .get('/users?username=a')
            .end(function(error, response) {
                assert.equal(JSON.stringify(response.body), JSON.stringify([temp1]));
                done();
            });
        });
        it('Get user: should return the proper user', (done) => {
            chai.request(app)
            .get('/users?username=b')
            .end(function(error, response) {
                assert.equal(JSON.stringify(response.body), JSON.stringify([temp2]));
                done();
            });
        });
        it('Get user: should return the proper user', (done) => {
            chai.request(app)
            .get('/users?username=c')
            .end(function(error, response) {
                assert.equal(JSON.stringify(response.body), JSON.stringify([temp3]));
                done();
            });
        });
    });

    describe('Get user that does not exist', () => {
        it('Get user: should return 400', (done) => {
            chai.request(app)
            .get('/users?username=123')
            .end(function(error, response) {
                assert.equal(response.statusCode, 400);
                done();
            });
        });
    });

    describe('Update a user that does not exist', () => {
        it('Update user: should return 400', (done) => {
            chai.request(app)
            .post('/put/users')
            .send({username: "1"})
            .end(function(error, response) {
                assert.equal(response.statusCode, 400);
                done();
            });
        });
    });


    describe("Update a user, but don't change anything", () => {
        var expected1 = [{"a": {bio: "a", credits: 0.00, email: "a", firstName: "a", lastName: "a", password: "a", phoneNumber: "a", photo: "a"}}]

        it('Update user: should return 200', (done) => {
            chai.request(app)
            .post('/put/users')
            .send({username: "a"})
            .end(function(error, response) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });

        it('Get user: user should not be changed', (done) => {
            chai.request(app)
            .get('/users?username=a')
            .end(function(error, response) {
                assert.equal(JSON.stringify(response.body), JSON.stringify(expected1));
                done();
            });
        });
    });

    describe("Update a user, test if changes stick", () => {
        var expected1 = [{"a": {bio: "a", credits: 0.00, email: "b", firstName: "a", lastName: "a", password: "a", phoneNumber: "a", photo: "a"}}]

        it('Update user and check changes: should match', (done) => {
            chai.request(app)
            .post('/put/users')
            .send({username: "a", email: "b"})
            .end(function(error, response) {
                chai.request(app)
                .get('/users?username=a')
                .end(function(error, response) {
                    assert.equal(JSON.stringify(response.body), JSON.stringify(expected1));
                    done();
                });
            });
        });
    });

    describe('Test get jobs', () => {
        var temp1 = {applicants:"",description:"a",duration:3,employer:"a",hired:"",latitude:1,longitude:1,name:"a",pay:3,photo:"a",prerequisites:"a",status:"open",tags:"a",type:"a"}
        var temp2 = {applicants:"",description:"a",duration:3,employer:"a",hired:"",latitude:1,longitude:1,name:"a",pay:3,photo:"a",prerequisites:"a",status:"open",tags:"a",type:"a"}
        var temp3 = {applicants:"",description:"a",duration:3,employer:"a",hired:"",latitude:1,longitude:1,name:"a",pay:3,photo:"a",prerequisites:"a",status:"open",tags:"a",type:"a"}
        var expected1 = {}
        var expected2 = {}
        var expected3 = {}

        it('Get jobs: should match', (done) => {
            chai.request(app)
            .get('/jobs')
            .end(function(error, response) {
                expected1[key1] = temp1
                expected2[key2] = temp2
                expected3[key3] = temp3
                var expected = [expected1, expected2, expected3]
                assert.equal(JSON.stringify(response.body), JSON.stringify(expected));
                done();
            });
        });
    });

    describe('Test get jobs by distance', () => {
        var temp1 = {applicants:"",description:"a",duration:3,employer:"a",hired:"",latitude:1,longitude:1,name:"a",pay:3,photo:"a",prerequisites:"a",status:"open",tags:"a",type:"a"}
        var temp2 = {applicants:"",description:"a",duration:3,employer:"a",hired:"",latitude:1,longitude:1,name:"a",pay:3,photo:"a",prerequisites:"a",status:"open",tags:"a",type:"a"}
        var temp3 = {applicants:"",description:"a",duration:3,employer:"a",hired:"",latitude:1,longitude:1,name:"a",pay:3,photo:"a",prerequisites:"a",status:"open",tags:"a",type:"a"}
        var expected1 = {}
        var expected2 = {}
        var expected3 = {}

        it('Get jobs by distance: should match', (done) => {
            chai.request(app)
            .get('/jobs?longitude=1&latitude=1&km=1000000')
            .end(function(error, response) {
                expected1[key1] = temp1
                expected2[key2] = temp2
                expected3[key3] = temp3
                var expected = [expected1, expected2, expected3]
                assert.equal(JSON.stringify(response.body), JSON.stringify(expected));
                done();
            });
        });

        it('Get jobs by distance: should match', (done) => {
            chai.request(app)
            .get('/jobs?longitude=2&latitude=2&km=0')
            .end(function(error, response) {
                var expected = {}
                assert.equal(JSON.stringify(response.body), JSON.stringify(expected));
                done();
            });
        });
    });
});