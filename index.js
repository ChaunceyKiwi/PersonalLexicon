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
    window.LEXICON_DATA.playlists = wordsArray.words;
    wordsLoaded = true;
    if (meaningsLoaded == true) {
        runApplication();
    }
});

function runApplication() {

}