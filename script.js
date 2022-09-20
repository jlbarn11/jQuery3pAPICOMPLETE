function getPopularMovies() {
   let url = "https://api.themoviedb.org/3/movie/popular?api_key=6103f928103518e6b9b7a0280f0f9a28&language=en-US&page=1";
   let popularMovies = document.getElementById("popular");
   let imgUrl = "https://image.tmdb.org/t/p/w400/";

   let xhr = new XMLHttpRequest();

   xhr.addEventListener("readystatechange", function(){
   		if (this.readyState === this.DONE) {
   			let json = this.response;

	   		let html = "";
			for(let i = 0; i < 4; i++){
				html += "<figure><img src = " + imgUrl + json.results[i].poster_path + "><figcaption>" + json.results[i].title + "</figcaption></figure>"; 
			}
	      	popularMovies.innerHTML = html;
	    } else {
	      popularMovies.innerHTML = "There was a problem with the movie database";
	    }
   });

   xhr.responseType = "json";
   xhr.open("GET", url);
   xhr.send();
}

function getBirthYearMovies(e){
	e.preventDefault();
	let year = encodeURI(document.getElementById("userYear").value);
   	let birthYearMovies = document.getElementById("birthYear");
	if(year < 1940 || year > 2021){
		birthYearMovies.innerHTML = "<p style= ' color:red;background-color:white; '>Please enter a year between 1940 and 2021</p>";
	}else{
		let beginUrl = "https://api.themoviedb.org/3/discover/movie?api_key=6103f928103518e6b9b7a0280f0f9a28&primary_release_year=";
		let query = encodeURI(year);
		let endUrl = "&sort_by=revenue.desc&language=en-US&page=1&include_adult=false";
		let url = `${beginUrl}${query}${endUrl}`;
	   	let imgUrl = "https://image.tmdb.org/t/p/w400/";
		
		let xhr = new XMLHttpRequest();

	   xhr.addEventListener("readystatechange", function(){
	   		if (this.readyState === this.DONE) {
	   			let json = this.response;

		   		let html = "";
				for(let i = 0; i < 4; i++){
					if(json.results[i].poster_path === null){
						html += "<p>There is no poster image for this film.<br><span>" + json.results[i].title + "</span></p>";
					}else{
						html += "<figure><img src = " + imgUrl + json.results[i].poster_path + "><figcaption>" + json.results[i].title + "</figcaption></figure>"; 
					}
				}
		      	birthYearMovies.innerHTML = html;
		    } else {
		      birthYearMovies.innerHTML = "There was a problem with the movie database";
		    }
	   });

	   xhr.responseType = "json";
	   xhr.open("GET", url);
	   xhr.send();
	}
}



$(function(){
	getPopularMovies();
	document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);
});