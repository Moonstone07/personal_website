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

slides.addEventListener("touchstart", (e) => {
  let touchStartX = e.changedTouches[0].screenX;
});

slides.addEventListener("touchmove", (e) => {
  let touchEndX = e.changedTouches[0].screenX;
});

slides.addEventListener("touchend", (e) => {
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX) {
    slides.scrollBy({ left: slides.clientWidth, behavior: "smooth" });
  }
  if (touchEndX > touchStartX) {
    slides.scrollBy({ left: -slides.clientWidth, behavior: "smooth" });
  }
}
// CIRCLES
