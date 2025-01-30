// Toggle spin class on icon
document.querySelector(".gear").onclick = function () {
    // Toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    // Toggle settings box visibility
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Check if there is a local Storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors) {
    // Apply the saved color to the document
    document.documentElement.style.setProperty("--main-color", mainColors);

    // Set active class on the saved color
    colorsLi.forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}

// Loop on every list item to handle color changes
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        // Get the selected color
        let selectedColor = e.target.dataset.color;

        // Apply the selected color to the root
        document.documentElement.style.setProperty("--main-color", selectedColor);

        // Save the selected color in localStorage
        localStorage.setItem("color_option", selectedColor);

        handleActive(e);
    });
});

// Random background option
let backgroundOption = true;

// Variable to control the interval
let backgroundInterval;

// Check if there is local storage for random backgrounds
let backgroundLocalItem = localStorage.getItem("background_option");

// Apply the stored background option if available
if (backgroundLocalItem !== null) {
    backgroundOption = backgroundLocalItem === "true";

    // Remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach((element) => {
        element.classList.remove("active");
    });

    // Add active class to the correct span
    if (backgroundOption) {
        document.querySelector(".random-backgrounds .one").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .two").classList.add("active");
    }
}

// Switch random backgrounds
const randomBackLi = document.querySelectorAll(".random-backgrounds span");

// Loop on all spans
randomBackLi.forEach((span) => {
    span.addEventListener("click", (e) => {
        handleActive(e);

        // Handle background option
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Array of background images
let imgsArray = [
    "landing1.webp",
    "landing2.webp",
    "landing3.webp",
    "landing4.webp",
    "landing5.webp",
];

// Function to randomize the backgrounds
function randomizeImgs() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            // Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            
            // Change background image URL
            landingPage.style.backgroundImage =
            'url("images/' + imgsArray[randomNumber] + '")';
        }, 5000);
    }
}

// Start randomizing images if the option is true
if (backgroundOption) {
    randomizeImgs();
}

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle active status 
function handleActive(ev) {
    // Remove active class from all children 
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if(bulletLocalItem){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });

    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        } else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }
        handleActive(e);
    });
});

// Reset button 
document.querySelector(".reset-options").onclick = function() {
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option"); // Fixed typo here
    window.location.reload();
}

// select skills selector 
let ourSkills = document.querySelector(".skills");

window.onscroll = function() {

    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //skills Outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height 
    let windowHeight = this.innerHeight;

    //window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }; 
};
// ceate popup with the imafes in the galalry section 
let ourGallery = document.querySelectorAll(".gallary img");

ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // Create overlay
        let overlay = document.createElement("div");

        // Add class to overlay
        overlay.className = 'popup-overlay';

        // Append overlay to body
        document.body.appendChild(overlay);

        // Create the popup box
        let popupBox = document.createElement("div");

        // Add class to popupBox
        popupBox.className = 'popup-box';

        if(img.alt){
            let imgHeading = document.createElement("h3");

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }
        // Create the image
        let popupImage = document.createElement("img");

        // Set image src
        popupImage.src = img.src;

        // Add image to popupBox
        popupBox.appendChild(popupImage);

        // Append popupBox to body
        document.body.appendChild(popupBox);

        // Add a close button to the popup
        let closeButton = document.createElement("span");
        closeButton.className = 'close-button';
        closeButton.textContent = 'X';

        // Append the close button to the popupBox
        popupBox.appendChild(closeButton);

        // Close popup on clicking the close button
        closeButton.addEventListener('click', () => {
            popupBox.remove();
            overlay.remove();
        });

        // Close popup on clicking the overlay
        overlay.addEventListener('click', () => {
            popupBox.remove();
            overlay.remove();
        });

    });
});

