var express = require('express');
var fs = require('fs');
var models = require('./models');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function (req, res) {
    res.sendFile(__dirname + '/style.css');
});

app.get('/index.js', function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'public, max-age=1800');
    fs.readFile(__dirname + '/index.js', function(err, data) {
        response.end(data);
    });
});

app.get('/api/words', function(request, response) {
    var data = {};
    var i;

    models.Word.findAll({
        attributes: ['id', 'spelling'],
        include: [{
            model: models.Meaning,
            attributes: ['id'],
            through: {
                attributes: []
            }
        }]
    }).then(function(words) {
        response.statusCode = 200;
        response.setHeader('Content_type', 'application/json');

        data["words"] = words.map(function(word) {
            var jsonObj =  word.get({plain: true});
            for (i = 0; i < jsonObj.Meanings.length; i++) {
                jsonObj.Meanings[i] = jsonObj.Meanings[i].id;
            }
            return jsonObj;
        });

        response.end(JSON.stringify(data));
    });
});


app.get('/api/meanings', function(request, response) {
    var data = {};

    models.Meaning.findAll({
        attributes: ['id', 'POS', 'definition', 'synonyms', 'antonyms', 'example']
    }).then(function(meanings) {
        response.statusCode = 200;
        response.setHeader('Content_type', 'application/json');
        data["meanings"] = meanings.map(function(meaning){
            return meaning.get({plain: true});
        });

        //console.log("Length of songs:" + data.songs.length);
        response.end(JSON.stringify(data));
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});