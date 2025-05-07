const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

  
  const container = document.getElementById("movie-container");
  const searchInput = document.getElementById("search");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close-btn");
  const modalTitle = document.getElementById("modal-title");
  const modalRating = document.getElementById("modal-rating");
  const modalPoster = document.getElementById("modal-poster");
  const modalPrice = document.getElementById("modal-price");
  const buyBtn = document.getElementById("buy-btn");
  
  function displayMovies(movieList) {
    container.innerHTML = "";
    movieList.forEach((movie, index) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" />
        <div class="movie-info">
          <div class="movie-title">${movie.title}</div>
          <div class="movie-rating">⭐ ${movie.rating}</div>
        </div>
      `;
      movieEl.addEventListener("click", () => openModal(movie));
      container.appendChild(movieEl);
    });
  }
  
  function openModal(movie) {
    modal.style.display = "flex";
    modalTitle.textContent = movie.title;
    modalRating.textContent = `⭐ Rating: ${movie.rating}`;
    modalPrice.textContent = `💰 Price: ${movie.price}`;
    modalPoster.src = movie.poster;
    buyBtn.onclick = () => {
      alert(`Thank you for buying ${movie.title} for ${movie.price}!`);
    };
  }
  
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  
  // Get initial movies
  getMovies(API_URL)
  
  async function getMovies(url) {
      const res = await fetch(url)
      const data = await res.json()
  
      showMovies(data.results)
  }
  
  function showMovies(movies) {
      main.innerHTML = ''
  
      movies.forEach((movie) => {
          const { title, poster_path, vote_average, overview } = movie
  
          const movieEl = document.createElement('div')
          movieEl.classList.add('movie')
  
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
          `
          main.appendChild(movieEl)
      })
  }
  
  
  function getClassByRate(vote) {
      if(vote >= 8) {
          return 'green'
      } else if(vote >= 5) {
          return 'orange'
      } else {
          return 'red'
      }
  }
  
  form.addEventListener('submit', (e) => {
      e.preventDefault()
  
      const searchTerm = search.value
  
      if(searchTerm && searchTerm !== '') {
          getMovies(SEARCH_API + searchTerm)
  
          search.value = ''
      } else {
          window.location.reload()
      }
      searchInput.addEventListener("input", (e) => {
          const searchTerm = e.target.value.toLowerCase();
          const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
          );
          displayMovies(filtered);
        });
        
  })
  
  displayMovies(movies);
  window.onload = function () {
    document.getElementById('loginPopup').style.display = 'flex';
  };

  // Close popup on login
  function closeLogin() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
      alert("Please enter a username.");
      return;
    }
    document.getElementById('loginPopup').style.display = 'none';
  }

  // Buy movie action
  function buyMovie(movieName) {
    alert("You bought " + movieName + "!");
  }
  
  displayMovies(movies);
  