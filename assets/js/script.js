// this sends a get response to the API (google) and retrieves the response data
response = requests.get(endpoint, params=params).json();

// retrieves items in the arrayfrom response json
items = response['items'];

// need a loop for first five items and display them into the card



$(document).ready(function() {
    $('#author-search').click(function() {
        
    })
})

$.get(endpoint, params, function(response) {
    var items = response.items;

    
    for (var i = 0; i < Math.min(items.lenght, 5); i++) {
        var title = items[i].volumeInfo.title;
        console.log(title) 

    }
})
