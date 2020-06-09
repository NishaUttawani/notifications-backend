require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const utils = require('./utils');
const constants = require('./config');

const app = express();
const port = process.env.PORT || 4000;


// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

	
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
});

// request handlers
app.get('/', function(req, res) {
    res.send('Welcome to the Node.js Tutorial! - ');
});

app.post('/users/signin', function (req, res) {
    const user = req.body.email;
    const pwd = req.body.password;

    // return 400 status if username/password is not exist
    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required."
        });
    }

    // return 401 status if the credential is not match.
    if (user !== constants.userData.email || pwd !== constants.userData.password) {
        return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong."
        });
    }

    // generate token
    const token = utils.generateToken(constants.userData);
    // get basic user details
    const userObj = utils.getCleanUser(constants.userData);
    // return the token along with user details
    return res.json({ user: userObj, token });
});


app.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        // return 401 status if the userId does not match.
        if (user.email !== constants.userData.email) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        // get basic user details
        var userObj = utils.getCleanUser(constants.userData);
        return res.json({ user: userObj, token });
    });
});

app.get('/notifications', function(req, res) {
    const notificationsDataPath = './data/notifications.json';
    fs.readFile(notificationsDataPath, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
  
        res.send(JSON.parse(data));
    });
});

app.put('/notifications/:id', function(req,res) {
    const notificationsDataPath = './data/notifications.json';
    const notificationId = req.params["id"];
    fs.readFile(notificationsDataPath, "utf8", (err, data) => {
        data = JSON.parse(data);
        const index = data.findIndex(x => x['_id'] == notificationId);
        data[index].read = true;
        fs.writeFile(notificationsDataPath, JSON.stringify(data), "utf8", (err) => {
            res.send({});
        });
    });

})

app.listen(port, () => {
    console.log('Server started on: ' + port);
});

module.exports = app;