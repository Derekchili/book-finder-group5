var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var nytUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa';

console.log(googUrl);
console.log(nytUrl);

// fetches the google api and turns into a json response
function grabApi(googUrl) {
    fetch(googUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 })
    .then(function (data) {
        console.log('Fetch Response \n----------');
        console.log(data);
 });
}
grabApi(googUrl);

//  fetched the NYT api and turns into a json response
function grabApi2(nytUrl) {
    fetch(nytUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 })
 .then(function (data) {
    console.log('Fetch Response \n----------');
    console.log(data);

// we have to figure out how to get this info from the array bookList into the html element #trending maybe turn it into a button with some sort of list that diplays, I also got it to display images of the book too.
    var books = data.results.books;
    var bookList = [];

    for(var i = 0; i < books.length; i++) {
        var book = books[i];
        var bookTitle = book.title;
        var bookAuthor = book.author;
        var bookImgUrl = book.book_image;
        var bookInfo = '<img src="' + bookImgUrl + '"> ' + bookTitle + ' by ' + bookAuthor;
        bookList.push(bookInfo);
    }
    console.log(bookList);
})
}
grabApi2(nytUrl);

function callNYT(searchTrending) {
    searchTrending = searchTredning.replace(/\s+/g, '-').toLowerCase();
    console.log(searchTrending);
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/current/" + searchTrending + ".json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result) {
            console.log("result " + result);
        },
        
        
    });
}


function retrieveTrending() {
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/current.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result) {
            alert("result " + result);
            var topTrendList = $("#trending");
            var trending = result["results"]
            trending.forEach(trending => {
                topTrendList.append(`<option class="${trending["list_current_encoded"]}">
                ${trending["list_current_encoded"]}
        </option>`
                        );
                        bookList = result['results'];
                        console.log(bookList, 'bookList');
            });
        },
    
    }  
    )
    }

  



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



$(function () {
    var auth = $("#author-search");
    auth.on("change", authSearch);
    var genre = $("#genre-search");
    genre.on("change", genreSearch);
    var trend = $("#dropdown");
    trend.on("change", trendSearch);
    retrieveGenres();
});

function authSearch() {
    alert("test " + $(this).val());
    callGoogle($(this).val());
}

function genreSearch() {
    alert("test " + $(this).val());
    callNYT($(this).val());
}

function trendSearch() {
    alert("test " + $(this).val());
}

function callGoogle(searchWords) {
    searchWords = searchWords.replace(/\s+/g, '+').toLowerCase();
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + searchWords + "&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas",
        dataType: "json",
        success: function (result) {
            console.log("result " + result);
        },
        
        }
    )
}

function callNYT(searchGenres) {
    searchGenres = searchGenres.replace(/\s+/g, '-').toLowerCase();
    console.log(searchGenres);
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/current/" + searchGenres + ".json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result) {
            console.log("result " + result);
        },
        
        
    });
}

function retrieveGenres() {
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result, status, xhr) {
            alert("result " + result);
            var genreList = $("#dropdown");
            var genres = result["results"]
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


// // trying to create a function to grab the results from the bookList array and display it in a list on the page!?
// function renderBtn(){
//     if (bookList.length > 0) {
//       bookInfo(bookList[0])
//       for (let i = 0; i < bookList.length; i++) {
//         $(".trending-list").append(`<li><button class='listItem'>${bookListArr[i]}</button></li>`);
        
//       }
//     }
//     $('.listItem').on('click', function (event){
//       var clickTrending = $(event.target).text();
//       bookInfo(clickTrending);
//       console.log(clickTrending);
//     });
//   }
// renderBtn();

// // we have our favorites array we should be able to use it and store it into the favorite html where it displays in a card, or list somehow?
// $(document).ready(function() {
//     $('.favorites-btn').on('click', function(event) {
//     event.preventDefault(); 
    
//     var itemId = $(this).data('id');

//     var index = favorites.indexOf(itemId);
//     if (index === -1) {
// // checking to see if item is already in favorites, if not then we'll add it the array
//     favorites.push(itemId);
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     $(this).addClass('active');
//     }
//     else {
//     favorites.splice(index, 1);
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//     $(this).removeClass('active');
//     }
// });
// });

// // with the link to favorites page with a class and using a method chaining for this function
// $(document).ready(function() {
//     $('.favorites-link').on('click', function(event) {
//     event.preventDefault();

//     var storedFavorites = localStorage.getItem('favorites');
//     if (storedFavorites) {
//         var favorites = JSON.parse(storedFavorites);

//         var $ul = $('<ul>');
//         favorites.forEach(function(itemId) {
//             var $li = $('<li>').text(itemId);
//             $ul.append($li);
//         });


//     }
// })

// function retrieveTrending() {
    //     $.ajax({
    //         type: "GET",
    //         url: "https://api.nytimes.com/svc/books/v3/lists/current.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
    //         dataType: "json",
    //         success: function (result) {
    //             alert("result " + result);
    //             var topTrendList = $("#trending");
    //             var trending = result["results"]
                
    //             bookList = trending.map(book => {
    //                 return {
    //                     title: book['display_name'],
    //                     author: book['list-name'],
    //                     imgUrl: book['list-image'],
    //                 };
    //             });
    
    //             for(var i = 0; i < bookList.length; i++) {
    //                 var book = bookList[i];
    //                 var button = $(`<button class="book-button">${book.title}</button>`);
    
    //                 button.click(function() {
    //                     var card = ("#card");
    //                     card.empty();
    //                     card.append(`<img src="${book.imgUrl}" class="card-img-top">`);
    //                     card.append(`<div class="card-body"><h5 class="card-title">${book.title}</h5><p class="card-text">${book.author}</p></div>`);
    //                 });
    //                 topTrendList.append(button);
    //             }
    //         },
            
    //     });
    // }
    