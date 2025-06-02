document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  // Progress Bar Animation
  // =============================================
  // This animation creates a progress bar at the top of the page
  // that fills up as the user scrolls down the page
  const progressBar = document.getElementById('progress-bar');
  const updateProgressBar = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if(progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  };

  window.addEventListener('scroll', updateProgressBar);
  window.addEventListener('load', updateProgressBar);

  // =============================================
  // Color Circle Image Switcher
  // =============================================
  // This functionality allows users to switch product images
  // by clicking on different color circles
  const colorCircles = document.querySelectorAll('.right-card-container .block.rounded-full');
  const mainImage = document.querySelector('.right-card-container img');

  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      const newImageSrc = circle.getAttribute('data-image-src');
      if (mainImage && newImageSrc) {
        mainImage.src = newImageSrc;
      }
    });
  });

  // =============================================
  // Custom Cursor Animation
  // =============================================
  // This creates a custom cursor that follows the mouse with a smooth animation
  // and changes appearance when hovering over interactive elements
  const customCursor = document.getElementById('custom-cursor');
  if (customCursor) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const easingFactor = 0.15; // Controls how smoothly the cursor follows the mouse

    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * easingFactor;
      cursorY += (mouseY - cursorY) * easingFactor;
      customCursor.style.left = cursorX + 'px';
      customCursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, img, input, textarea, select, .color-circle');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        customCursor.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        customCursor.style.border = '2px solid black';
      });

      element.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
        customCursor.style.backgroundColor = 'black';
        customCursor.style.border = 'none';
      });
    });
  }

  // =============================================
  // Click Wave Animation
  // =============================================
  // Creates a ripple effect animation when clicking anywhere on the page
  document.addEventListener('click', (e) => {
    const wave = document.createElement('div');
    wave.classList.add('click-wave');
    wave.style.left = e.clientX + 'px';
    wave.style.top = e.clientY + 'px';
    document.body.appendChild(wave);

    wave.addEventListener('animationend', () => {
      wave.remove();
    });
  });

  // =============================================
  // Product Data
  // =============================================
  // Sample data for different product categories
  const newsItemsProducts = [
    {
      imageSrc: '/homepage/img/crocs.img/crocs coklat.png',
      name: 'Crocs Classic Clog - Beige',
      price: 'Rp 350.000',
      rating: '4.9'
    },
    {
      imageSrc: '/homepage/img/crocs.img/crocs black.png',
      name: 'Crocs Classic Clog - Black',
      price: 'Rp 350.000',
      rating: '5.0'
    },
    {
      imageSrc: '/homepage/img/crocs.img/crocs lagoon (1).png',
      name: 'Crocs Classic Clog - Dark Blue',
      price: 'Rp 350.000',
      rating: '4.8'
    },
    {
      imageSrc: '/homepage/img/crocs.img/white crocs.png',
      name: 'Crocs Classic Clog - White',
      price: 'Rp 350.000',
      rating: '5.0'
    },
  ];

  const recommendedProducts = [
    {
      imageSrc: '/homepage/img/sepatu.img/adidas whire.jpg',
      name: 'Adidas Campus Off White',
      price: 'Rp 1.000.000',
      rating: '4.5'
    },
    {
      imageSrc: '/homepage/img/topi/topi hiaju .jpg',
      name: 'New Era 940 Snapbcak X Boston Celtics',
      price: 'Rp 500.000',
      rating: '4.2'
    },
    {
      imageSrc: '/homepage/img/sepatu.img/nike biru.jpg',
      name: 'Air Jordan 1 Retro High OG Hyper Royal',
      price: 'Rp 3.500.000',
      rating: '4.7'
    },
    {
      imageSrc: '/homepage/img/clothes.img/baju pink.heic',
      name: 'Nike Dunk HI PRM',
      price: '1.200.000',
      rating: '4.9'
    },
  ];

  const clothingProducts = [
    {
      imageSrc: '/homepage/img/clothes.img/baju pink.heic',
      name: 'Nike Thorns Reworked Hoodie Upcycle',
      price: 'Rp 400.000 ',
      rating: '4.8'
    },
    {
      imageSrc: '/homepage/img/clothes.img/baju crewneck.heic',
      name: 'TOPTEN CREWNECK REWORKED NIGHT VISION',
      price: 'Rp 500.000 ',
      rating: '4.6'
    },
    {
      imageSrc: '/homepage/img/clothes.img/baju diamond.heic',
      name: 'Crewneck Reworked Diamond Y2K',
      price: 'Rp 300.000',
      rating: '4.9'
    },
    {
      imageSrc: '/homepage/img/clothes.img/baju biru.heic',
      name: 'Reworked Nike Hoodie Skeleton Flames',
      price: 'Rp 1.000.000',
      rating: '4.7'
    }
  ];

  // =============================================
  // Product Card Generation
  // =============================================
  // Function to create HTML for product cards
  function generateProductCardHtml(product) {
    return `
      <div class="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a class="relative mx-3 mt-3 flex h-[240px] overflow-hidden rounded-xl" href="#">
          <img class="object-cover w-[300px] h-[240px]" src="${product.imageSrc}" alt="product image" />
          <span class="absolute top-2 right-2 text-gray-600 z-10 like-button" data-product='${JSON.stringify(product)}'>
            <i class="fas fa-heart"></i>
          </span>
        </a>
        <div class="mt-4 px-5 pb-5 flex flex-col">
          <a href="#">
            <h5 class="text-1xl tracking-tight text-slate-900">${product.name}</h5>
          </a>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">${product.price}</span>
            </p> 
            <div class="flex items-center">
              <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.o-rg/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">${product.rating}</span>
            </div>
          </div>
          <a href="/homepage/shopping-cart.html" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart</a>
        </div>
      </div>
    `;
  }

  // =============================================
  // Product Display and Navigation
  // =============================================
  // Function to display products in the grid
  const productGridContainer = document.getElementById('product-grid-container');

  function displayProducts(products) {
    if (productGridContainer) {
      productGridContainer.innerHTML = '';
      products.forEach(product => {
        productGridContainer.innerHTML += generateProductCardHtml(product);
      });
      addLikeButtonFunctionality();
    }
  }

  // Function to handle like button functionality
  function addLikeButtonFunctionality() {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(button => {
      const product = JSON.parse(button.getAttribute('data-product'));
      const heartIcon = button.querySelector('i');
      
      // Check if product is already liked
      const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
      const isLiked = favoriteItems.some(item => item.name === product.name);
      
      if (isLiked) {
        heartIcon.classList.remove('text-gray-600');
        heartIcon.classList.add('text-red-500');
      }

      button.addEventListener('click', (e) => {
        e.preventDefault();
        const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
        const isLiked = favoriteItems.some(item => item.name === product.name);

        if (isLiked) {
          // Remove from favorites
          const updatedFavorites = favoriteItems.filter(item => item.name !== product.name);
          localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));
          heartIcon.classList.remove('text-red-500');
          heartIcon.classList.add('text-gray-600');
        } else {
          // Add to favorites
          favoriteItems.push(product);
          localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
          heartIcon.classList.remove('text-gray-600');
          heartIcon.classList.add('text-red-500');
        }
      });
    });
  }

  // Get all navigation buttons and container
  const recommendButton = document.getElementById('recommend-button');
  const newsItemButton = document.getElementById('news-item-button');
  const clothesButton = document.querySelector('button:nth-of-type(3)');
  const shoeButton = document.querySelector('button:nth-of-type(4)');

  // Display initial products
  displayProducts(newsItemsProducts);

  // Function to update button styles
  function updateButtonStyles(activeButton) {
    [recommendButton, newsItemButton, clothesButton, shoeButton].forEach(button => {
      if (button === activeButton) {
        button.classList.add('bg-gray-800', 'text-white');
        button.classList.remove('text-gray-800');
      } else {
        button.classList.remove('bg-gray-800', 'text-white');
        button.classList.add('text-gray-800');
      }
    });
  }

  // Add click event listeners for all navigation buttons
  if (recommendButton) {
    recommendButton.addEventListener('click', () => {
      displayProducts(recommendedProducts);
      updateButtonStyles(recommendButton);
    });
  }

  if (newsItemButton) {
    newsItemButton.addEventListener('click', () => {
      displayProducts(newsItemsProducts);
      updateButtonStyles(newsItemButton);
    });
  }

  if (clothesButton) {
    clothesButton.addEventListener('click', () => {
      displayProducts(clothingProducts);
      updateButtonStyles(clothesButton);
    });
  }

  if (shoeButton) {
    shoeButton.addEventListener('click', () => {
      displayProducts(newsItemsProducts);
      updateButtonStyles(shoeButton);
    });
  }

  // =============================================
  // Parallax Scrolling Text Animation
  // =============================================
  
  // Get all text elements with data-direction attribute
  const leftTexts = document.querySelectorAll('[data-direction="left"]');
  const rightTexts = document.querySelectorAll('[data-direction="right"]');
  
  // Function to handle parallax scrolling for Rapoy Store section
  function handleParallaxScroll() {
    const scrollY = window.scrollY;
    const speed = 0.5;
    
    // Move left texts to the left
    leftTexts.forEach(text => {
      const isTestimonial = text.closest('.bg-neutral-950') !== null;
      if (!isTestimonial) {
        const translateX = -scrollY * speed;
        text.style.transform = `translateX(${translateX}px)`;
      }
    });
    
    // Move right texts to the right
    rightTexts.forEach(text => {
      const isTestimonial = text.closest('.bg-neutral-950') !== null;
      if (!isTestimonial) {
        const translateX = scrollY * speed;
        text.style.transform = `translateX(${translateX}px)`;
      }
    });
  }

  // =============================================
  // Testimonial Auto Animation
  // =============================================
  let testimonialPositions = {
    left1: 0,
    right1: 0,
    left2: 0,
    right2: 0,
    left3: 0,
    right3: 0,
    left4: 0,
    right4: 0
  };
  let testimonialAnimationFrame;

  function animateTestimonial() {
    // Update positions with same speed
    testimonialPositions.left1 -= 1;
    testimonialPositions.right1 += 1;
    testimonialPositions.left2 -= 1;
    testimonialPositions.right2 += 1;
    testimonialPositions.left3 -= 1;
    testimonialPositions.right3 += 1;
    testimonialPositions.left4 -= 1;
    testimonialPositions.right4 += 1;

    // Apply transforms without modifying DOM content
    const testimonialTexts = document.querySelectorAll('.bg-neutral-950 [data-direction]');
    testimonialTexts.forEach((text, index) => {
      const positionKey = `${text.getAttribute('data-direction')}${Math.floor(index/2) + 1}`;
      let position = testimonialPositions[positionKey];

      // Reset position when it reaches a certain threshold to create illusion of infinite scroll
      const maxPosition = 2000;
      if (positionKey.startsWith('left') && position < -maxPosition) {
        testimonialPositions[positionKey] = 0;
        position = 0;
      } else if (positionKey.startsWith('right') && position > maxPosition) {
        testimonialPositions[positionKey] = 0;
        position = 0;
      }

      text.style.transform = `translateX(${position}px)`;
    });

    testimonialAnimationFrame = requestAnimationFrame(animateTestimonial);
  }

  // Start testimonial animation
  animateTestimonial();
  
  // Add scroll event listener with requestAnimationFrame for smooth animation
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallaxScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Initial call to set initial positions
  handleParallaxScroll();

  // Pause testimonial animation when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(testimonialAnimationFrame);
    } else {
      animateTestimonial();
    }
  });

  // =============================================
  // Popular Brands Auto Scroll Animation
  // =============================================
  const brandScrollContainer = document.getElementById('brand-scroll-container');
  let scrollPosition = 0;
  let scrollSpeed = 1; // Adjust speed as needed
  let brandAnimationFrame;
  let originalBrandWidth = 0; // To store the total width of one set of brands

  // Duplicate brands for seamless loop (need enough to fill the container twice)
  if (brandScrollContainer) {
    const brands = Array.from(brandScrollContainer.children);
    const numBrands = brands.length;
    // Duplicate original brands once for a simple loop
    for (let i = 0; i < numBrands; i++) {
      brandScrollContainer.appendChild(brands[i].cloneNode(true));
    }
    // Calculate the total width of the original set of brands for reset threshold
    // This is an approximation; might need fine-tuning based on exact styling/gap
    const brandWidth = brands[0].offsetWidth; // Assume all brands have same width
    const gap = parseFloat(getComputedStyle(brands[0]).marginRight); // Get the gap between brands
    originalBrandWidth = (brandWidth + gap) * numBrands;
  }

  function animateBrands() {
    if (!brandScrollContainer) return; // Simplified check

    scrollPosition -= scrollSpeed;

    // Reset position when scrolled past the original set of brands
    // Use a threshold based on the estimated width of one set
    const resetThreshold = originalBrandWidth;
    if (scrollPosition <= -resetThreshold) {
      scrollPosition = 0; // Reset position to the beginning
    }

    brandScrollContainer.style.transform = `translateX(${scrollPosition}px)`;
    brandAnimationFrame = requestAnimationFrame(animateBrands);
  }

  // Start brand animation if container exists
  if (brandScrollContainer) {
    animateBrands();

    // Pause on hover
    brandScrollContainer.parentElement.addEventListener('mouseenter', () => {
      cancelAnimationFrame(brandAnimationFrame);
    });

    brandScrollContainer.parentElement.addEventListener('mouseleave', () => {
      animateBrands();
    });
  }

  // =============================================
  // Scroll Animation Setup
  // =============================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  let lastScrollY = 0;
  let scrollDirection = 'down';

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    lastScrollY = currentScrollY;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const targetElement = entry.target;
      const animateOnScrollDirection = targetElement.classList.contains('animate-on-scroll-direction');

      if (entry.isIntersecting) {
        targetElement.classList.remove('opacity-0', '-translate-y-8', 'translate-y-8'); // Remove initial state classes
        targetElement.classList.add('animate-in');
        // For elements animating based on scroll direction, unobserve once animated to avoid re-triggering on scroll up unless specifically handled
        // if (animateOnScrollDirection) {
        //     observer.unobserve(targetElement);
        // }
      } else {
        // Element is leaving the viewport
        targetElement.classList.remove('animate-in');

        // For elements animating based on scroll direction, reset the initial position based on scroll direction for next entry
        if (animateOnScrollDirection) {
           targetElement.classList.add('opacity-0'); // Make it invisible again
           if (scrollDirection === 'down') {
             targetElement.classList.add('-translate-y-8'); // Prepare to slide down next time
             targetElement.classList.remove('translate-y-8');
           } else {
             targetElement.classList.add('translate-y-8'); // Prepare to slide up next time
             targetElement.classList.remove('-translate-y-8');
           }
        } else {
            // For other elements, just reset opacity and maintain slide-down initial state
            targetElement.classList.add('opacity-0');
            if (!targetElement.classList.contains('-translate-y-8') && !targetElement.classList.contains('translate-y-8')) {
                 targetElement.classList.add('-translate-y-8'); // Default to slide down if no initial state
            }
        }
      }
    });
  }, observerOptions);

  // Add animation classes and observe elements
  function setupScrollAnimations() {
    // Hero section elements
    const heroContent = document.querySelector('.text-center.pt-30');
    if (heroContent) {
      heroContent.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-1000');
      observer.observe(heroContent);
    }

    // Banner cards (left and right)
    const bannerCards = document.querySelectorAll('.left-card-container, .right-card-container');
    bannerCards.forEach(card => {
         // Add initial state and observe. The observer will handle the scroll direction animation.
         card.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-700');
         observer.observe(card);
    });


    // Product cards
    const productCards = document.querySelectorAll('#product-grid-container > div');
    productCards.forEach((card, index) => {
      card.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-700');
      card.style.transitionDelay = `${index * 100}ms`;
      observer.observe(card);
    });

    // Why Choose Us cards
    const whyChooseUsCards = document.querySelectorAll('.why-choose-us-card');
      whyChooseUsCards.forEach((card, index) => {
        // Add initial state and observe. The observer will handle the scroll direction animation.
        card.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-700');
        card.style.transitionDelay = `${index * 250}ms`; // Increased delay for a more gradual effect
        observer.observe(card);
      });

    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.bg-neutral-950 .bg-neutral-900');
    testimonialCards.forEach((card, index) => {
      card.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-700');
      card.style.transitionDelay = `${index * 150}ms`;
      observer.observe(card);
    });

    // Popular Brands items
    const brandItems = document.querySelectorAll('.pt-0.pb-0 .flex-shrink-0.w-64');
    brandItems.forEach((item, index) => {
      item.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-700');
      item.style.transitionDelay = `${index * 100}ms`;
      observer.observe(item);
    });

    // Observe main section titles and paragraphs as well
     const mainContentText = document.querySelectorAll(
      '.pt-20.pb-12 h2, .pt-20.pb-12 p,' + // Popular products title
      '.bg-white.py-17 h2,' + // Why Choose Us title
      '.bg-neutral-950 h2, .bg-neutral-950 p,' + // Testimonials title and description
      '.max-w-7xl h2, .max-w-7xl p' // Select main titles/paragraphs within max-w-7xl containers
     );

     mainContentText.forEach(element => {
        element.classList.add('opacity-0', '-translate-y-8', 'transition-all', 'duration-1000');
        observer.observe(element);
     });
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Initialize scroll animations
  setupScrollAnimations();

  // =============================================
  // Smooth Scroll for Anchor Links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
