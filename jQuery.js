$(function(){
	let popularMovies = $("#popular");
   	let imgUrl = `https://image.tmdb.org/t/p/w400/`;

	$.ajax({
		url: "https://api.themoviedb.org/3/movie/popular?api_key=6103f928103518e6b9b7a0280f0f9a28&language=en-US&page=1",
		dataType: "json"
	}).done(function(data){
		let html = "";
		//first, build the top movie display with additional info
		html += `<section id="featured"><h3>${data.results[0].title}</h3><img src="${imgUrl}${data.results[0].poster_path}" alt=""><p>"${data.results[0].overview}"</p></section>`;
		//then, display the rest of the movie posters with titles in the top 20
		for(let i = 1; i < 20; i++){
			html += `<section class="movie"><img src="${imgUrl}${data.results[i].poster_path}" alt=""><button class="details"><span class="arrow"></span></button><div><h3>${data.results[i].title}</h3><p>${data.results[i].overview}<span class="vote">Vote Average: ${data.results[i].vote_average}</span></p></div></section>`; 
		}
      	popularMovies.html(html);
		//handles the functionality that will hide/show movie details on button click, needs to be added inside here so that the content loads before trying to attach the handlers
		$(".details").on("click", function(e){
			$(e.target).next("div").slideToggle();
			$(e.target).children(".arrow").toggleClass("opened");
		});
		//hide all of the movie details by default on page load
		$(".movie div").hide();
	}).fail(function(jqXHR){
		popularMovies.html("There was a problem with the movie database");
	});
});

$("#yearBtn").on("click", function(e){
	e.preventDefault();

	let year = encodeURIComponent($("#userYear").val());
   	let birthYearMovies = $("#birthYear");
   	
	if(year < 1940 || year > 2021){
		birthYearMovies.html("<p style= ' color:red;background-color:white; '>Please enter a year between 1940 and 2021</p>");
	}else{
		let beginUrl = `https://api.themoviedb.org/3/discover/movie?api_key=6103f928103518e6b9b7a0280f0f9a28&primary_release_year=`;
		let endUrl = `&sort_by=revenue.desc&language=en-US&page=1&include_adult=false`;
		let imgUrl = `https://image.tmdb.org/t/p/w400/`;

		$.ajax({
			url: `${beginUrl}${year}${endUrl}`,
			dataType: "json"
		}).done(function(data){
			let html = "";
			for(let i = 0; i < 12; i++){
				if(data.results[i].poster_path === null){
					//original functionality showed a crappy rectangle when there was no poster, now we're just going to skip displaying those

					// html += "<p>There is no poster image for this film.<br><span>" + data.results[i].title + "</span></p>";
					//skip any movies without a poster
					i++;
					continue;
				}else{
					html += `<section class="yrMovie"><img src="${imgUrl}${data.results[i].poster_path}" alt=""><h3>${data.results[i].title}</h3></section>`; 
				}
			}
			birthYearMovies.html(html);
		
		}).fail(function(){
			birthYearMovies.html("There was a problem with the movie database");
		});	
	}
});

//creates the custom number spinner in the form using a jQuery widget
$("#userYear").spinner({
	classes:{
		"ui-spinner": "numSpinner",
		"ui-spinner-down": "spinnerDown",
		"ui-spinner-up": "spinnerUp"
	}
});
