const assert = require('assert');
const app = require('../index.js');
const request = require('request');

var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);

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
        var jobInfo = {name: "a", description: "a", xCoordinate: "1", yCoordinate: "1", value: "1", type: "a", duration: "1", photo: "a", tags: "a", prerequisites: "a", employer: "a", status: "a"}

        it('should return 400', (done) => {
            chai.request(app)
            .post('/delete/jobs')
            .send(job)
            .end(function(error, response) {
                assert.equal(response.statusCode, 400);
                done();
            });
        });

        it('should return 200', (done) => {
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
                    done();
                }
            });
        });

        it('should return 200', (done) => {
            chai.request(app)
            .post('/delete/jobs')
            .send({jobID: key})
            .end(function(error, response) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });
    });

    describe('Delete a user that does not exist, then add and delete one', () => {
        var key = "a"
        var user = {userID: key}
        var userInfo = {username: key, userID: "aaaa", firstName: "a", lastName: "a", email: "a", phoneNumber: "a", bio: "a", photo: "a", password: "a"}

        it('should return 400', (done) => {
            chai.request(app)
            .post('/delete/users')
            .send(user)
            .end(function(error, response) {
                assert.equal(response.statusCode, 400);
                done();
            });
        });

        it('should return 200', (done) => {
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

        it('should return 200', (done) => {
            chai.request(app)
            .post('/delete/users')
            .send(user)
            .end(function(error, response) {
                assert.equal(response.statusCode, 200);
                done();
            });
        });
    });
});