// have our two API's one from google books, and one from New York Times book API
var googUrl =
  "https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas";

var nytUrl =
  "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=HXC2XdDqarvPlDkZsP03TlD1AVWGZfbU";

console.log(googUrl);
console.log(nytUrl);

$(document).ready(function () {
  retrieveGenres();
});
// Function to set up listeners for the two drop downs and the search for author. Once the user changes the selected option it will trigger the corresponding function to execute the search.
$(function () {
  var auth = $("#author-search");
  auth.on("change", authSearch);
  var genre = $("#genre-dropdown");
  genre.on("change", genreSearch);
  var trend = $("#trend-dropdown");
  trend.on("change", trendSearch);
});
//  Three functions that are called once the user selects an option from any of the three choices.
function authSearch() {
  callGoogle($(this).val());
}

function genreSearch() {
  callNYTG($(this).val());
}

function trendSearch() {
  callNYTT($(this).val());
}

// favorites page local storage code
var myData = localStorage.getItem("myData");
var myDataObject = JSON.parse(myData);

//  checking if local storage is supported by used browser
if (typeof Storage !== "undefined") {
  // retrieve local stored favorites if there are any
  var storedFavorites = localStorage.getItem("favorites");

  // now checking if there is stored favorites, gonna parse the JSON string and use it
  if (storedFavorites) {
    var favorites = JSON.parse(storedFavorites);
    // if no stored favorites then store in empty array that is created "favorites = []"
  } else {
    var favorites = [];
  }
} else {
  //  if not supported send alert to let them know
  alert("Sorry, your browser does not support local storage");
}

// This function is telling JQuery to wait until the document is fully loaded before executing the code inside the function, this way we avoid errors due to missing or incomplete elements.
$(document).ready(function () {
  $(".favorites-btn").on("click", function (event) {
    event.preventDefault();

    var itemId = $(this).data("id");

    var index = favorites.indexOf(itemId);
    if (index === -1) {
      // We're pushing favorites into itemId and saving favorites into local storage and stringify the results
      favorites.push(itemId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      $(this).addClass("active");
    } else {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      $(this).removeClass("active");
    }
  });
});

// Again once the function is executed once document is fully loaded and preventing default behaivor.
$(document).ready(function () {
  $(".favorites-link").on("click", function (event) {
    event.preventDefault();
    // This retrieves the value of 'favorites' key from local and stores it inside storedFavorites.
    var storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      var favorites = JSON.parse(storedFavorites);
      // We then create a new UL and the store it inside the $UL li.
      var $ul = $("<ul>");
      favorites.forEach(function (itemId) {
        var $li = $("<li>").text(itemId);
        $ul.append($li);
      });
    }
  });
});

// This function is using Ajax request to the Google API with a search for books by authors formatted to a string. This also has a save button so we can let a person pick favorites and store to the favorites page through local storage.
function callGoogle(searchWords) {
  searchWords = searchWords.replace(/\s+/g, "+").toLowerCase();
  $.ajax({
    type: "GET",
    url:
      "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
      searchWords +
      "&maxResults=5&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas",
    dataType: "json",
    success: function (result) {
      var authBookList = null;
      var items = null;

      console.log("result " + result);
      authBookList = $("#auth-book-list");
      items = result["items"];
      authBookList.empty();
      items.forEach((item) => {
        var image = "";
        var title = item["volumeInfo"]["title"];
        var imgLink = "";
        if (item["volumeInfo"]["imageLinks"]) {
          imgLink = item["volumeInfo"]["imageLinks"]["smallThumbnail"];
          image = `<img src='${imgLink}' height="60"></img>`;
        }
        var div = $("<div/>").addClass("auth-book");
        div.append(
          `<img class="save-img" src="assets/images/save-32.png" height="16" /><a href="${item["volumeInfo"]["canonicalVolumeLink"]}" target="_blank">${title}</a> ${image}`
        );
        var chad = div.children("img.save-img");
        chad.on("click", function () {
          saveBook(title, imgLink);
        });
        authBookList.append(div);
      });
    },

    error: function (xhr, status, error) {
      console.error(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
}
// This function is used to save a local storage as favorites including title and img of the book. If there already is stored favorites checking if it's truthy if it is we then parse into favorites. It will then dipsplay as a string in local storage.
function saveBook(book, image) {
  var storedFavorites = localStorage.getItem("favorites");

  if (storedFavorites) {
    var favorites = JSON.parse(storedFavorites);
  } else {
    var favorites = {};
  }
  favorites[book] = image;
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// This function uses Ajax call to NYT API to retrieve a list of book genres and appends each one as a option to the dropdown list genre and also the top trending dropdown list. At the end we have a call to initialize Materialize for all the dropdowns so they can be styled.
function retrieveGenres() {
  $.ajax({
    type: "GET",
    url: "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=HXC2XdDqarvPlDkZsP03TlD1AVWGZfbU",
    dataType: "json",
    success: function (result, status, xhr) {
      var genreList = $("#genre-dropdown");
      var genres = result["results"];
      genreList.empty();
      genreList.append('<option disabled selected value="">Select...</option>');
      genres.forEach((genre) => {
        genreList.append(`<option value="${genre["list_name_encoded"]}">
                            ${genre["list_name_encoded"]}
                    </option>`);
      });
      var trendingList = $("#trend-dropdown");
      var trending = result["results"];
      trendingList.empty();
      trendingList.append(
        '<option disabled selected value="">Select...</option>'
      );
      trending.forEach((trend) => {
        trendingList.append(`<option value="${trend["list_name_encoded"]}">
                            ${trend["list_name_encoded"]}
                    </option>`);
      });
      $("select").material_select();
    },
  });
}

// This makes a call to Ajax to NYT API to get a list of books based on search of the user, then retrieves the data from results and appends it to genre drop down then a new div is created with img title and a save button. If there is an error an message is logged to the console.
function callNYTG(searchWords) {
  searchWords = searchWords.replace(/\s+/g, "-").toLowerCase();
  $.ajax({
    type: "GET",
    url:
      "https://api.nytimes.com/svc/books/v3/lists/current/" +
      searchWords +
      ".json?api-key=HXC2XdDqarvPlDkZsP03TlD1AVWGZfbU",
    dataType: "json",
    success: function (result) {
      var BookList = null;
      var items = null;
      console.log("result " + result);
      BookList = $("#genre-book-list");
      items = result["results"]["books"];
      BookList.empty();
      var range = [0, 1, 2, 3, 4];
      range.forEach((i) => {
        var item = items[i];
        var image = "";
        var imgLink = item["book_image"];
        var title = item["title"];
        if (imgLink) {
          image = `<img src='${imgLink}' height="60"></img>`;
        }
        var div = $("<div/>").addClass("genre-book");
        div.append(
          `<img class="save-img" src="assets/images/save-32.png" height="16" /><a href="${item["amazon_product_url"]}" target="_blank">${title}</a> ${image}`
        );
        var chad = div.children("img.save-img");
        chad.on("click", function () {
          saveBook(title, imgLink);
        });
        BookList.append(div);
      });
    },
    error: function (xhr, status, error) {
      console.error(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
}

// This is using call to the Jquery library to use Ajax call to NYT API to get a list of books based on search trending drop down. Again retrieving the list of books and diplaying title img to a div being created and again saving favorite book is used here again. And last if errors happen it will log to the console.
function callNYTT(searchTrending) {
  searchTrending = searchTrending.replace(/\s+/g, "-").toLowerCase();
  console.log(searchTrending);
  $.ajax({
    type: "GET",
    url:
      "https://api.nytimes.com/svc/books/v3/lists/current/" +
      searchTrending +
      ".json?api-key=HXC2XdDqarvPlDkZsP03TlD1AVWGZfbU",
    dataType: "json",
    success: function (result) {
      var BookList = null;
      var items = null;
      console.log("result " + result);
      BookList = $("#trending-book-list");
      items = result["results"]["books"];
      BookList.empty();
      var range = [0, 1, 2, 3, 4];
      range.forEach((i) => {
        var item = items[i];
        var image = "";
        var imgLink = item["book_image"];
        var title = item["title"];
        if (imgLink) {
          image = `<img src='${imgLink}' height="60"></img>`;
        }
        var div = $("<div/>").addClass("trend-book");
        div.append(
          `<img class="save-img" src="assets/images/save-32.png" height="16" /><a href="${item["amazon_product_url"]}" target="_blank">${title}</a> ${image}`
        );
        var chad = div.children("img.save-img");
        chad.on("click", function () {
          saveBook(title, imgLink);
        });
        BookList.append(div);
      });
    },
    error: function (xhr, status, error) {
      console.error(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
}
