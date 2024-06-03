console.log("js file loaded");

let lenis;

const galleryImages = document.querySelectorAll(".section_panel_box>img");
const stickyImages = document.querySelectorAll(".section_sticky_item>img");

const initLenis = () => {
  lenis = new Lenis({
    lerps: 0.08,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

const animate = () => {
  gsap.set([galleryImages, stickyImages], {
    autoAlpha: 0,
    filter: "brightness(400%) blur(10px)",
    "-webkitFilter": "brightness(400%) blur(10px)",
  });

  gsap.to([galleryImages, stickyImages], {
    duration: 1,
    autoAlpha: 1,
    stagger: {
      amount: 0.32,
      from: "random",
    },
    ease: "expo.inOut",
    filter: "brightness(100%) blur(0px)",
    "-webkitFilter": "brightness(100%) blur(0px)",
  });

  initLenis();
  addEventListeners();
};

const addEventListeners = () => {
  galleryImages.forEach((image) => {
    image.addEventListener("mouseenter", (e) => {
      const getSrc = e.target.src;

      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .to(stickyImages, {
          duration: 0.25,
          scale: 1.15,
          autoAlpha: 0.33,
          filter: "blur(10px) brightness(400%)",
          "-webkitFilter": "blur(10px) brightness(400%)",
        })
        .set(stickyImages, { attr: { src: getSrc } }, 0.1)
        .to(
          stickyImages,
          {
            duration: 0.25,
            scale: 1,
            autoAlpha: 1,
            filter: "brightness(100%) blur(0px)",
            "-webkitFilter": "brightness(100%) blur(0px)",
          },
          0.1
        );
    });
  });
};

animate();

// Get the menu and buttons elements
let menu = document.getElementById('mobileMenu');
let openButton = document.getElementById('openMenu');
let closeButton = document.getElementById('closeMenu');

// Add event listener for clicks
document.addEventListener('click', function(event) {
    if (event.target === openButton) {
        menu.classList.add('open');
        menu.style.display = 'block';
    } else if (event.target === closeButton) {
        menu.classList.remove('open');
    }
});


