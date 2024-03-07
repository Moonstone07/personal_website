console.log("hello world");


// ARCCODION

document.querySelectorAll(".accordion_info").forEach((item) => {
  item.addEventListener("click", () => {
    const currentAccordionItem = item.parentElement;
    const accordionContent =
      currentAccordionItem.querySelector(".accordion_content");

    //TOGGLE
    currentAccordionItem.classList.toggle("show");

    // Display or hide the accordion content when the other accordion item is clicked

    if (currentAccordionItem.classList.contains("show")) {
      accordionContent.style.display = "block";
    } else {
      accordionContent.style.display = "none";
    }

    // keep the first accordion item open by default
    document.querySelectorAll(".accordion_item").forEach((item) => {
      if (item !== currentAccordionItem && item.classList.contains("show")) {
        //   remove it and stop displaying the accordion content
        item.classList.remove("show");
        item.querySelector(".accordion_content").style.display = "none";
      }
    });
  });
});

// RESUME SLIDER

// touch events for mobile devices
let slides, circles;

document.addEventListener("DOMContentLoaded", function () {
// Locomotive Scroll
// const scroll = new LocomotiveScroll({
//   el: document.querySelector("[data-scroll-container]"),
//   smooth: true,
//   smoothMobile: true,
//   inertia: 0.3,
// });

// // Function to check if elements are in view and trigger animation
// function animateElements() {
//   const scrollY = scroll.scroll.instance.scroll.y;
//   const viewportHeight = window.innerHeight;
//   document.querySelectorAll(".fade_in_right, .fade_in_left, .fade_in, .slide_up, .fade_up").forEach((element) => {
//     const elementTop = element.offsetTop;
//     if (scrollY + viewportHeight >= elementTop) {
//       element.classList.add("show");
//     }
//   });
// }

// // Call animateElements function when page loads
// animateElements();

// // Call animateElements function when scroll event occurs
// scroll.on("scroll", animateElements);


  slides = document.querySelector(".slides");
  circles = document.querySelectorAll(".circle");

  // update the circles when the slide changes
  function updateCircles(activeIndex) {
    circles.forEach((circle, index) => {
      if (index === activeIndex) {
        circle.style.opacity = "1";
        circle.classList.add("active");
      } else {
        circle.style.opacity = "0.5";
        circle.classList.remove("active");
      }
    });
  }

  // set the first circle as active when the page loads
  updateCircles(0);

  if (window.matchMedia("(pointer: coarse)").matches) {
    // touch events for mobile devices
    let touchStartX, touchEndX;
    let activeIndex = 0;

    slides.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slides.addEventListener("touchmove", (e) => {
      touchEndX = e.changedTouches[0].screenX;
    });

    slides.addEventListener("touchend", (e) => {
      if (touchEndX < touchStartX) {
        activeIndex++;
      }
      if (touchEndX > touchStartX) {
        activeIndex--;
      }
      activeIndex = Math.max(0, Math.min(activeIndex, circles.length - 1)); // ensure activeIndex is within bounds
      updateCircles(activeIndex);
    });
  } else {
    // Desktop slider
    slides.addEventListener("scroll", function () {
      let scrollPosition = slides.scrollLeft;
      let slideWidth = slides.clientWidth;
      let activeIndex = Math.round(scrollPosition / slideWidth);

      updateCircles(activeIndex);
    });

    circles.forEach((circle, index) => {
      circle.addEventListener("click", function () {
        updateCircles(index);

        let slideWidth = slides.clientWidth;
        slides.scroll({
          left: index * slideWidth,
          behavior: "smooth",
        });
      });
    });
  }

  // Back to home button
  const backToHomeBtn = document.querySelector(".back-to-home");
  backToHomeBtn.addEventListener("click", () => {
    
  })

});


// Hero Image move
window.addEventListener('DOMContentLoaded', (event) => {
  // Check if it's desktop view
  if(window.matchMedia("(min-width: 768px)").matches) {
    // Select the image element
    const image = document.querySelector('#intro .intro_image_wrapper');
    // Select the about section
    const aboutSection = document.querySelector('#about');
    // Append the image to the about section
    aboutSection.appendChild(image);
  }
});



