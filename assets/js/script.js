
// accordion
document.querySelectorAll('.accordion_info').forEach(title => {
    title.addEventListener('click', () => {
        const currentAccordionItem = title.parentElement;
        const accordionContent = currentAccordionItem.querySelector('.accordion_content'); // Add this line
        
        // Toggle the clicked accordion item
        currentAccordionItem.classList.toggle('show');

        // Display or hide the accordion content of the clicked item
        if (currentAccordionItem.classList.contains('show')) {
            accordionContent.style.display = 'block';
        } else {
            accordionContent.style.display = 'none';
        }

        // Close other accordion items
        document.querySelectorAll('.accordion_item').forEach(item => {
            if (item !== currentAccordionItem && item.classList.contains('show')) {
                item.classList.remove('show');
                item.querySelector('.accordion_content').style.display = 'none';
            }
        });
    });
});


const accordionTitle = document.querySelector('.accordion_title');

// Set the CSS variable value
accordionTitle.style.setProperty("--secondary_text_color", "#fff"); 



// slider
let touchStartX;
let touchEndX;
let slides = document.querySelector('.slider');

slides.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

slides.addEventListener('touchmove', (event) => {
    event.preventDefault();
    touchEndX = event.changedTouches[0].screenX;
});

slides.addEventListener('touchend', () => {
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


document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelector(".slides");
    let slide = document.querySelector(".slide");
    let circles = document.querySelectorAll(".circle");

    function updateCircles(activeIndex) {
        circles.forEach(function (circle, index) {
            if (index === activeIndex) {
                circle.style.opacity = "1";
                circle.classList.add('active')
            } else {
                circle.style.opacity = "0.5";
                circle.classList.remove('active')
            }
        });
    }

    function updateSlides(activeIndex) {
        // Assuming you have a similar function for slides
    }

    // Set the first circle as active when the page loads
    updateCircles(0);
    updateSlides(0);

    slides.addEventListener("scroll", function () {
        let scrollPosition = slides.scrollLeft;
        let slideWidth = slides.clientWidth;
        let activeIndex = Math.round(scrollPosition / slideWidth);

        updateCircles(activeIndex);
        updateSlides(activeIndex);
    });

    circles.forEach(function (circle, index) {
        circle.addEventListener("click", function () {
            updateCircles(index);
            updateSlides(index);

            let slideWidth = slides.clientWidth;
            slides.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
        });
    });
});
