// AHHHHHHHHHHHH!!!!!!!
var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';
var googleApiKey = 'AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';
var nytUrl = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa';
var query = "JavaScript";
console.log(googUrl);
console.log(nytUrl);

function grabApi(googUrl) {
    fetch(googUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 });
}
grabApi(googUrl);

function grabApi2(nytUrl) {
    fetch(nytUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 });
}
grabApi2(nytUrl);


  fetch(`${googUrl}volumes?q=${query}&key=${googleApiKey}`)
  .then(response => response.json())
  .then(data => {
    data.items.forEach(item => {
      const title = item.volumeInfo.title;
      const authors = item.volumeInfo.authors;
      const description = item.volumeInfo.description;

      var titleElement = document.getElementById("author-search");
      var authorElement = document.createElement("p");
      var descriptionElement = document.createElement("p");

      // sets the text content of the HTML elements to the book information
      titleElement.textContent = title;
      authorElement.textContent = "Author(s): " + authors.join(", ");
      descriptionElement.textContent = description;

      // append the HTML elements to the bookElement
      bookElement.appendChild(titleElement);
      bookElement.appendChild(authorElement);
      bookElement.appendChild(descriptionElement);

      // append the bookElement to the bookResults element on the webpage
      bookResults.appendChild(bookElement);
    });
  });

// this sends a get response to the API (google) and retrieves the response data
// response = requests.get(endpoint, params=params).json();

// // retrieves items in the arrayfrom response json
// items = response['items'];

// // need a loop for first five items and display them into the card



// $(document).ready(function() {
//     $('#author-search').click(function() {
        
//     })
// })

// $.get(endpoint, params, function(response) {
//     var items = response.items;

    
//     for (var i = 0; i < Math.min(items.lenght, 5); i++) {
//         var title = items[i].volumeInfo.title;
//         console.log(title) 

//     }
// })
