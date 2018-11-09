//Array holding topics, to have user input pushed to
var topics = [
    "computers",
    "software",
    "programming",
    "video games"
];
//jquery variables
var buttonContainer = $("#button-wrapper")


// function to create html buttons
function createButtons() {

    for (var i = 0; i < topics.length; i++) {

        var button = $("<button id='" + topics[i] + "'/>").text(topics[i])
            .attr("data-name", topics[i])
            .attr("class", "button")
        $("#button-wrapper").append(button);

    };
};

//function to append new buttons
function addButton() {
    event.preventDefault();
    var userButton = $("#input").val().trim();
    if (userButton != "") {
        topics.push(userButton);
        var newButton = $("<button id='" + userButton + "'/>").text(userButton)
            .attr("data-name", userButton)
            .attr("class", "button");
        $("#button-wrapper").append(newButton);
        // $("#button-wrapper").empty();
        // console.log(topics);
        // createButtons()
    }
    else {
        //alert("hell0");
    }
}

//function to retrieve images, takes parameter q, the search term to be added to the api url
function ajaxCall(q) {

    var url = "http://api.giphy.com/v1/gifs/search";
    url += '?' + $.param({
        "api_key": "XL5hHuJhx6Ks9bcTrXgZrW6WuGkShnMS",
        "q": q,
        "limit": "10",
    });

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (response) {
        //console.log(response);
        var dataArray = response.data;
        console.log(dataArray);
        for (var i = 0; i < dataArray.length; i++) {
            //var dataUrl = dataArray[i].images.fixed_height_still.url;
            var dataUrl = dataArray[i].images.fixed_width_still.url;
            //console.log(dataUrl);
            var image = $("<img/>").attr("src", dataUrl)
                .attr("class", "gif");

            var figure = $("<figure/>").html(image);

            /* var figure = $("<figure/>").attr("class", "figure");
            figure.html(image);
            var caption = $("<figcaption/>").text(dataArray[i].rating);
            var figCaption = figure.html(caption);
            $("#image-wrapper").append(figCaption) */

            $("#image-figure").append(figure);
            
            image.after("<figcaption>Rated: " + dataArray[i].rating + "</figcaption>")
        };


    }).fail(function (err) {
        throw err;
    });
};

function clearImages() {
    $("#image-figure").empty();
}

//event handlers
$(document).ready(function () {

    createButtons();

    $("#submit").on("click", function (event) {
        event.preventDefault();
        addButton();
    });

    $("body").on("click", ".button", function (event) {
        clearImages();
        var buttonValue = $(this).attr("id");
        ajaxCall(buttonValue);
    });

    $('body').on('click', '.gif', function () {
        var src = $(this).attr("src");
        if ($(this).hasClass('playing')) {
            //stop
            $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
            $(this).removeClass('playing');
        } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
        }
    });

    $("#clear").on("click", function () {
        clearImages();
    });

});
