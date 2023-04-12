var favorites = localStorage.getItem('favorites');
if (favorites) {
    favorites = JSON.parse(favorites)
} else {
    favorites = [];
}
console.log(favorites);

// loop over that array and every book create a html card or row based on the data in the card

