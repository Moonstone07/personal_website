document.addEventListener("DOMContentLoaded", function () {
// Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smoothMobile: true,
  inertia: 0.3,
});

// Function to check if elements are in view and trigger animation
function animateElements() {
  const scrollY = scroll.scroll.instance.scroll.y;
  const viewportHeight = window.innerHeight;
  document.querySelectorAll(".fade_in_right, .fade_in_left, .fade_in, .slide_up, .fade_up").forEach((element) => {
    const elementTop = element.offsetTop;
    if (scrollY + viewportHeight >= elementTop) {
      element.classList.add("show");
    }
  });
}

// Call animateElements function when page loads
animateElements();

// Call animateElements function when scroll event occurs
scroll.on("scroll", animateElements);

});
