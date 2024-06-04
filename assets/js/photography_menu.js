// Get the menu and buttons elements
let menu = document.getElementById("mobileMenu");
let openButton = document.getElementById("openMenu");
let closeButton = document.getElementById("closeMenu");

// Add event listener for clicks
document.addEventListener("click", function (event) {
  if (event.target === openButton) {
    menu.classList.add("open");
    menu.style.display = "block";
  } else if (event.target === closeButton) {
    menu.classList.remove("open");
  }
});
