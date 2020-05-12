// QUERY ITEM DATABASE -  SEARCH ITEM CODE
if (document.getElementById("searchItemButton")){
  var searchItemButton = document.getElementById("searchItemButton")
  searchItemButton.addEventListener("click", function(){
    // alert("We are searching the database...")
    const itemTitle = document.getElementById("listingsItemName").value
    window.location.href=`/searchItems?q=${itemTitle}`
    })
  }

//SUBSTITUTED FOR SERVER SIDE CODE PAIRED WITH method=post action=/listings on FORM IN POST-JOB EJS
  if (false && document.getElementById("postItemButton") ){
    var postItemButton = document.getElementById("postItemButton");
    postItemButton.addEventListener("click", function(){
      alert("Your information has been submitted!")
        // onclick=document.getElementById('postItemButton').innerHTML = Date()
      // console.log("sending from the post item button to the database")
      const email = document.getElementById("email").value
      const itemTitle = document.getElementById("job-title").value
      const itemLocation = document.getElementById("job-location").value
      const itemDescription = document.getElementById("editor-1").value

      var d = new Date();
      document.getElementById("postItemButton").innerHTML = d;

        console.log(email)
        console.log(itemTitle)
        console.log(itemLocation)
        console.log(itemDescription)
        console.log(d)

      fetch('listings', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'Email': email,
          'ItemTitle': itemTitle,
          'ItemLocation': itemLocation,
          'ItemDescription' : itemDescription,
          'Date': d
        })
      })
        location.reload();
    })
  }
