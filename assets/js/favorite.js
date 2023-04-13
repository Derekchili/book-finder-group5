// This is retrieving favorites object from local, it then parses into javascript and assigns it to favorites.
var storedFavorites = localStorage.getItem('favorites');
   
if (storedFavorites) {
   var favorites = JSON.parse(storedFavorites);
} else {
   var favorites = {};
}

// This loops through each item in favorites and creates a UL with text content to the title and author and displays it on the page.
var authorList = document.querySelector('#author');


for (let i = 0; i < favorites.length; i++) {
    var ul = document.createElement('ul');

    ul.textContent = favorites[i].title + ' by ' + favorites[i].author;
    
    author.appendChild(ul);
}

//  This is calling the sideNav function with button-collapse class, this is a Materialize function which is toggled by clicking the button or link.
$(".button-collapse").sideNav();

// This is retrieving the DOM element #Author and stores it into the var favoritesLs. Then iterating over each key in the object of favorites and for each title it's grabbing the img link adn the appends it to the favorites card diplaying the title and pic of the book.
var favoritesLS = $("#author")
Object.keys(favorites).forEach(book => {
    var imgLink = favorites[book];
    image = `<img src='${imgLink}' height="60"></img>`
    favoritesLS.append(`<section id="author">${book}${image}</section>`)
});

