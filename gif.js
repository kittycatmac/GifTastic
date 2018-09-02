    var feelings = ["grumpy", "goofy", "mad", "lonely"];

    function searchGif() {
        var emotions = $(this).attr("data-emotions");
        //queryURL for Giphy API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotions + "&api_key=dc6zaTOxFJmzC";

        //AJAX call
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            //storing an array of results in the results var
            var results = response.data;
            //looping over every result item
            for (var i = 0; i < results.length; i++) {
                //only getting pg rating gifs
                if(results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    //creates div with class "feelItem"
                    var gifNew = $("<div class='feelItem'>");
                    //store the result item rating
                    var rating = results[i].rating;
                    //new P tag with result item rating
                    var p = $("<p>").text("Rating: " + rating);
                    //create image tag and adding a source attr of property from the result item
                    var emotionalImage = $("<img>").attr("src", results[i].images.fixed_height.url);
                     //adding to gifNew 
                    gifNew.append(p);
                    gifNew.append(emotionalImage);
                    //prepending the gifNew to the "#gif-here" div in the HTML
                    $("#gif-here").prepend(gifNew);
                }
            }
        });
    }
    //loops gif through added buttons from array
    function renderButtons() {
        $("#buttons-view").empty();
        for (var j = 0; j < feelings.length; j++) {
            var a = $("<button>");
            a.addClass("feeling-btn");
            a.attr("data-emotions", feelings[j]);
            a.text(feelings[j]);
            $("#buttons-view").append(a);
        }
    }

    //this function handles events with input push into array and when GO! button is clicked
    $("#add-feeling").on("click", function(event) {
        event.preventDefault();
        var feeling = $("#feeling-input").val().trim();
        feelings.push(feeling);
        renderButtons();
    });

    $(document).on ("click", ".feeling-btn", searchGif);
    renderButtons();

    $(".feelItem").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });