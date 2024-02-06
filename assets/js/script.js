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
          accordionContent.style.display = "block"
      } else {
          accordionContent.style.display = "none"
      }
      
  });
});
