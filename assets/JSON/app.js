$(document).ready(function () {
    // Event listener for all buttons that are being called on

    var buttons = ["Super Troopers", "ZooLander", "Cat"]

    function renderButtons (){
        $("#gif-buttons").empty()
        for(var i = 0; i < buttons.length; i++) {
            var button = $("<button>");
            button.text(buttons[i])
            button.attr("data-random", buttons[i])
            $("#gif-buttons").append(button);

        }
        

    }

    $("button").on("click", function () {
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

// add gif button
            $("#add-gify").on("click", function (event) {
                event.preventDefault();
                $("#gify-view").empty();

                for (var i = 0; i < gifys.length; i++) {
                    // Then dynamicaly generating buttons for each movie in the array.
                    var a = $("<button>");
                    // Adding a class
                    a.addClass("gify");
                    a.attr("data-name", gifys[i]);
                    a.text(gifys[i]);
                    $("#gify-view").append(a);
                }

                // This line will grab the text from the input box
                var gify = $("#gify-input").val().trim();
                gifys.push(gify);

            });

        });
    });

    renderButtons()
});
