const APIKEY = "e9069302849505b59e7558af585d1ff4";
console.log("APIKEY:", APIKEY);
let baseURL = "https://api.themoviedb.org/3/";
let moviesArray = [];
let editIndex;
var count = 0;
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
      showMovies(moviesArray, "output", 10, 20);
    })
    .catch(function(err) {
      alert("Problem Occured while fetching!!", err);
    });
};
// TO SHOW FIRST PAGE
function showMovies(data, onDiv, from, to) {
  var display = [];
  for (i = from; i < to; i++) {
    display += `<div class="movieBox">
        <img
          class="movieImg"
          src="https://image.tmdb.org/t/p/w154/${data.results[i].poster_path}"
          alt="${data.results[i].title}"
        /><div class="middle">
              <button class="editBtn" onclick="editMovie(${i})">EDIT</button>
              <button class="editBtn" onclick="deleteMovie(${i})">DELETE</button>
            </div>
        <p class="movieName">${data.results[i].title}</p>
        <p class="movieYear">${data.results[i].release_date}</p>
      </div>`;
  }
  document.getElementById(`${onDiv}`).innerHTML = display;
}
// SECOND PAGE DISPLAY
function nextPage() {
  window.scrollTo(0, 0);
  switchViews();
  showMovies(moviesArray, "output2", 0, 10);
}
// FOR SWITCHING BETWEEN PAGES
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
// FOR SEARCHING MOVIES
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
      showMovies(moviesArray, "output", 10, 20);
    })
    .catch(function(err) {
      alert("please enter Movie Name Correctly!!", err);
    });
}
// TO EDIT THE MOVIES TITLE AND DATE
function editMovie(i) {
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
function editSubmit(x, y) {
  var x = document.getElementById("input1").value;
  var y = document.getElementById("input2").value;
  moviesArray.results[editIndex].title = x;
  moviesArray.results[editIndex].release_date = y;
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
  closeEdit();
  if (editIndex < 10) {
    showMovies(moviesArray, "output2", 0, 10 - count);
  } else {
    showMovies(moviesArray, "output", 10, 20 - count);
  }
}
// FOR MOVIE DELETION
function deleteMovie(i) {
  moviesArray.results.splice(i, 1);
  count = count + 1;
  if (editIndex < 10) {
    showMovies(moviesArray, "output2", 0, 10 - count);
  } else {
    showMovies(moviesArray, "output", 10, 20 - count);
  }
}
document.addEventListener("DOMContentLoaded", runSearch);
