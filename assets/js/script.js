

// Hero Image move
window.addEventListener("DOMContentLoaded", (event) => {

  if (window.matchMedia("(min-width: 768px)").matches) {

    const image = document.querySelector("#intro .intro_image_wrapper");

    const aboutSection = document.querySelector("#about");

    aboutSection.appendChild(image);
  }
});


