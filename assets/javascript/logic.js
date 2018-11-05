//$(window).ready(function() {
//Array holding topics, to have user input pushed to
var topics = [
    "computers",
    "software",
    "programming",
    "video games"
];
//jquery variables
//var buttonContainer = $("#button-wrapper")
//


function createButtons() {
    for (var i = 0; i < topics.length; i++) {

        //$("#button-wrapper").append("<button>" + topics[i] +  "</button>");

        var button = $("<button id='" + topics[i] + "'/>").text(topics[i]);
        $("#button-wrapper").append(button);

    };
};

var url = "http://api.giphy.com/v1/gifs/search";
url += '?' + $.param({
    "api_key": "XL5hHuJhx6Ks9bcTrXgZrW6WuGkShnMS",
    "q": "computers"
});


$.ajax({
    url: url,
    method: 'GET',
}).done(function (response) {
    console.log(response);
    
}).fail(function(err) {
    throw err;
});