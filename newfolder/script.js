const APIKEY = "e9069302849505b59e7558af585d1ff4";
console.log("APIKEY:", APIKEY);
let baseURL = "https://api.themoviedb.org/3/";
let moviesArray;
let editIndex;

// THIS FUNCTION WILL BE CALLED  VIEW IS INITIATED
let runSearch = function() {
  urrls =
    "https://api.themoviedb.org/3/discover/movie?api_key=e9069302849505b59e7558af585d1ff4&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=2&primary_release_year=2018&vote_count.gte=100";
  fetch(urrls)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      console.log("ORIGNAL JSON DATA", data);
      moviesArray = data;
      showMovies(data);
    })
    .catch(function(err) {
      alert("Problem Occured while fetching!!", err);
    });
};
// TO SHOW FIRST PAGE
function showMovies(data) {
  var x = document.getElementById("page1");
  var y = document.getElementById("page2");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  var display = [];
  for (i = 10; i < 20; i++) {
    display += `<div class="movieBox">
        <img
          class="movieImg"
          src="https://image.tmdb.org/t/p/w154/${data.results[i].poster_path}"
          alt="${data.results[i].title}"
        /><div class="middle">
              <button class="editBtn" onclick="edit(${i})">EDIT</button>
            </div>
        <p class="movieName">${data.results[i].title}</p>
        <p class="movieYear">${data.results[i].release_date}</p>
      </div>`;
  }
  document.getElementById("output").innerHTML = display;
}
// SECOND PAGE DISPLAY
function nextPage() {
  window.scrollTo(0, 0);
  switchViews();
  var display = [];
  for (i = 0; i < 10; i++) {
    display += `<div class="movieBox">
        <img
          class="movieImg"
          src="https://image.tmdb.org/t/p/w154/${
            moviesArray.results[i].poster_path
          }"
          alt="${moviesArray.results[i].title}"
        /><div class="middle">
              <button class="editBtn" onclick="edit(${i})">EDIT</button>
            </div>
        <p class="movieName">${moviesArray.results[i].title}</p>
        <p class="movieYear">${moviesArray.results[i].release_date}</p>
      </div>`;
  }
  document.getElementById("output2").innerHTML = display;
}
// FOR SWITCHING VIEWS
function switchViews() {
  var x = document.getElementById("page1");
  var y = document.getElementById("page2");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}

// SEARCH MOVIES
function searchMovie(mName) {
  window.scrollTo(0, 0);
  let url = "".concat(
    baseURL,
    "search/movie?api_key=",
    APIKEY,
    "&query=",
    mName
  );
  var x = document.getElementById("page1");
  var y = document.getElementById("page2");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  }
  fetch(url)
    .then(function(result) {
      return result.json();
    })
    .then(function(data) {
      console.log("ORIGNAL JSON DATA", data);
      moviesArray = data;
      var display = [];

      for (i = 0; i < 10; i++) {
        display += `<div class="movieBox">
        <img
          class="movieImg"
          src="https://image.tmdb.org/t/p/w154/${data.results[i].poster_path}"
          alt="${data.results[i].title}"
        /><div class="middle">
              <button class="editBtn" onclick="edit(${i})">EDIT</button>
            </div>
        <p class="movieName">${data.results[i].title}</p>
        <p class="movieYear">${data.results[i].release_date}</p>
      </div>`;
      }
      document.getElementById("output").innerHTML = display;
    })
    .catch(function(err) {
      alert("please enter Movie Name Correctly!!", err);
    });
}
// EDIT SECTION
function edit(i) {
  editIndex = i;
  window.scrollTo(0, 0);
  var a = document.getElementById("container");
  var b = document.getElementById("editDetails");
  a.classList.add("blurContainer");
  b.classList.add("editaible");
}
function closeEdit() {
  var a = document.getElementById("container");
  var b = document.getElementById("editDetails");
  a.classList.remove("blurContainer");
  b.classList.remove("editaible");
}
function addSubmit(x, y) {
  var x = document.getElementById("input1").value;
  var y = document.getElementById("input2").value;
  console.log(x, y);
  moviesArray.results[editIndex].title = x;
  moviesArray.results[editIndex].release_date = y;
  console.log(moviesArray);
  showMovies(moviesArray);
}
document.addEventListener("DOMContentLoaded", runSearch);
