var templates = document.querySelectorAll('script[type="text/handlebars"]');

Handlebars.templates = Handlebars.templates || {};

Array.prototype.slice.call(templates).forEach(function(script) {
Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

//Send button trigger the search
$("#send_button").click(function() {
    $("#search_word").html('Results for ' + '"' + $('#search_input').val() + '"');
    $('#display_results').empty(); //Clear the results everytime before requesting again
    searchSpotify("https://api.spotify.com/v1/search?q=" + encodeURIComponent($('#search_input').val()) + "&type=" + $('#select_button').val());
});

//Search pressing "Enter" and remove value when click the input field for the first time. Events for the input field
$("#search_input").keydown(function(e){
    if(e.which == 13){
        $('#send_button').click();
    }
}).click (function () {
    if (this.value === "I'm searching for"){
        this.value = "";
    }
});

// Function search with URL as parameterto callback with the "More" button or scrolling.
function searchSpotify (url) {
    $.get(url , function (data) {

// Analysing if the serach is an album or an artist
        var artistOrAlbum = Object.keys(data)[0];
        if (artistOrAlbum === "albums") {
            var searchResults = data.albums.items;
            var nextResult = data.albums.next;
            var totalResult = data.albums.total;
        } else {
            searchResults = data.artists.items;
            nextResult = data.artists.next;
            totalResult = data.artists.total;

var resultsToDisplay = [];
var photosToDisplay = []


for (var j = 0; j < searchResults.length; j++) {
    if (searchResults[j].images.length === 0) {
        photosToDisplay[j] = "images/nocontent.jpg";
    } else {
        photosToDisplay[j] = searchResults[j].images[1].url;
    }
}

for (var i = 0; i < searchResults.length; i++) {
        resultsToDisplay.push (
            { "link" : searchResults[i].external_urls.spotify,
              "name": searchResults[i].name,
              "photo": photosToDisplay[i]});

}

$("#display_results").append(Handlebars.templates.results({
       resultsToDisplay
}))

// events to load more resuts with click on the button or scrolling down the page
        if ($('#display_results').children().length < totalResult) {
            $('#more_results').css("display", "block");
                $('#more_results').unbind().click(function () {
                    searchSpotify(nextResult);
                });
        } else {
            $('#more_results').css("display", "none");
            return;}
    }
})
}
