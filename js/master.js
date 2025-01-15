// select landing page element 
let landingPage = document.querySelector(".landing-page");
        
// get array of images 
let imgsArray =["landing1.webp","landing2.webp","landing3.webp","landing4.webp","landing5.webp"];

setInterval(() => {
    // get random number 
    let randomNumber = Math.floor(Math.random() * imgsArray.length);

// change background image url 
landingPage.style.backgroundImage = 'url("images/'+imgsArray[randomNumber]+'")';
}, 5000);

// toggle spin class on icon 
document.querySelector(".gear").onclick = function (){
    // toggle class fa-spin for rotation on self 
    this.classList.toggle("fa-spin");

    // toggle class 
    document.querySelector(".settings-box").classList.toggle("open");
}