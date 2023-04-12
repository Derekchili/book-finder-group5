var lsFavorites = localStorage.getItem('favorites');
var favorites = [""];
if (favorites) {
    favorites = [localStorage.getItem('favorites')]
} else {
    favorites = [];
}
console.log(favorites);

// loop over that array and every book create a html card or row based on the data in the card

$(".button-collapse").sideNav();

favorites = $("#author")

favorites.append(`<section id="author">${lsFavorites}</section>`)