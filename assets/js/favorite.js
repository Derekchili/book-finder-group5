var storedFavorites = localStorage.getItem('favorites');
   
if (storedFavorites) {
   var favorites = JSON.parse(storedFavorites);
} else {
   var favorites = {};
}


// {
//     "The Journals of Captain John Smith" : "http://books.google.com/books/content?id=E8NDSKIYiBUC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//     "Travels and Works of Captain John Smith" : "http://books.google.com/books/content?id=xMtaAAAAYAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//     "The True Travels, Adventures, and Observations of Captain John Smith into Europe, Asia, Africa, and America From Ann. Dom. 1593 to 1629":"http://books.google.com/books/content?id=-f1UDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
//     "Captain John Smith's History of Virginia; a Selection":"",
//     "Captain John Smith's America":"http://books.google.com/books/content?id=C108AAAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
// }


// loop over that array and every book create a html card or row based on the data in the card

$(".button-collapse").sideNav();

var favoritesLS = $("#author")
Object.keys(favorites).forEach(book => {
    var imgLink = favorites[book];
    image = `<img src='${imgLink}' height="60"></img>`
    favoritesLS.append(`<section id="author">${book}${image}</section>`)
});