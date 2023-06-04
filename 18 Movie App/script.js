const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=07198416ca585d7ac676fb70446027b0&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=07198416ca585d7ac676fb70446027b0&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const backButton = document.getElementById("backButton");

// let isHomePage = true;
// let searchedTerm = "";

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;

    main.appendChild(movieEl);
  });

  isHomePage = false;
  backButton.style.display = "block";
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  }
});

// Add separate event listener for the search button
search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});

backButton.addEventListener("click", () => {
  if (!isHomePage) {
    isHomePage = true;
    searchedTerm = "";
    getMovies(API_URL);
    // backButton.style.display = "none";
  }
});
