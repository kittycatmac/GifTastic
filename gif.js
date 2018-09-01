    $("button").on("click", function() {
        var emotions = $(this).attr("data-emotions");
    
    //queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotions + "&api_key=dc6zaTOxFJmzC";

    //AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        //storing an array of results in the results var
        var results = response.data;

        //looping every result item
        for (var i = 0; i < results.length; i++) {
            //only getting pg 13 rating gifs
            if(results[i].rating !== "r" && results[i].rating !== "pg-13") {
                //creates div with class "feelItem"
                var gifNew = $("<div class='feelItem'>");
                //store the result item rating
                var rating = results[i].rating;
                //new P tag with result item rating
                var p = $("<p>").text("Rating: " + rating);
                //create image tag
                var emotionalImage = $("<img>");
                //adding a source attr of property from the result item
                emotionalImage.attr("src", results[i].images.fixed_height.url);
                //adding to gifNew 
                gifNew.append(p);
                gifNew.append(emotionalImage);
                //prepending the gifNew to the "#gif-here" div in the HTML
                $("#gif-here").prepend(gifNew);
            }
        }
    });
    });