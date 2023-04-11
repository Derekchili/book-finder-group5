var googUrl = 'https://www.googleapis.com/books/v1/volumes?q=search+terms&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas';

var libUrl = 'https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa';

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
 })
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
})
}
grabApi2(libUrl);


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
$(function () {
    var auth = $("#author-search");
    auth.on("change", authSearch);
    var genre = $("#genre-search");
    genre.on("change", genreSearch);
    var trend = $("#dropdown");
    trend.on("change", trendSearch);
    retrieveGenres();
});

function authSearch() {
    alert("test " + $(this).val());
    callGoogle($(this).val());
}

function genreSearch() {
    alert("test " + $(this).val());
    callNYT($(this).val());
}

function trendSearch() {
    alert("test " + $(this).val());
}

function callGoogle(searchWords) {
    searchWords = searchWords.replace(/\s+/g, '+').toLowerCase();
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + searchWords + "&key=AIzaSyD_J1_2HDf8XZGF7p11aeX7W_ICizZspas",
        dataType: "json",
        success: function (result) {
            console.log("result " + result);
        },
        
        }
    )
}

function callNYT(searchGenres) {
    searchGenres = searchGenres.replace(/\s+/g, '-').toLowerCase();
    console.log(searchGenres);
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/current/" + searchGenres + ".json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result) {
            console.log("result " + result);
        },
        
        
    });
}

function retrieveGenres() {
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result, status, xhr) {
            alert("result " + result);
            var genreList = $("#dropdown");
            var genres = result["results"]
            genres.forEach(genre => {
                genreList.append(`<option value="${genre["list_name_encoded"]}">
                            ${genre["list_name_encoded"]}
                    </option>`
                        );
                 
            });
        },
    
    }  
    )
    }