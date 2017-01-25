var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Enabling CORS with dynamic origin
var whitelist = ['https://polar-earth-74315.herokuapp.com/', 'https://api.brewerydb.com/v2/beers']
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
  }
}

app.listen(process.env.PORT || 8080);
