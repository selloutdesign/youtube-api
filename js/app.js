$(document).ready(function() {


	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    // $('.modal-trigger').leanModal();


    $('.modal-trigger').on('click', function(event) {
    	// event.preventDefault();
    	/* Act on the event */
    	$('#modal1').openModal();
    }); 

  $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBqXp0Uo2ktJcMRpL_ZwF5inLTWZfsCYqY', function(data){
    showResults(data);
  });


function showResults(results){
  $.each(results, function(index,value){
    console.log(value);
  });
}


	$("#youtube-api").submit(function(event) {
		/* Act on the event */
		event.preventDefault();
		$('.search-results').empty();
		var searchTerm = $('#search-term').val();
		
		getRequest(searchTerm);
	});


	// $.getJSON('http://www.omdbapi.com/?s=Star%20Wars&r=json', function(data) {
	// 		optional stuff to do after success 
	// 		var myData = data.Search;
	// 		showResults(data.Search);
			
	// });




	var showResultsNew = function(dataArr){
		$.each(dataArr, function(index, val) {
			  // iterate through array or object 
			  console.log(val.snippet.thumbnails.medium.url);
			 // $('#search-results').append('<div class="col s12 m4>' + val.snippet.channelTitle + '</div>')
			 // $(".search-results").append('<div class="col s12 m4">' + '<img src="' + val.snippet.thumbnails.medium.url + '" height="200" >' + '</div>');
				var html = "";
				var shtml = "";
				// Search Results
		        html+= '<div class="col s12 m4">';
		          html+= '<div class="card medium">';
		            html+= '<div class="card-image">';
		              html+= '<img src="' + val.snippet.thumbnails.medium.url + '">';
		              html+= '<span class="card-title">' + val.snippet.title + '</span>';
		            html+= '</div>';
		            html+= '<div class="card-content">';
		              html+= '<p>' + val.snippet.description + '</p>';
		              
		            html+= '</div>';
		            html+= '<div class="card-action">';
		              html += '<a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>';
		              html+= '<a href="https://www.youtube.com/watch?v=' + val.id.videoId + '" target="_blank">Watch</a>';
		            html+= '</div>';
		          html+= '</div>';
		        html+= '</div>';

		        // Modal Results
		                shtml += '<div id="modal1" class="modal bottom-sheet">';
				          shtml += '<div class="modal-content">';
				            shtml += '<h4>Modal Header</h4>';
				            shtml += '<p>A bunch of text</p>';
				          shtml += '</div>';
				          shtml += '<div class="modal-footer">';
				            shtml += '<a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>';
				          shtml += '</div>';
				        shtml += '</div>';


			$('.modal-section').append(shtml);
			 $('.search-results').append(html);
		});
	}

	function getRequest(searchTerm){
		var params ={
			part: 'snippet',
			key: 'AIzaSyCugrTGK0bxpfOkwjMsEE7P1p3stAl7G3Y',
			maxResults: 9,
			q: searchTerm
		};
		url = 'https://www.googleapis.com/youtube/v3/search';

		$.getJSON(url, params, function(json, textStatus) {
				/*optional stuff to do after success */
			console.log(json.items);
			showResultsNew(json.items);
			
		});	
		
	}

});