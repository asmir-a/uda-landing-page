/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/* This part is for initializing the navbar.*/

let navbarList = document.querySelector("#navbar__list");
let sectionsList = document.querySelectorAll("section");
let liElementToTop = document.createElement("LI");
liElementToTop.innerHTML = "to TOP";
liElementToTop.className = "menu__link navbar_to_top";
navbarList.appendChild(liElementToTop);

for (const section of sectionsList){
    let liElement = document.createElement("LI");
    liElement.innerHTML = section.dataset.nav;
    liElement.className = "menu__link";
    navbarList.appendChild(liElement);
}

let navbarMenu = document.querySelector(".navbar__menu");
let menuLists = document.querySelectorAll(".menu__link");

/* This part is for selecting the active class element, which needs to be highlighted and whose corresponding nav button needs to be highlighted as well.*/

window.addEventListener("scroll", _.throttle(page_scroll, 200));

function page_scroll(event) {
    let closestSectionDistance = 10000;
    let closestSectionIndex = -1;
    let currentActiveSection = document.querySelector(".your-active-class");
    for (const section of sectionsList){
        let sectionDistance = section.getBoundingClientRect().y;
        if (Math.abs(sectionDistance) < closestSectionDistance){
            closestSectionDistance = Math.abs(sectionDistance);//you can optimize the approach cause you know that if the rel distance is increasing, then the next section are not candidates for the closest section
            closestSectionIndex = closestSectionIndex + 1;
        }
    }
    currentActiveSection.classList.remove("your-active-class");
    sectionsList[closestSectionIndex].classList.add("your-active-class");
    // console.log(currentActiveSection.dataset.nav);
    if (currentActiveSection == sectionsList[closestSectionIndex]){
        console.log("No need to change");
    } else {
        for (const menuList of menuLists){
            if (menuList.innerHTML == currentActiveSection.dataset.nav){
                menuList.classList.remove("highlighted_link");
            } else if (menuList.innerHTML == sectionsList[closestSectionIndex].dataset.nav) {
                menuList.classList.add("highlighted_link");
            }
        }
    }
}

/* This part is for scrolling to the appropriate section when you press the navbar.*/

navbarMenu.addEventListener("click", nav_click);

function nav_click(event) {
    let navSectionText = event.target.innerHTML;
    let scrollingValue = 0;
    if (event.target.classList.contains("navbar_to_top")){
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    } else {
        for (const section of sectionsList) {//while loop is more efficient in this case or maybe not(since i need to remove the active class from the one the section that is not active)
            section.classList.remove("your-active-class");
            if (section.dataset.nav == navSectionText){
                scrollingValue = section.getBoundingClientRect().y;
                section.classList.add("your-active-class");
            }//not efficient, should use a hash map instead
        }
        window.scrollBy({top: scrollingValue, left: 0, behavior: "smooth"});
    }
}

/* This section is for making the TOP button, which appears in the end of the page, visible.*/

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        liElementToTop.style.opacity = 1.0;
    } else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 100) {
        liElementToTop.style.opacity = 0.0;
    }
}
