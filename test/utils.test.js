const expect = require('chai').expect;
const constants = require('../config');
var jwt = require('jsonwebtoken');
require("dotenv").config();


const utils = require('../utils');

describe('utils.js test', () => {
    describe('utils.getCleanUser() test', () => {
        it('should return user object with email and name', () => {
            const user = utils.getCleanUser(constants.userData);
            expect(JSON.stringify(user)).to.equal(JSON.stringify({ email: constants.userData.email, name: constants.userData.name}));
        });
    });

    describe('utils.getCleanUser() test', () => {
        it('should return null when user is null', () => {
            const user = utils.getCleanUser(null);
            expect(user).to.equal(null);
        });
    });

    describe('utils.generateToken() test', () => {
        it('should return null user is null', () => {
            const jwt = utils.generateToken(null);
             
            expect(jwt).to.equal(null);
        });
    });
});
