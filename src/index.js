// get all of the global variables
const nav = document.querySelector("#duck-nav");
const duckName = document.querySelector("#duck-display-name");
const image = document.querySelector("#duck-display-image");
const likes = document.querySelector("#duck-display-likes");
const form = document.querySelector("#new-duck-form");
const url = "http://localhost:3000/ducks";
let globalDuck = {}

//adds  duck-img  to Nav-bar
function addDuck(duck) {
    globalDuck = duck
  const navImg = document.createElement("img");
  navImg.src = duck.img_url;
  nav.append(navImg);

  //add an event listner to each duck in the nav bar
  navImg.addEventListener("click", (e) => {
    // when the duck is clicked, update the display
    populateDuck(duck);
  });
}

//adds all the ducks to display (button has to be clicked first)
function populateDuck(duck) {
    duckName.innerText = duck.name;
    image.src = duck.img_url;
    likes.textContent = `${duck.likes} Likes`;
  }


// we get the data from the server
fetch(url)
  .then((response) => response.json())
  .then((ducks) => {
    // when you get the data, then do this
    // for each duck in the array of ducks:
    // add it to the nav bar
    ducks.map((duck) => {
      addDuck(duck);
    });// also wen rendered show the 2nd indexed duck on page start
    populateDuck(ducks[1])
  });

//add eventListner for the click button
likes.addEventListener("click", (e) => {
    let currentLikes = parseInt(likes.textContent);
    let newLikes = currentLikes + 1;
   

    //PATCH REQUEST
    fetch(`${url}/${globalDuck.id}`,{
        method:"PATCH",
        headers:{"content-type": "application/json"},
        body: JSON.stringify({likes: newLikes})
    })
    .then(res => res.json())
    .then(data =>{
        likes.textContent = `${data.likes} Likes`// update dom
        globalDuck.likes = data.likes // update our global variable

    })
    
  });

//form submit eventListner

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newDuck = {
    name: e.target["duck-name-input"].value,
    img_url: e.target["duck-image-input"].value,
    likes: 0,
  };
  //do the POST then;
  fetch(url , {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify(newDuck)
  })
  .then(res => res.json())
  .then(data => addDuck(data));
});
