
// var postItemButton = document.getElementById("postItemButton");
// var searchItemForm = document.getElementsByClassName("search-jobs-form")[0]
// var searchItemButton = document.getElementById("searchItemButton")

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
// document.querySelector("h1").addEventListener("click", function(){
//
//   alert("We are searching the database...")
//
// })
if (document.getElementById("searchItemButton")){
  var searchItemButton = document.getElementById("searchItemButton")
  searchItemButton.addEventListener("click", function(){
    // alert("We are searching the database...")
    const itemTitle = document.getElementById("listingsItemName").value
    console.log(itemTitle)
    window.location.href=`/searchItems?q=${itemTitle}`
    // fetch("/")
    // .then(response => response.json())
    })
  }

// }


// console.log("sending from the post item button to the database")
// const itemNameValue = document.getElementById("itemName").value
//   console.log(itemNameValue)
//
// fetch('listings', {
//   method: 'post',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     'Email': email,
//   })
// })






/*ISSUE: for morning: _id
:
5e82bf56966b3e1178cdb8a6
email
:
"hello@yours.com"
itemTitle
:
null
*/



// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//           console.log("fired")
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         console.log(thumbDown)
//         fetch('thumbDown', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
