$("#send_button").click(function() {
    $('#display_results').empty(); //Clear the results everytime before requesting again
    searchMovies("http://www.omdbapi.com/?t=" + $('#search_input').val());
});

//Search pressing "Enter" and remove value when click the input field for the first time. Events for the input field
$("#search_input").keydown(function(e){
    if(e.which == 13){
        $('#send_button').click();
    }
}).click (function () {
    if (this.value === "Select a movie title"){
        this.value = "";
    }
});


var templates = document.querySelectorAll('script[type="text/handlebars"]');

Handlebars.templates = Handlebars.templates || {};

Array.prototype.slice.call(templates).forEach(function(script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

function searchMovies (url) {
    $.get(url , function (data) {
        var poster;
        data.Poster === "N/A" ? poster="images/noimage.jpg" : poster=data.Poster;

        $("#display_results").html( Handlebars.templates.movies({
            "Title": data.Title,
            "movieActor": data.Actors,
            "movieRelDate" : data.Year,
            "movieDirector" : data.Director,
            "movieAwards" : data.Awards,
            "moviePoster" : poster
        }))

        data.Response === "False" ? $("#search_word").html(data.Error) : $("#search_word").html('Results for "' + data.Title + '"');
        data.Response = 0;
    })





}
