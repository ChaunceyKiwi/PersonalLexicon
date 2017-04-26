window.LEXICON_DATA = {};
var meaningsLoaded = false;
var wordsLoaded = false;

// Fetch data of meanings from server
$.get('/api/meanings', function(data) {
    var meaningsArray = JSON.parse(data);
    window.LEXICON_DATA.meanings = meaningsArray.meanings;
    meaningsLoaded = true;
    if (wordsLoaded == true) {
        runApplication();
    }
});

// Fetch data of words from server
$.get('/api/words', function(data) {
    var wordsArray = JSON.parse(data);
    window.LEXICON_DATA.words = wordsArray.words;
    wordsLoaded = true;
    if (meaningsLoaded == true) {
        runApplication();
    }
});

function runApplication() {
    console.log(window.LEXICON_DATA);
    loadWords();
}

function loadWords() {
    for (var i = 0; i < window.LEXICON_DATA.words.length; i++) {

        var option_words = document.getElementById("optionWords");
        var option_word = document.createElement("div");
        option_word.className = "option_word";
        option_word.id = "word" + window.LEXICON_DATA.words[i].id;
        var content = document.createTextNode(window.LEXICON_DATA.words[i].spelling);

        option_words.appendChild(option_word);
        option_word.appendChild(content);
    }
}