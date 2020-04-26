var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");



//Related to put/messages
Array.from(thumbUp).forEach(function(element) { //for each item called thumbs up (icon)
      element.addEventListener('click', function(){
        // name inside of a span, inside of li, indise of ul, from the UL back down to chose an li
        const name =
       this.parentNode.parentNode.childNodes[1].innerText //name isinside span and span inside of an li and li inside unordered list so going from where it is up to the li and up to the ul and then from the ul back down it can choose any of the li's.
       //Indexes alternate because:*********** request[0], answer[1], req[2], answer[3] and so on

       //think of styling css- same concept, cascading down thetagsto get to the actual target tag
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText) //parsefloat= string to integer rather than concatinatingit will add properly.
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'}, //is the headers section by convention?
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })

        .then(response => {
          if (response.ok) return response.json() //take the responses if they are ok, pass them into the dom
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)//refresh
        })
      });
});
// mirror image of thumbUp ...the difference is what is done to the
//number in the routes.js
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        console.log(thumbDown)
        fetch('thumbDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload() //take the response and reload the page
        })
      });
});
