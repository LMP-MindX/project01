
const API_KEY = "bcf849bb5807afe2b08950d752e01160";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const imgBaseUrl = "https://image.tmdb.org/t/p/w500";
const container = document.querySelector(".popular_film");

async function loadPopularMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const movies = data.results;

    let html = '<h1>Popular On Mindx Film</h1><div class="row">';

    movies.forEach(movie => {
      html += `
          <div class="col-6 col-sm-4 col-md-2 mb-4">
            <div class="card h-100 shadow">
              <img src="${imgBaseUrl + movie.poster_path}" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Rating: ${movie.vote_average}</p>
              </div>
            </div>
          </div>`;
    });

    html += '</div>';
    container.innerHTML = html;
  } catch (err) {
    console.error("Lỗi khi tải phim:", err);
    container.innerHTML = "<p>Không thể tải phim ngay lúc này.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadPopularMovies)
