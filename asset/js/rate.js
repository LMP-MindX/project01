
if (typeof API_KEY === 'undefined') {
  var API_KEY = '...'; 
}

const topRatedList = document.getElementById('topRatedList');

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    if (!movies || movies.length === 0) {
      topRatedList.innerHTML = '<p>where?</p>';
      return;
    }

    movies.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'col-md-3 mb-4';
      movieCard.innerHTML = `
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">Rating: ${movie.vote_average}</p>
          </div>
        </div>
      `;
      topRatedList.appendChild(movieCard);
    });
  })
  .catch(error => {
    console.error('Lỗi khi tải phim:', error);
    topRatedList.innerHTML = '<p>Lỗi khi tải phim.</p>';
  });
