var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var nytUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa';

console.log(googUrl);
console.log(nytUrl);



$(document).ready(function() {
    retrieveGenres();
    retrieveTrending();
});

$(function () {
    var auth = $("#author-search");
    auth.on("change", authSearch);
    var genre = $("#genre-dropdown");
    genre.on("change", genreSearch);
    var trend = $("#trend-dropdown");
    trend.on("change", trendSearch);
    
});

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
if (typeof(Storage) !== 'undefined') {
// retrieve local stored favorites if there are any
    var storedFavorites = localStorage.getItem('favorites');

// now checking if there is stored favorites, gonna parse the JSON string and use it
    if (storedFavorites) {
        var favorites = JSON.parse(storedFavorites);
// if no stored favorites then store in empty array that is created "favorites = []"
    } else {
        var favorites = [];
    }
}     else {
//  if not supported send alert to let them know
        alert('Sorry, your browser does not support local storage');
}



// we have our favorites array we should be able to use it and store it into the favorite html where it displays in a card, or list somehow?
$(document).ready(function() {
    $('.favorites-btn').on('click', function(event) {
    event.preventDefault(); 
    
    var itemId = $(this).data('id');

    var index = favorites.indexOf(itemId);
    if (index === -1) {
// checking to see if item is already in favorites, if not then we'll add it the array
    favorites.push(itemId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    $(this).addClass('active');
    }
    else {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    $(this).removeClass('active');
    }
});
});

// with the link to favorites page with a class and using a method chaining for this function
$(document).ready(function() {
    $('.favorites-link').on('click', function(event) {
    event.preventDefault();

    var storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        var favorites = JSON.parse(storedFavorites);

        var $ul = $('<ul>');
        favorites.forEach(function(itemId) {
            var $li = $('<li>').text(itemId);
            $ul.append($li);
        })
    }
}
)})


// when other page loads retrieve from local sotrage

function callGoogle(searchWords) {
    searchWords = searchWords.replace(/\s+/g, '+').toLowerCase();
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + searchWords + "&maxResults=5&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas",
        dataType: "json",
        success: function (result) {
            var authBookList = null;
            var items = null;
            console.log("result " + result);
            authBookList = $("#auth-book-list");
            items = result["items"]
            authBookList.empty()
            var favorites = [];
            var testobj = {
                // make sure to change this array to not just be the first book chosen
                title: items[0].volumeInfo.title,
                author: searchWords,
                image: items[0].volumeInfo.imageLinks?.smallThumbnail
            };
                favorites.push(testobj);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            items.forEach(item => {
                var image  = "";
                if(item["volumeInfo"]["imageLinks"]) {
                    image = `<img src='${item["volumeInfo"]["imageLinks"]["smallThumbnail"]}' height="60"></img>`
                }
                authBookList.append(`<div class='auth-book'>${item["volumeInfo"]["title"]} ${image}</div>`
            )}
        )},
        error: function (xhr, status, error) {
            console.error("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
        }
    )
}

function retrieveGenres() {
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result, status, xhr) {
            var genreList = $("#genre-dropdown");
            var genres = result["results"]
            genreList.empty();
            genreList.append('<option disabled selected value="">Select...</option>')
            genres.forEach(genre => {
                genreList.append(`<option value="${genre["list_name_encoded"]}">
                            ${genre["list_name_encoded"]}
                    </option>`
                        );
                 
            });
            
        },
    
    }  
    )
    }

    function retrieveTrending() {
        $.ajax({
            type: "GET",
            url: "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
            dataType: "json",
            success: function (result, status, xhr) {
                var trendingList = $("#trend-dropdown");
                var trending = result["results"]
                trendingList.empty();
                trendingList.append('<option disabled selected value="">Select...</option>')
                trending.forEach(trend => {
                    trendingList.append(`<option value="${trend["list_name_encoded"]}">
                                ${trend["list_name_encoded"]}
                        </option>`
                            );
                     
                });
                $('select').material_select();
            },
        
        }  
        )
        }

    function callNYTG(searchWords) {
        searchWords = searchWords.replace(/\s+/g, '-').toLowerCase();
        $.ajax({
            type: "GET",
            url: "https://api.nytimes.com/svc/books/v3/lists/current/" + searchWords + ".json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
            dataType: "json",
            success: function (result) {
                var BookList = null;
                var items = null;
                console.log("result " + result);
                BookList = $("#genre-book-list");
                items = result["results"]["books"]
                BookList.empty()
                for (let i = 0; i < 5; i++) {
                    var item = items[i]              
                    var image  = "";
                    if(item["book_image"]) {
                        image = `<img src='${item["book_image"]}' height="60"></img>`
                    }
                    BookList.append(`<div class='genre-book'>${item["title"]} ${image}</div>`)
                }
            },
            error: function (xhr, status, error) {
                console.error("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
            }
            }
        )
    }

    function callNYTT(searchTrending) {
        searchTrending = searchTrending.replace(/\s+/g, '-').toLowerCase();
        console.log(searchTrending);
             $.ajax({
            type: "GET",
                url: "https://api.nytimes.com/svc/books/v3/lists/current/" + searchTrending + ".json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
                dataType: "json",
                success: function (result) {
                    var BookList = null;
                    var items = null;
                    console.log("result " + result);
                    BookList = $("#trending-book-list");
                    items = result["results"]["books"]
                    BookList.empty()
                    for (let i = 0; i < 5; i++) {
                        var item = items[i]              
                        var image  = "";
                        if(item["book_image"]) {
                            image = `<img src='${item["book_image"]}' height="60"></img>`
                        }
                        BookList.append(`<div class='trending-book'>${item["title"]} ${image}</div>`)
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                }
                }
            )
        }
    

