var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var users = require('./routes/users');

var app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())


app.listen(app.get('port'), function () {
    console.log("Express app listening on port " + app.get('port'))
})

app.use('/users', users);

module.exports = app;
