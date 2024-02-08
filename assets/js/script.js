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
  slides = document.querySelector(".slides");
  circles = document.querySelectorAll(".circle");

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
});
