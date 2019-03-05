$(document).ready(function () {
    // Event listener for all buttons that are being called on
  
    $("button").on("click", function () {
      var random = $(this).attr("data-random");
      console.log('random:', random)
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + random + "&api_key=dc6zaTOxFJmzC&limit=5";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
  
        .then(function (response) {
          console.log(response)
          var results = response.data;
          console.log('results:', results)
          // var gifys = [];
  
  
          for (var i = 0; i < response.data.length; i++) {
            var gifUrl = results[i].images.fixed_height.url;
  
            var gifImage = $("<img class='gif'>");
     
            gifImage.attr("src", gifUrl);
  
  
            $("#images").prepend(gifImage);
  
  
  
  
  
  
            // Creating a paragraph tag with the result item's rating
            if (results[i].rating != "r" && results[i].rating != "pg-13") {
              var gifDiv = $("<div>");
              // Storing the result item's rating
              // var rating = results[i].rating;
              // var p = $("<p>").text("Rating: " + rating);
              // Setting the src attribute of the image to a property pulled off the result item
              // gifys.attr("src", results[i].images.fixed_height.url);
              // gifDiv.append(p);
              // gifDiv.append(gifys);
              // $("#images").prepend(gifys);
              
            };
          };
  
          $("#add-movie").on("click", function (event) {
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
            event.preventDefault();
            // This line will grab the text from the input box
            var gify = $("#gify-input").val().trim();
            gifys.push(gify);
  
          });
  
        });
    });
  
  });
  