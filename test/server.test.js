var app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
const assert = require('chai').assert;
const fs = require('fs');

describe('server.js Test', () => {
    describe('POST /login', function () {
        it('responds with 200 OK for correct credentials', function (done) {
            request(app)
                .post('/users/signin')
                .send({ email: 'email@test.com', password: 'test@123' })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /login', function () {
        it('responds with 400 for missing credentials', function (done) {
            request(app)
                .post('/users/signin')
                .send({ email: 'email@test.com' })
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('POST /login', function () {
        it('responds with 401 for invalid credentials', function (done) {
            request(app)
                .post('/users/signin')
                .send({ email: 'email@test.com', password: 'test123' })
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /notifications', function () {
        it('responds with 200 status', function (done) {
            request(app)
                .get('/notifications')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('PUT /notifications/id', function () {
        it('responds with 200 status', function (done) {
            request(app)
                .put('/notifications/1')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        });
    });

    describe('GET /verifyToken', function() {
        it('responds with 401 status on invalid token', function(done) {
            request(app)
                .get('/verifyToken?token="random')
                .expect(401)
                .end(function (err, res) {
                    if (err) return done(err);
                    done();
                });
        })
    })

});