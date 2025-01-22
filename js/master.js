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

        // Remove active class from all items
        colorsLi.forEach((element) => {
            element.classList.remove("active");
        });

        // Add active class to the clicked item
        e.target.classList.add("active");
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
        // Remove active class from all spans
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });

        // Add active class to the clicked span
        e.target.classList.add("active");

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
let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach(img => {

    //creat overlay
    let overlay = document.createElement("div");

    // add class to overlay 
    overlay.className = 'popup-overlay';

    //Append overlay to body
    document.body.appendChild(overlay);

    // create the popup box 
    let popupBox = document.createElement("div");

    // add class to popupBox 
    popupBox.className = 'popup-box';

});