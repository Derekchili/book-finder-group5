var myData = localStorage.getItem("myData");
var myDataObject = JSON.parse(myData);

var myDiv = document.getElementById("m");
myDiv.textContent = myDataObject;

const user = {
    // need to work on this
  };
  
  const userJSON = JSON.stringify(user);
  
  localStorage.setItem("user", userJSON);