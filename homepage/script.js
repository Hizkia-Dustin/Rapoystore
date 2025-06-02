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
    progressBar.style.width = `${scrollPercent}%`;
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
  if (!customCursor) return;

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
              <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
  function displayProducts(products) {
    if (productGridContainer) {
      productGridContainer.innerHTML = '';
      products.forEach(product => {
        productGridContainer.innerHTML += generateProductCardHtml(product);
      });

      // Add like button functionality after rendering products
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
  const productGridContainer = document.getElementById('product-grid-container');

  // Display initial products
  displayProducts(newsItemsProducts);

  // Function to update button styles
  function updateButtonStyles(activeButton) {
    [recommendButton, newsItemButton, clothesButton, shoeButton].forEach(button => {
      if (button === activeButton) {
        button.classList.add('bg-gray-800', 'text-white');
      } else {
        button.classList.remove('bg-gray-800', 'text-white');
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

  // Get all elements with data-direction attribute
  const parallaxTexts = document.querySelectorAll('[data-direction]');

  // Function to update parallax effect on scroll
  function updateParallax() {
    const scrollY = window.scrollY; // Get current vertical scroll position

    parallaxTexts.forEach(textElement => {
      const direction = textElement.getAttribute('data-direction');
      let translation = 0;

      // Calculate horizontal translation based on scroll position and direction
      // Adjust the multiplier (e.g., 0.2) to control the parallax speed/intensity
      if (direction === 'left') {
        translation = -scrollY * 0.2; // Move left as scrolling down
      } else if (direction === 'right') {
        translation = scrollY * 0.2;  // Move right as scrolling down
      }

      // Apply the translation using CSS transform
      textElement.style.transform = `translateX(${translation}px)`;
    });
  }

  // Add event listener for scroll
  window.addEventListener('scroll', updateParallax);

  // Initial update on page load
  updateParallax();
});




