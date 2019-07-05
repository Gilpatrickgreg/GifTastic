$(document).ready(function() {
    //declaring variable topics to hold array of strings
    var topics = ["Fight Club", "Mr Nobody", "The Lion King", "The Matrix"];
  //adds strings from topics variable and makes them buttons
    addButtons();

    //Event listener on movie button then "GETs" movietitle data
    $("#movieButtons").on("click", "button", function() {
        //declaring variable stores url string to giphy api movie videos
        var movieTitle = $(this).text();
        movieTitle = movieTitle.replace(/ /gi, '+'); // regular expression that swaps spaces for places
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieTitle + "&api_key=QolTBQ8FTPvrvBIET57rJtAoNrGANN9h&limit=10";
        
        console.log(queryURL)
        //sending a request to the url stored in the queryUrl variable
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
          //declaring a promise for the result of the ajax request
          .then(function(response) {
            var results = response.data;
            console.log(response.data)
            for (var i = 0; i < results.length; i++){

                var gifDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gifImage = $("<img>");
        
            
            gifImage.attr("src", results[i].images.fixed_height_still.url)
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $("#images").prepend(gifDiv);
            }
        }); 
          
      });

      $(".gif").on("click", "img", function() {
        var state = $(this).attr("data-state");
        console.log(state)
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    
      });

      $("#submit").click( function(event) {
        event.preventDefault();
        $("#movieButtons").empty()
        var addedtitle = $("#movie-input").val()
        topics.push(addedtitle)
        addButtons()
        clear()
    });
     

      function addButtons () {
        for (var i = 0; i < topics.length; i++) {
          $("#movieButtons").append( "<button>" + topics[i] + "</button>");
          
        }
      };

      function clear() {
        $('input[type="text"]').val('');
        $('#movie-input').val('');
    };







    







});