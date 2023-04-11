var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var libUrl = 'https://api.nytimes.com/svc/books/v3';

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

    $('#trending').text(bookList.join('\n'));
})
 
}
grabApi2(libUrl);

// favorites page local storage code
var myData = localStorage.getItem("myData");
var myDataObject = JSON.parse(myData);

// var  = document.getElementById("m");
// myDiv.textContent = myDataObject.myProperty;

// const user = {
//     // need to work on this
//   };
  
//   const userJSON = JSON.stringify(user);
  
//   localStorage.setItem("user", userJSON);
  