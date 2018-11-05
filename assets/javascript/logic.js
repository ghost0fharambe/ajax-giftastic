//Array holding topics, to have user input pushed to
var topics = [
    "computers",
    "software",
    "programming",
    "video games"
];
//jquery variables
var buttonContainer = $("#button-wrapper")
//


function createButtons() {

    for (var i = 0; i < topics.length; i++) {

        var button = $("<button id='" + topics[i] + "'/>").text(topics[i])
            .attr("data-name", topics[i])
            .attr("class", "button")
        $("#button-wrapper").append(button);

    };
};

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
        //console.log(dataArray);
        for (var i = 0; i < dataArray.length; i++) {
            var dataUrl = dataArray[i].images.fixed_width_still.url;
            //console.log(dataUrl);
            var image = $("<img/>").attr("src", dataUrl);
            $("#image-wrapper").append(image);
        };


    }).fail(function (err) {
        throw err;
    });
};


/* function giphySearch() {
    var buttonValue = $(this).attr("id");
    ajaxCall(buttonValue);
} */

/* function appendImages() {
    var dataArray = $(this).response.data;
    console.log(dataArray);
}; */

$(document).ready(function () {

    createButtons();

    $("#submit").on("click", function (event) {
        event.preventDefault();
        addButton();
    });

    $("body").on("click", ".button", function (event) {
        $("#image-wrapper").empty();
        var buttonValue = $(this).attr("id");
        ajaxCall(buttonValue);
    });

});