var favorites = localStorage.getItem('favorites');

if (favorites) {
    favorites = JSON.parse(favorites)
} else {
    favorites = [];
}
console.log(favorites);

// loop over that array and every book create a html card or row based on the data in the card
// grabbing the ul in the #author section
var authorList = document.querySelector('#author');

// now looping over favorites array and adding each favorites book to it
for (let i = 0; i < favorites.length; i++) {
    var ul = document.createElement('ul');

    ul.textContent = favorites[i].title + ' by ' + favorites[i].author;
    
    author.appendChild(ul);
}




$(".button-collapse").sideNav();
