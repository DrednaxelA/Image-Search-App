const apiKey = "J4qDNcGqCux7_cH1k45awCl7DYpYuri9ptvEpGO6ROs";

const searchField = document.querySelector("form"); // input section
const searchButton = document.getElementById("search-input"); // search button
const searchResults = document.querySelector(".search-results"); // store the image results
const moreResultsButton = document.getElementById("show-more-button"); // More Results button

let userInput = ""; // store typed keywords by the user
let currentPage = 1; // store current page, always start from 1

async function searchImages() { // async due to response + fetch
    userInput = searchButton.value; // hold input value
    const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${userInput}&client_id=${apiKey}`; // create dynamic URL based on input value

    const response = await fetch(url); // wait for API response on GET
    const data = await response.json(); // convert into JSON and store

    const results = data.results; // store result data

    if (currentPage === 1) { // first page = default results
        searchResults.innerHTML = "";
    }

    results.map((result) => { // load results on the page by mapping to attributes, classes, elements in the 'div' template
        const imageWrapper = document.createElement('div'); // image container
        imageWrapper.classList.add("search-result"); // push result
        const image = document.createElement('img'); // create image
        image.src = result.urls.small; // get source from result URL
        image.alt = result.alt_description;
        const imageLink = document.createElement('a'); // create anchor
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image); // push the result data to the page
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    currentPage++;

    if (page > 1) { //show "show more" button if results > 1 page
        moreResultsButton.style.display = "block";
    }
}
searchField.addEventListener("submit", (event) => { // listen to the "Go!" button
    event.preventDefault();
    page = 1;
    searchImages();
})

searchButton.addEventListener("input", (event) => { // if another search is initiated ensure to clear previous results before loading new image
    currentPage = 1;
    searchResults.innerHTML = "";
    moreResultsButton.style.display = "block";
})
moreResultsButton.addEventListener("click", () => { // listen to the "More Results" button
    searchImages();
})