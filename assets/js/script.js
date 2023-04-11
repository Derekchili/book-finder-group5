// AHHHHHHHHHHHH!!!!!!!
var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var libUrl = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa';

console.log(googUrl);
console.log(libUrl);

function grabApi(googUrl) {
    fetch(googUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 });
}
grabApi(googUrl);

function grabApi2(libUrl) {
    fetch(libUrl)
        .then(function(response) {
            console.log(response);
            return response.json();
 });
}
grabApi2(libUrl);

var
var
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
