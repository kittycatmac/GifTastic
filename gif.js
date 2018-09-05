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
                    var emotionalImage = $("<img class='gif'>").attr("src", results[i].images.fixed_height.url);
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

	//This funciton allows the user to play and stop each gif on user click
	/*$("body").on("click", ".feelItem", function() {
		var src = $(this).attr("src");

		if($(this).hasClass("play")){
			//Stop the gif animation
			$(this).attr("src", src.replace(images.fixed_height.url, "images.fixed_height_still.url"));
			$(this).removeClass("play");
		} else {
			//Play the gif animation
			$(this).addClass("play");
			$(this).attr("src", src.replace(images.fixed_height_still.url, "images.fixed_height.url"));
		}

    });    
    //$('.gif').gifplayer();
    /*jQuery("#gif-here").after( function() {

        // keep ref to the image
          var image = this;
      
          // add div container for the link
          var $d = jQuery("<div />");
          var $d = $(".feelItem");
      
          // add link
          var $a = jQuery("<a>Start / Stop animation</a>");
          $d.append($a);
      
          // add click event
          $a.on("click", function() { 
      
              // get the src of the image
              var src = jQuery(image).attr("src");
      
              // change the image
              if(jQuery(src.split("_")).last()[0] == "still.gif")
                  jQuery(image).attr('src', src.replace('_still.gif', '.gif'));
              else
                  jQuery(image).attr('src', src.replace('.gif', '_still.gif'));
              
          })
          return $d;
      
      });

    /*$(".feelItem").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        /*var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr(fixed_height));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr(fixed_height_still));
          $(this).attr("data-state", "still");
          }
        });*/
        /*var still = ;
        var animate = $("<img>").attr("src", results[i].images.fixed_height.url);
        if (emotionalImage === still) {
            $(this).attr("src", $(this).attr(animate));
        } else {
            $(this).attr("src", $(this).attr(still));
        }
        console.log(this);*/
    /*});
    /*imgOn = gifNew;
    imgOff = gifNew;
    imgOn.src = "anim.gif";
    imgOff.src = "still.gif";*/
