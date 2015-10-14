var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));


developers = [
    { firstName: "Maaref", lastName: "Marok" },
    { firstName: "Benzemam", lastName: "Abdelghani" },
    { firstName: "Bensadi", lastName: "Rooney" }
]

app.delete('/api/developer/:index', function (req, res) {

    developers.splice(req.params.index, 1);

    res.json(developers);

});

app.post('/api/developer', function (req, res) {
    var devloper = req.body;
    developers.push(devloper);
    res.json(developers);

});

app.get('/api/developer', function (req, res) {
    res.send
});

app.get('/animation', function (req, res) {
    res.sendFile("views/animation/index");
});

app.get('/api/developer/:index', function (req, res) {
    res.json(developers[req.params.index]);
});


ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port);