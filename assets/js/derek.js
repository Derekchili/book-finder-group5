function callNYT(searchTrending) {
    searchTrending = searchTredning.replace(/\s+/g, '-').toLowerCase();
    console.log(searchTrending);
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/current/" + searchTrending + ".json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result) {
            console.log("result " + result);
        },
        
        
    });
}


function retrieveTrending() {
    $.ajax({
        type: "GET",
        url: "https://api.nytimes.com/svc/books/v3/lists/current.json?api-key=9p5nzFHMFVgj5PbY4jWUFUAEz1POGKRa",
        dataType: "json",
        success: function (result) {
            alert("result " + result);
            var topTrendList = $("#trending");
            var trending = result["results"]
            trending.forEach(trending => {
                topTrendList.append(`<option class="${trending["list_current_encoded"]}">
                ${trending["list_current_encoded"]}
        </option>`
                        );
                        bookList = result['results'];
                        console.log(bookList, 'bookList');
            });
        },
    
    }  
    )
    }