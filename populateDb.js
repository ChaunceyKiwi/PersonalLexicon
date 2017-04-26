var fs = require('fs');
var models = require('./models');

models.sequelize.sync({force: true}).then(function() {

    fs.readFile('./meanings.json', function(err, data) {
        var meanings_data = JSON.parse(data);
        var meanings = meanings_data['meanings'];

        meanings.forEach(function(meaning) {
            models.Meaning.create({
                id: meaning.id.toString(),
                POS: meaning.POS,
                definition: meaning.definition,
                synonyms: meaning.synonyms,
                antonyms: meaning.antonyms,
                example: meaning.example
            });
        });
    });

    fs.readFile('./words.json', function(err, data) {
        var words_data = JSON.parse(data);
        var words = words_data['words'];

        words.forEach(function(word) {
            models.Word.create({
                id: word.id.toString(),
                spelling: word.spelling
            }).then(function(WordInstance) {
                for (var i = 0; i < word.meanings.length; i++) {
                    var meaningId = word.meanings[i];
                    models.Meaning.findById(meaningId).then(function(meaning) {
                        WordInstance.addMeaning(meaning);
                    })
                }
            });
        });
    });
});
