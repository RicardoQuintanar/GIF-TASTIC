$(document).ready(function () {
    // Event listener for all buttons that are being called on

    var buttons = ["Super Troopers", "ZooLander", "Cat"]

    function renderButtons (){
        $("#gif-buttons").empty()
        for(var i = 0; i < buttons.length; i++) {
            var button = $("<button>");
            button.text(buttons[i])
            button.attr("data-random", buttons[i])
            button.addClass("gif-button");
            $("#gif-buttons").append(button);

        }
        

    }
    // add gif button
    $("#add-gify").on("click", function (event) {
        event.preventDefault();
        var newButton = $("#gify-input").val()
        console.log(newButton);
        buttons.push(newButton);
        renderButtons()
    });

    $(document).on("click",".gif-button", function () {
        $("#images").empty()
        var random = $(this).attr("data-random");
        console.log('random:', random)
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + random + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var results = response.data;
            console.log('results:', results)

            for (var i = 0; i < response.data.length; i++) {

                var gifUrl = results[i].images.fixed_height.url;


                var rating = results[i].rating;

                // Creating an image element for each gif

                var gifImage = $("<img class='gif'>");
                // Attaching URL to each image element
                gifImage.attr("src", gifUrl);
                // creating p tag with rating text
                var ratingText = $("<p>").text(rating);
                // div to hold gif and rating
                var gifDiv = $("<div>")
                gifDiv.append(gifImage)
                // append rating
                gifDiv.append(ratingText)

                $("#images").prepend(gifDiv);

            };
        });
    });
    renderButtons()
});
