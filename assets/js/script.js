// AHHHHHHHHHHHH!!!!!!!
var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var libUrl = 'https://api.nytimes.com/svc/books/v3';

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