import API_KEY from "./config.js";

//Getting all the impotant elements from the html file
const formEl = document.querySelector("form"); //store our complete form section
const inputEl = document.getElementById("search-input"); //store our input section
const searchResults = document.querySelector(".search-results"); //We add a . because it is a class- store our image box containers
const showMore = document.getElementById("show-more-button"); //Store the 'show more' button

let inputData = ""; //Store input data - keyword user types
let page = 1; //Initialise default page number

// Function- input data with store all keywords user is typing inside input section
async function searchImages() {
  //async - using fetch and response
  //Fetch our response
  inputData = inputEl.value; //User types keyword then search - API will take keyword and fetch images from Unsplash.com
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json(); //Get data and convert it into json form

  const results = data.results; //Convert json data into the images

  //Initialise the page number
  if (page === 1) {
    searchResults.innerHTML = ""; //Default container made in index.html
  }

  //Map results since we have so much data so we need to show some data
  results.map((result) => {
    //Push data into the div template- images put on boxes
    const imageWrapper = document.createElement("div"); //Creating a container (div)
    imageWrapper.classList.add("search-result"); //Add classname
    const image = document.createElement("img"); //Create image
    image.src = result.urls.small; //Create source altribute - small for size
    image.alt = result.alt_description; //Create alt attribute
    const imageLink = document.createElement("a"); //Creating anchor tag
    imageLink.href = result.links.html;
    imageLink.target = "_blank"; // Add target
    imageLink.textContent = result.alt_description; //Put the image text

    //Append the elements inside webpage
    imageWrapper.appendChild(image); //inside wrapper - we use image and all
    imageWrapper.appendChild(imageLink); // Inside div- append image link
    searchResults.appendChild(imageWrapper); //Inside search results - append div
  });

  page++; //This is where there is more than 1 page from results then "Show more" button is shown
  if (page > 1) {
    showMore.style.display = "block"; //Display is none until there is more pages then it is display block
  }
}
//Call functions - search keyword then call searchImage function
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; //Initialise page
  searchImages();
});

showMore.addEventListener("click", (event) => {
  searchImages(); //Call function again for 'Show more' button
});
