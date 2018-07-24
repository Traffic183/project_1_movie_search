$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = ($('#searchText').val());
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com?s=' + searchText + '&apikey=a84761b6')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
     
        <div class="card-deck">
          <div class="card">
            <div class="text-center">
              <img src="${movie.Poster}">
              <div class="card-body p-2">
              <span id="mvTitle">${movie.Title}</span>
              </div>
            <div class="card-footer">
            <button onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" id="footerBtn" href="#">Movie Details</button>
            </div>
          </div>
        </div>
      </div>
    `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
 }

 function movieSelected(id){
   sessionStorage.setItem('movieId',id);
 window.location = 'movie.html';
  return false;
 }

function getMovie(){
let movieId = sessionStorage.getItem('movieId');

axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=a84761b6')
.then((response) => {
console.log(response);
let movie = response.data;


let output =`
<div class="container" id="movieStats">
  <div class="row">
    <div class="col-md-4">
      <img src="${movie.Poster}" class="thumbnail pt-3">
    </div>
    <div class="col-md-8">

    <h2>${movie.Title}</h2>

    <ul class="list-group">
      <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
      <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
      <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
      <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
      <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
      <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
      <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
    </ul>
   
  </div>
</div>

<div class="row">
  <div class="container pt-3 pb-3" id="moviePlot">
    <h4>Plot</h4>
      ${movie.Plot}
      <hr>
       <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-default">Go Back to Search</a>
      </div>
    </div>
    </div>
    </div>
   `;

 $('#movie').html(output);

})
.catch((err) => {
  console.log(err);
  });  
}

getMovie();

