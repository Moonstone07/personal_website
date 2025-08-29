// Horizontal Scrolling Photography Carousel
// Mouse wheel controls horizontal scrolling with infinite loop

class HorizontalCarousel {
    constructor() {
        // Configuration
        this.currentPosition = 0;
        this.imageWidth = 430; // 400px image + 30px margin (matches carousel.css)
        this.totalImages = 0;
        this.isAnimating = false;
        
        // DOM Elements
        this.carouselContainer = document.getElementById('carouselContainer');
        this.carouselTrack = document.getElementById('carouselTrack');
        this.modal = document.getElementById('imageModal');
        this.modalImageLarge = document.getElementById('modalImageLarge');
        this.modalImageSmall1 = document.getElementById('modalImageSmall1');
        this.modalImageSmall2 = document.getElementById('modalImageSmall2');
        this.modalImageSmall3 = document.getElementById('modalImageSmall3');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalClose = document.getElementById('modalClose');
        
        // Modal state
        this.currentModalImages = [];
        this.currentModalIndex = 0;
        
        // Image data
        this.images = [];
        
        // Initialize
        this.initializeImages();
        this.createCarousel();
        this.bindEvents();
        // Removed startAutoplay()
    }
    
    // Initialize image data
    initializeImages() {
        // Option to use prints folder for homepage (set to true to use prints collection)
        const usePrintsFolder = true;
        
        let imageFiles;
        
        if (usePrintsFolder) {
            // Curated prints for homepage carousel
            imageFiles = [
                'prints/Empty_staircase_with_shadow.jpg',
                'prints/Large_Ferris_wheel_in_city_park.jpg',
                'prints/Modern_buildings_against_blue_sky.jpg',
                'prints/Single_daisy_flower_in_focus.jpg'
            ];
        } else {
            // Full collection from all categories
            imageFiles = [
                // Portraits
                'portraits/Ianna_01.jpg',
                'portraits/barbara_portrait_01.jpg',
                'portraits/ella_potrait_01.jpg',
                'portraits/sabrina_potrait_01.jpg',
                'portraits/camille_potrait_01.jpg',
                
                // Architecture
                'Modern_glass_building_at_dusk.jpg',
                'Modern_black_building_with_blue_sky.jpg',
                'Skyscraper_building_with_blue_sky.jpg',
                'Building_with_geometric_roof_design.jpg',
                'Modern_office_building_at_dusk.jpg',
                'Modern_high_rise_building_at_night.jpg',
                'Apartment_building_with_balconies.jpg',
                'Church_building_with_green_roof.jpg',
                'Tall_historic_building_with_trees_in_foreground.jpg',
                'Reflection_of_clouds_on_glass_building.jpg',
                
                // Urban Life
                'People_walking_on_street.jpg',
                'Woman_walking_towards_Walmart.jpg',
                'Rainy_city_street_at_dusk.jpg',
                'City_skyline_with_illuminated_building.jpg',
                'Cityscape_with_tall_buildings.jpg',
                'City_buildings_and_trees.jpg',
                'Foggy_skyscraper_in_city.jpg',
                'Traffic_light_and_overpass.jpg',
                
                // Nature & Wildlife
                'Bee_on_purple_flower_in_garden.jpg',
                'Bird_flying_at_sunset.jpg',
                'Butterfly_on_orange_flower.jpg',
                'Duck_swimming_on_water.jpg',
                'Ladybug_on_grass_blade.jpg',
                'White_butterfly_on_tree_trunk.jpg',
                'Beetle_on_lavender_flower.jpg',
                'Clover with a Ladybug.jpg',
                'Bird_flying_in_sky.jpg',
                'Butterfly_on_plant_with_purple_flowers.jpg',
                'Duck_landing_on_water_at_sunset.jpg',
                'Ducks_swimming_by_river_at_dusk.jpg',
                
                // Landscapes
                'Sunset_over_calm_lake_with_trees.jpg',
                'Island_in_calm_water_at_sunset.jpg',
                'Bridge_over_water_at_dusk.jpg',
                'Sunset_over_river_with_clouds.jpg',
                'Large_Ferris_wheel_in_city_park.jpg',
                'Colorful_sunset_sky_over_buildings.jpg',
                'Colorful_sunset_sky_with_clouds.jpg',
                'Bridge_and_streetlamp_silhouette.jpg',
                'River_with_bridge_and_clouds.jpg',
                'Empty_tennis_court_at_sunset.jpg',
                'Fisherman_on_boat_at_sunset.jpg',
                'Man_standing_by_water_at_sunset.jpg',
                
                // Street Photography
                'Person_sitting_on_bench_with_phone.jpg',
                'Cyclist_riding_towards_building_entrance.jpg',
                'Person_walking_dog_in_alley.jpg',
                'Two_people_walking_outdoors.jpg',
                'Woman_walking_past_flower_shop.jpg',
                'Person_standing_near_building.jpg',
                'Seagull_on_building_roof.jpg',
                'Two_pigeons_on_sandy_ground.jpg',
                'Pigeon_walking_on_pavement.jpg',
                'Dog_looking_at_trash_cans.jpg',
                'Person_walking_down_alleyway.jpg',
                'Seagull_in_parking_lot.jpg',
                
                // Fine Art
                'Single_daisy_flower_in_focus.jpg',
                'Sunlight_shadows_on_concrete_wall.jpg',
                'Empty_staircase_with_shadow.jpg',
                'White_gardenia_flower_with_dark_background.jpg',
                'Single_yellow_flower_in_focus.jpg',
                'Purple_flower_with_green_background.jpg',
                'Close_up_of_purple_flowers.jpg',
                'Peony in Bloom.jpg',
                'Pink_roses_with_green_leaves.jpg',
                'Red_rose_flower_with_green_leaves.jpg',
                'Concrete_structure_with_light_beams.jpg',
                'Concrete_structure_with_shadows.jpg',
                'Sunlight_through_window_shadows.jpg',
                'Ceiling_with_horizontal_lights_in_black_and_white.jpg',
                'Wildflower on a Track.jpg',
                'Withered_plant_in_field.jpg'
            ];
        }

        // Define mockup images for each main image (variable number of thumbnails per main image)
        const mockupImages = [
            // For prints folder images
            ['staircase.jpg', 'staircase_02.jpg', 'staircase_03.jpg'], // Empty staircase
            ['ferris_wheel.jpg', 'ferris_wheel_02.jpg', 'ferris_wheel_03.jpg'], // Ferris wheel
            ['blue_sky_architecture.jpg', 'blue_sky_architecture_02.jpg', 'blue_sky_architecture_03.jpg'], // Modern buildings
            ['marguerite.jpg', 'marguerite_02.jpg', 'marguerite_03.jpg'], // Single daisy
            ['crane_moon.jpg', 'crane_moon_02.jpg', 'crane_moon_03.jpg'] // Building crane moon
        ];
        
        // Create image data with titles and descriptions
        this.images = imageFiles.map((filename, index) => {
            const shopifyData = this.generateShopifyUrl(filename);
            return {
                src: `images/${filename}`,
                title: this.generateTitle(index, filename),
                description: this.generateDescription(index, filename),
                category: this.generateCategory(index, filename),
                shopifyUrl: shopifyData.url,
                productId: shopifyData.productId,
                alt: this.generateAltText(filename, index),
                mockups: mockupImages[index].map(mockup => `images/print_mockup/${mockup}`)
            };
        });
        
        this.totalImages = this.images.length;
    }
    
    // Generate dynamic titles
    generateTitle(index, filename) {
        // Check if we're using prints folder
        if (filename.includes('prints/')) {
            const printTitles = [
                "Geometric Solitude", // Empty staircase
                "City Ferris Wheel", // Large Ferris wheel
                "Urban Skyscraper", // Modern buildings
                "Daisy Study", // Single daisy
                "Crane Moon" // Building crane moon
            ];
            return printTitles[index] || `Print ${index + 1}`;
        }
        
        // Original titles for full collection
        const titles = [
            // Portraits
            "Ianna Portrait Session",
            "Barbara Portrait",
            "Ella Portrait",
            "Sabrina Portrait",
            "Camille Portrait",
            
            // Architecture
            "Glass Building at Dusk",
            "Modern Black Building",
            "Urban Skyscraper",
            "Geometric Roof Design",
            "Office Building Twilight",
            "High-Rise at Night",
            
            // Urban Life
            "Street Walkers",
            "Urban Journey",
            "Rainy City Evening",
            "City Cyclist",
            "Digital Age",
            "Illuminated Skyline",
            
            // Nature & Wildlife
            "Garden Pollinator",
            "Sunset Flight",
            "Butterfly Garden",
            "Duck on Water",
            "Ladybug on Grass",
            "White Butterfly",
            
            // Landscapes
            "Lake Serenity",
            "Island Sunset",
            "Evening Bridge",
            "River Sunset",
            "City Ferris Wheel",
            "Colorful Sky",
            
            // Street Photography
            "Alley Walk",
            "Urban Stroll",
            "Flower Shop Walk",
            "Building Observer",
            "Rooftop Seagull",
            "Ground Pigeons",
            
            // Fine Art
            "Daisy Study",
            "Light & Shadow",
            "Geometric Solitude",
            "Gardenia Elegance",
            "Yellow Bloom",
            "Purple Study"
        ];
        return titles[index] || `Untitled ${index + 1}`;
    }
    
    // Generate categories
    generateCategory(index, filename) {
        // Check if we're using prints folder
        if (filename.includes('prints/')) {
            const printCategories = [
                "fine-art", // Empty staircase
                "landscape", // Large Ferris wheel
                "architectural", // Modern buildings
                "fine-art", // Single daisy
                "architectural" // Building crane moon
            ];
            return printCategories[index] || "fine-art";
        }
        
        // Original categories for full collection
        const categories = [
            // Portraits
            "portraits", "portraits", "portraits", "portraits", "portraits",
            
            // Architecture
            "architectural", "architectural", "architectural", "architectural", "architectural", "architectural",
            
            // Urban Life
            "urban", "urban", "urban", "urban", "urban", "urban",
            
            // Nature & Wildlife
            "nature", "nature", "nature", "nature", "nature", "nature",
            
            // Landscapes
            "landscape", "landscape", "landscape", "landscape", "landscape", "landscape",
            
            // Street Photography
            "street", "street", "street", "street", "street", "street",
            
            // Fine Art
            "fine-art", "fine-art", "fine-art", "fine-art", "fine-art", "fine-art"
        ];
        return categories[index] || "urban";
    }
    
    // Generate descriptions
    generateDescription(index, filename) {
        // Check if we're using prints folder
        if (filename.includes('prints/')) {
            const printDescriptions = [
                "Architectural minimalism - empty staircase with dramatic shadow play creating geometric poetry in concrete and light",
                "Urban ferris wheel in city park - contemporary landscape study showcasing the intersection of recreation and urban architecture",
                "Modern glass buildings against clear blue sky - architectural photography capturing the bold lines and reflective surfaces of contemporary design",
                "Minimalist floral study - single daisy in perfect focus representing the beauty found in simplicity and natural elegance",
                "Building crane silhouetted against full moon - urban landscape photography capturing the poetry of construction and celestial beauty"
            ];
            return printDescriptions[index] || "Fine art photography print - limited edition available for collectors and art enthusiasts";
        }
        
        // Original descriptions for full collection
        const descriptions = [
            // Portraits
            "Professional portrait session capturing authentic emotion and personality",
            "Contemporary portrait study with artistic flair and technical precision",
            "Artistic portrait photography showcasing natural beauty and character",
            "Professional portrait session with dramatic lighting and composition",
            "Fine art portrait photography combining technical skill with creative vision",
            
            // Architecture
            "Modern glass architecture meets twilight - contemporary urban elegance",
            "Bold architectural photography showcasing contemporary design against blue sky",
            "Urban skyscraper reaching toward infinity - geometric precision in architecture",
            "Geometric roof design study - modern architectural photography",
            "Contemporary office building captured during the golden hour",
            "Urban high-rise photography - nighttime architectural study",
            
            // Urban Life
            "Street photography capturing the flow and energy of urban movement",
            "Documentary urban photography - everyday life in the modern city",
            "Atmospheric city street photography during evening rain",
            "Urban cyclist in motion - contemporary street photography",
            "Modern life moment - person with technology in urban setting",
            "City skyline illuminated against the evening sky",
            
            // Nature & Wildlife
            "Macro nature photography - bee pollinating purple garden flower",
            "Bird silhouette against golden sunset - nature photography at its finest",
            "Delicate butterfly on vibrant orange bloom - macro wildlife photography",
            "Peaceful duck gliding through calm water - serene nature study",
            "Macro photography capturing tiny ladybug on grass blade",
            "White butterfly resting on tree trunk - delicate nature photography",
            
            // Landscapes
            "Golden sunset over peaceful lake with trees - serene landscape photography",
            "Solitary island at sunset - contemplative landscape study",
            "Bridge silhouette at twilight - moody landscape photography",
            "River sunset with dramatic clouds - landscape photography",
            "Urban ferris wheel in city park - contemporary landscape study",
            "Colorful sunset sky over urban buildings - dramatic landscape",
            
            // Street Photography
            "Candid street photography - person walking dog in quiet alley",
            "Urban street photography capturing two people in natural moment",
            "Street scene - woman walking past neighborhood flower shop",
            "Urban observer - person standing near modern building",
            "Urban wildlife - seagull perched on city building rooftop",
            "Street photography - two pigeons on sandy urban ground",
            
            // Fine Art
            "Minimalist floral study - single daisy in perfect focus",
            "Abstract play of natural light and shadow on concrete wall",
            "Architectural minimalism - empty staircase with dramatic shadow",
            "Elegant gardenia flower against dark background - fine art botanical",
            "Single yellow flower study - minimalist nature photography",
            "Purple flower against green background - color study photography"
        ];
        return descriptions[index] || "A captivating moment transformed into fine art - available as a limited edition print";
    }
    
    // Generate SEO-friendly alt text
    generateAltText(filename, index) {
        const category = this.generateCategory(index, filename);
        const title = this.generateTitle(index, filename);
        return `${title} - ${category} photography fine art print by Bisnak Studio Montreal photographer`;
    }
    
    // Generate Shopify URLs and Product IDs
    generateShopifyUrl(filename) {
        // Your Shopify store URL
        const baseUrl = "https://bisnakstudio.myshopify.com/products/";
        
        // Generate slug from filename
        const slug = filename
            .replace('portraits/', '')
            .replace('.jpg', '')
            .replace(/_/g, '-')
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        
        // Default product ID for all images (you can customize specific ones later)
        const defaultProductId = '9874643812674';
        
        // Special mappings for specific images if needed
        const productData = {
            'Concrete-stairway-with-a-shadow-of-a-tree.jpg': {
                slug: 'concrete-light-an-ode-to-shadows',
                productId: '9874643812674'
            },
            'Large-Ferris-wheel-near-water.jpg': {
                slug: 'ferris-wheel-waterfront-view',
                productId: '9874643452226'
            },
            'Modern-buildings-against-a-clear-blue-sky.jpg': {
                slug: 'modern-buildings-blue-sky-architecture',
                productId: '9872979394882'
            }
        };
        
        const product = productData[filename] || {
            slug: slug,
            productId: defaultProductId
        };
        
        return {
            url: `${baseUrl}${product.slug}`,
            productId: product.productId
        };
    }
    
    // Create the carousel
    createCarousel() {
        // Create images for infinite loop (duplicate images at both ends)
        const imagesToShow = [
            ...this.images.slice(-3), // Last 3 images at the beginning
            ...this.images,           // All original images
            ...this.images.slice(0, 3) // First 3 images at the end
        ];
        
        imagesToShow.forEach((imageData, index) => {
            this.createImageElement(imageData, index);
        });
        
        // Start at the first real image (after the duplicated last images)
        this.currentPosition = 3;
        this.updateCarousel(false); // Update without animation
        
        // Don't set any image as active by default - only on hover
    }
    
    // Create individual image element
    createImageElement(imageData, index) {
        const container = document.createElement('div');
        container.className = 'image-container';
        container.style.animationDelay = `${index * 0.1}s`;
        
        const img = document.createElement('img');
        img.className = 'carousel-image';
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.loading = 'lazy';
        
        const description = document.createElement('div');
        description.className = 'image-description';
        description.innerHTML = `
            <div class="image-title">${imageData.title}</div>
        `;
        
        // Click event for modal
        container.addEventListener('click', () => {
            this.openModal(imageData);
        });
        
        // Handle image load errors
        img.addEventListener('error', () => {
            console.warn(`Failed to load image: ${imageData.src}`);
            container.style.display = 'none';
        });
        
        container.appendChild(img);
        container.appendChild(description);
        this.carouselTrack.appendChild(container);
    }
    
    // Bind all event listeners
    bindEvents() {
        // Mouse wheel and trackpad for horizontal scrolling
        let scrollTimeout;
        let isScrolling = false;
        
        this.carouselContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Debounce rapid scroll events from trackpad
            if (isScrolling) return;
            
            this.handleWheelScroll(e);
            
            // Prevent rapid firing on trackpad
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150); // Adjust this value if needed
        }, { passive: false });
        
        // Touch/drag support for mobile and trackpad  
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        this.carouselContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            this.carouselContainer.style.cursor = 'grabbing';
        });
        
        this.carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            // Only respond to horizontal drags (ignore small vertical movements)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
                if (deltaX > 0) {
                    this.previousImage();
                } else {
                    this.nextImage();
                }
                isDragging = false;
                this.carouselContainer.style.cursor = 'grab';
            }
        });
        
        this.carouselContainer.addEventListener('mouseup', () => {
            isDragging = false;
            this.carouselContainer.style.cursor = 'grab';
        });
        
        // Prevent drag on images
        this.carouselContainer.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextImage();
            } else if (e.key === 'ArrowLeft') {
                this.previousImage();
            } else if (e.key === 'Escape') {
                this.closeModal();
            }
        });
        
        // Modal events
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }
    
    // Handle mouse wheel and trackpad scrolling
    handleWheelScroll(e) {
        if (this.isAnimating) return;
        
        // Detect trackpad vs mouse wheel
        const isTrackpad = Math.abs(e.deltaY) < 50;
        const threshold = isTrackpad ? 5 : 0; // Lower threshold for trackpad
        
        let delta;
        
        if (isTrackpad) {
            // For trackpad, use deltaX if available (horizontal scroll)
            delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        } else {
            // For mouse wheel, use deltaY
            delta = e.deltaY;
        }
        
        // Only proceed if delta is significant enough
        if (Math.abs(delta) > threshold) {
            if (delta > 0) {
                this.nextImage();
            } else {
                this.previousImage();
            }
        }
    }
    
    // Move to next image
    nextImage() {
        if (this.isAnimating) return;
        
        this.currentPosition++;
        this.updateCarousel();
    }
    
    // Move to previous image
    previousImage() {
        if (this.isAnimating) return;
        
        this.currentPosition--;
        this.updateCarousel();
    }
    
    // Go to specific slide
    goToSlide(index) {
        if (this.isAnimating) return;
        
        this.currentPosition = index;
        this.updateCarousel();
    }
    
    // Update carousel position
    updateCarousel(animate = true) {
        this.isAnimating = animate;
        
        const translateX = -this.currentPosition * this.imageWidth;
        
        if (animate) {
            this.carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            this.carouselTrack.style.transition = 'none';
        }
        
        this.carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Handle infinite loop
        if (animate) {
            setTimeout(() => {
                // If we're at the end duplicates, jump to the real beginning
                if (this.currentPosition >= this.totalImages + 3) {
                    this.carouselTrack.style.transition = 'none';
                    this.currentPosition = 3; // Jump to first real image
                    this.carouselTrack.style.transform = `translateX(${-this.currentPosition * this.imageWidth}px)`;
                    
                    setTimeout(() => {
                        this.carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                } 
                // If we're at the beginning duplicates, jump to the real end
                else if (this.currentPosition < 3) {
                    this.carouselTrack.style.transition = 'none';
                    this.currentPosition = this.totalImages + 2; // Jump to last real image
                    this.carouselTrack.style.transform = `translateX(${-this.currentPosition * this.imageWidth}px)`;
                    
                    setTimeout(() => {
                        this.carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 50);
                }
                
                this.isAnimating = false;
            }, 600);
        } else {
            this.isAnimating = false;
        }
    }
    
    // Open image modal
    openModal(imageData) {
        // Store the original main image data
        this.originalImageData = imageData;
        
        // Find current image index
        const currentIndex = this.images.findIndex(img => img.src === imageData.src);
        
        // Create mockup images array based on available mockups
        this.currentModalImages = imageData.mockups.map((mockupSrc, index) => ({
            src: mockupSrc,
            title: `${imageData.title} - Print Mockup ${index + 1}`,
            description: `${imageData.description} - Available as fine art print`,
            alt: `${imageData.alt} - Print mockup ${index + 1}`
        }));
        
        this.currentModalIndex = 0;
        
        // Hide all thumbnails first
        const thumbnailElements = [this.modalImageSmall1, this.modalImageSmall2, this.modalImageSmall3];
        const thumbnailContainers = document.querySelectorAll('.modal-image-small');
        
        thumbnailContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        // Set up only the available thumbnail images
        this.currentModalImages.forEach((mockupImage, index) => {
            if (index < 3 && thumbnailElements[index]) {
                thumbnailElements[index].src = mockupImage.src;
                thumbnailElements[index].alt = mockupImage.alt;
                thumbnailContainers[index].style.display = 'block';
            }
        });
        
        // Set initial large image (main image) and text content
        this.modalImageLarge.src = imageData.src;
        this.modalImageLarge.alt = imageData.alt;
        this.modalTitle.textContent = imageData.title;
        this.modalDescription.textContent = imageData.description;
        
        // Create Shopify Buy Button for this product
        console.log('Opening modal for product ID:', imageData.productId);
        
        // Add a temporary fallback button immediately
        const container = document.getElementById('shopify-buy-button-container');
        if (container) {
            container.innerHTML = `
                <button class="shopify-button" onclick="window.open('${imageData.shopifyUrl}', '_blank')" 
                        style="width: 100%; padding: 12px 30px; background-color: #002369; color: #fffce8; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">
                    Buy Print
                </button>
            `;
        }
        
        // Use the callback system to create buy button when ready
        if (window.shopifyBuyButton) {
            window.shopifyBuyButton.onReady(() => {
                console.log('Creating Shopify buy button for product:', imageData.productId);
                window.shopifyBuyButton.createBuyButton(imageData.productId, 'shopify-buy-button-container');
            });
        }
        
        // Add click handlers for thumbnails
        this.setupThumbnailHandlers();
        
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Update modal content based on selected thumbnail
    updateModalContent(index) {
        // Check if the index is valid
        if (index >= this.currentModalImages.length) return;
        
        this.currentModalIndex = index;
        const selectedImage = this.currentModalImages[index];
        
        // Update large image (show the mockup image when thumbnail is clicked)
        this.modalImageLarge.src = selectedImage.src;
        this.modalImageLarge.alt = selectedImage.alt;
        
        // Update text content
        this.modalTitle.textContent = selectedImage.title;
        this.modalDescription.textContent = selectedImage.description;
        
        // Keep the same Shopify Buy Button (always references the original main image product)
        // No need to recreate the buy button as it should always be for the main image product
    }
    
    // Setup click handlers for thumbnails
    setupThumbnailHandlers() {
        document.querySelectorAll('.modal-image-small').forEach((thumb, index) => {
            // Only add click handler if the thumbnail is visible and has a corresponding mockup
            if (thumb.style.display !== 'none' && index < this.currentModalImages.length) {
                thumb.onclick = (e) => {
                    const dataIndex = parseInt(thumb.getAttribute('data-index'));
                    this.updateModalContent(dataIndex);
                };
            } else {
                // Remove click handler for hidden thumbnails
                thumb.onclick = null;
            }
        });
    }
    
    // Close image modal
    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HorizontalCarousel();
    initializePortfolioFilters();
});

// Add smooth scrolling utility
function addScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.textContent = 'SCROLL';
    document.body.appendChild(indicator);
}

// Portfolio filtering functionality
function initializePortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter work items
            workItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Animate in with delay
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
    
    // Make featured and work items clickable (open modal)
    const featuredItems = document.querySelectorAll('.featured-item');
    const allPortfolioItems = [...featuredItems, ...workItems];
    
    allPortfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                // Find the corresponding image in the carousel and open its modal
                const carousel = window.carouselInstance;
                if (carousel) {
                    // You could implement logic to find and open the corresponding modal
                    console.log('Portfolio item clicked:', img.alt);
                }
            }
        });
    });
}

// Shopify Buy Button Integration
class ShopifyBuyButton {
    constructor() {
        this.client = null;
        this.ui = null;
        this.currentComponent = null;
        this.isReady = false;
        this.readyCallbacks = [];
        this.init();
    }

    init() {
        this.loadShopifySDK();
    }

    // Add callback for when UI is ready
    onReady(callback) {
        if (this.isReady) {
            callback();
        } else {
            this.readyCallbacks.push(callback);
        }
    }

    // Execute all callbacks when ready
    executeReadyCallbacks() {
        this.isReady = true;
        this.readyCallbacks.forEach(callback => callback());
        this.readyCallbacks = [];
    }

    loadShopifySDK() {
        const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        
        if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
                this.initializeShopify();
            } else {
                this.loadScript(scriptURL);
            }
        } else {
            this.loadScript(scriptURL);
        }
    }

    loadScript(url) {
        const script = document.createElement('script');
        script.async = true;
        script.src = url;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = () => this.initializeShopify();
    }

    initializeShopify() {
        console.log('Initializing Shopify client...');
        
        // You need to replace this with your actual Storefront API access token
        // To get one: Shopify Admin → Settings → Apps → Develop apps → Create app → Configure Storefront API
        // Required scopes: unauthenticated_read_product_listings, unauthenticated_write_checkouts, unauthenticated_read_checkouts
        const accessToken = '582f3435751d115dcbd1d401e4a8c405'; // Replace with your new token after enabling the correct scopes
        
        this.client = ShopifyBuy.buildClient({
            domain: 'bisnakstudio.myshopify.com',
            storefrontAccessToken: accessToken
        });

        console.log('Client created, waiting for UI...');
        ShopifyBuy.UI.onReady(this.client).then((ui) => {
            console.log('Shopify UI ready!');
            this.ui = ui;
            this.executeReadyCallbacks(); // Execute any pending callbacks
        }).catch((error) => {
            console.error('Error initializing Shopify UI:', error);
            console.error('This is likely due to an invalid storefront access token');
            console.error('Please check your Shopify app configuration');
        });
    }

    createBuyButton(productId, containerId) {
        console.log('createBuyButton called with:', productId, containerId);
        
        if (!this.ui) {
            console.warn('Shopify UI not ready yet');
            return;
        }

        // Clear existing component
        if (this.currentComponent) {
            console.log('Destroying existing component');
            this.currentComponent.destroy();
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        console.log('Container found, creating buy button');
        // Clear container
        container.innerHTML = '';

        try {
            this.currentComponent = this.ui.createComponent('product', {
                id: productId,
                node: container,
                moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
                product: {
                    styles: {
                        product: {
                            '@media (min-width: 601px)': {
                                'max-width': '100%',
                                'margin-left': '0px',
                                'margin-bottom': '0px'
                            }
                        },
                        button: {
                            'font-family': 'PPMonumentNormal, sans-serif',
                            'font-size': '14px',
                            'padding-top': '12px',
                            'padding-bottom': '12px',
                            'color': '#fffce8',
                            ':hover': {
                                'color': '#fffce8',
                                'background-color': 'rgba(0, 35, 105, 0.8)'
                            },
                            'background-color': '#002369',
                            ':focus': {
                                'background-color': 'rgba(0, 35, 105, 0.8)'
                            },
                            'border-radius': '6px',
                            'padding-left': '30px',
                            'padding-right': '30px',
                            'font-weight': '600'
                        },
                        quantityInput: {
                            'font-size': '14px',
                            'padding-top': '12px',
                            'padding-bottom': '12px'
                        }
                    },
                    contents: {
                        img: false,
                        title: false,
                        price: false
                    },
                    text: {
                        button: 'Buy Print'
                    }
                },
                cart: {
                    styles: {
                        button: {
                            'font-family': 'PPMonumentNormal, sans-serif',
                            'font-size': '14px',
                            'padding-top': '12px',
                            'padding-bottom': '12px',
                            'color': '#fffce8',
                            ':hover': {
                                'color': '#fffce8',
                                'background-color': 'rgba(0, 35, 105, 0.8)'
                            },
                            'background-color': '#002369',
                            ':focus': {
                                'background-color': 'rgba(0, 35, 105, 0.8)'
                            },
                            'border-radius': '6px'
                        },
                        cart: {
                            'background-color': '#fffce8',
                            'border': '1px solid #002369'
                        },
                        lineItem: {
                            'border-bottom': '1px solid #e0e0e0',
                            'padding': '10px 0'
                        },
                        variantTitle: {
                            'color': '#002369',
                            'font-family': 'PPMonumentNormal, sans-serif'
                        },
                        quantity: {
                            'color': '#002369'
                        },
                        quantityIncrement: {
                            'color': '#002369',
                            'border-color': '#002369',
                            ':hover': {
                                'background-color': '#f0f0f0'
                            }
                        },
                        quantityDecrement: {
                            'color': '#002369',
                            'border-color': '#002369',
                            ':hover': {
                                'background-color': '#f0f0f0'
                            }
                        },
                        quantityInput: {
                            'color': '#002369',
                            'border-color': '#002369'
                        }
                    },
                    text: {
                        total: 'Subtotal',
                        button: 'Checkout',
                        empty: 'Your cart is empty',
                        notice: 'Shipping and taxes calculated at checkout.'
                    },
                    contents: {
                        note: true,
                        discounts: true
                    }
                },
                toggle: {
                    styles: {
                        toggle: {
                            'font-family': 'PPMonumentNormal, sans-serif',
                            'background-color': '#002369',
                            ':hover': {
                                'background-color': 'rgba(0, 35, 105, 0.8)'
                            },
                            ':focus': {
                                'background-color': 'rgba(0, 35, 105, 0.8)'
                            }
                        },
                        count: {
                            'font-size': '14px',
                            'color': '#fffce8',
                            ':hover': {
                                'color': '#fffce8'
                            }
                        },
                        iconPath: {
                            'fill': '#fffce8'
                        }
                    }
                }
            }
        });
        console.log('Buy button component created successfully');
        } catch (error) {
            console.error('Error creating buy button:', error);
            console.error('This could be due to:');
            console.error('1. Invalid storefront access token (401 Unauthorized)');
            console.error('2. Product ID not found in your store');
            console.error('3. Insufficient API permissions');
            
            // Fallback: create a simple link button that goes directly to product page
            container.innerHTML = `
                <a href="${this.getProductUrl(productId)}" 
                   target="_blank" 
                   class="shopify-button" 
                   style="display: inline-block; text-decoration: none; text-align: center; width: 100%; padding: 12px 30px; background-color: #002369; color: #fffce8; border: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                   Buy Print
                </a>
            `;
        }
    }

    // Helper method to get product URL based on product ID
    getProductUrl(productId) {
        // Map product IDs to their URLs as fallback
        const productUrls = {
            '9874643812674': 'https://bisnakstudio.myshopify.com/products/concrete-light-an-ode-to-shadows',
            '9874643059010': 'https://bisnakstudio.myshopify.com/products/single-white-daisy-botanical-art',
            '9874643452226': 'https://bisnakstudio.myshopify.com/products/ferris-wheel-waterfront-view',
            '9872979394882': 'https://bisnakstudio.myshopify.com/products/modern-buildings-blue-sky-architecture'
        };
        
        return productUrls[productId] || 'https://bisnakstudio.myshopify.com/products/concrete-light-an-ode-to-shadows';
    }
}

// Initialize Shopify Buy Button
const shopifyBuyButton = new ShopifyBuyButton();
window.shopifyBuyButton = shopifyBuyButton; // Make it globally accessible
