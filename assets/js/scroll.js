document.addEventListener("DOMContentLoaded", function () {
// Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smoothMobile: true,
  inertia: 0.3,
});
  
  // Get the offset top of an element
    function getOffsetTop(element) {
      let offsetTop = 0;
      while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      return offsetTop;
    }

// Function to check if elements are in view and trigger animation
function animateElements() {
  const scrollY = scroll.scroll.instance.scroll.y;
  const viewportHeight = window.innerHeight;
  document.querySelectorAll(".fade_in_right, .fade_in_left, .fade_in, .slide_up, .fade_up").forEach((element) => {
    let trigger = element;
    if (element.querySelector('.trigger')) {
      trigger = element.querySelector('.trigger');
    }
    const triggerTop = getOffsetTop(trigger);
    const triggerBottom = triggerTop + trigger.offsetHeight;
    if (scrollY + viewportHeight >= triggerTop && scrollY <= triggerBottom) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
}

// Call animateElements function when page loads
  animateElements();
  
// update Locomotive Scroll
scroll.update();

// Call animateElements function when scroll event occurs
scroll.on("scroll", animateElements);

});
