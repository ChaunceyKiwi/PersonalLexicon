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
        option_word.style.display = "none";

        var content = document.createTextNode(window.LEXICON_DATA.words[i].spelling);

        option_word.onclick = function() {
            var clicked_id = parseInt(event.target.id.replace("word",""));
            loadMeanings(clicked_id);
        };


        option_words.appendChild(option_word);
        option_word.appendChild(content);
    }
}

function loadMeanings(id) {
    removeAllChildren("meanings");

    for (var i = 0; i < window.LEXICON_DATA.words[id].Meanings.length; i++) {
        var meaningId = window.LEXICON_DATA.words[id].Meanings[i];
        var meaning_content = window.LEXICON_DATA.meanings[meaningId];

        var meanings = document.getElementById("meanings");
        var meaning = document.createElement("div");

        var POS = document.createElement("div");
        var POS_title = document.createElement("b");
        var POS_title_text = document.createTextNode("POS");
        var POS_content = document.createElement("div");
        var POS_content_text = document.createTextNode(meaning_content.POS);
        POS_title.appendChild(POS_title_text);
        POS_content.appendChild(POS_content_text);
        POS.appendChild(POS_title);
        POS.appendChild(POS_content);

        var definition = document.createElement("div");
        var definition_title = document.createElement("b");
        var definition_title_text = document.createTextNode("Definition");
        var definition_content = document.createElement("div");
        var definition_content_text = document.createTextNode(meaning_content.definition);
        definition_title.appendChild(definition_title_text);
        definition_content.appendChild(definition_content_text);
        definition.appendChild(definition_title);
        definition.appendChild(definition_content);

        var synonyms = document.createElement("div");
        var synonyms_title = document.createElement("b");
        var synonyms_title_text = document.createTextNode("Synonyms");
        var synonyms_content = document.createElement("div");
        var synonyms_content_text = document.createTextNode(meaning_content.synonyms);
        synonyms_title.appendChild(synonyms_title_text);
        synonyms_content.appendChild(synonyms_content_text);
        synonyms.appendChild(synonyms_title);
        synonyms.appendChild(synonyms_content);

        var antonyms = document.createElement("div");
        var antonyms_title = document.createElement("b");
        var antonyms_title_text = document.createTextNode("Antonyms");
        var antonyms_content = document.createElement("div");
        var antonyms_content_text = document.createTextNode(meaning_content.antonyms);
        antonyms_title.appendChild(antonyms_title_text);
        antonyms_content.appendChild(antonyms_content_text);
        antonyms.appendChild(antonyms_title);
        antonyms.appendChild(antonyms_content);

        var example = document.createElement("div");
        var example_title = document.createElement("b");
        var example_title_text = document.createTextNode("Example");
        var example_content = document.createElement("div");
        var example_content_text = document.createTextNode(meaning_content.example);
        example_title.appendChild(example_title_text);
        example_content.appendChild(example_content_text);
        example.appendChild(example_title);
        example.appendChild(example_content);

        meaning.appendChild(POS);
        meaning.appendChild(definition);
        meaning.appendChild(synonyms);
        meaning.appendChild(antonyms);
        meaning.appendChild(example);

        meanings.appendChild(meaning);
        meanings.appendChild(document.createElement("br"));
    }
}

function removeAllChildren(id) {
    var myNode = document.getElementById(id);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

document.getElementById("search-bar").onkeyup = function() {
    var filter = this.value.toUpperCase();
    var option_words = document.getElementsByClassName("option_word");
    for (var i = 0; i < option_words.length; i++) {
        var textNode = option_words[i];
        if (filter == "") {
            textNode.style.display = "none";
        } else {
            var search_title = textNode.innerText.toUpperCase().indexOf(filter);
            if (search_title > -1) {
                textNode.style.display = "block";
            } else {
                textNode.style.display = "none";
            }
        }
    }
};