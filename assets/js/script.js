var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var libUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa';

console.log(googUrl);
console.log(libUrl);


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

function grabApi2(libUrl) {
    fetch(libUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 })
 .then(function (data) {
    console.log('Fetch Response \n----------');
    console.log(data);

    var books = data.results.books;
    var bookList = [];

    for(var i = 0; i < books.length; i++) {
        var book = books[i];
        var bookTitle = book.title;
        var bookAuthor = book.author;
        var bookInfo = bookTitle + ' by ' + bookAuthor;
        bookList.push(bookInfo);
    }
    console.log(bookList);

    // $('#top-trending' + i + " #trending").text;
})
 
}
grabApi2(libUrl);



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

// // we have our favorites array we should be able to use it 
// $('a.favorites-btn').on('click', function(event) {
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

// // with the link to favorites page with a class and using a method chaining for this function

// $('a.favorites-link').on('click', function(event) {
//     event.preventDefault();

//     var storedFavorites = localStorage.getItem('favorites');
//     if (storedFavorites) {
//         var favorites = JSON.parse(storedFavorites);

//         var $ul = $('<ul>');
//         favorites.forEach(function(itemId) {
//             var $li = $('<li>').text(itemId);
//             $ul.append($li);
//         });


// });
