document.addEventListener('DOMContentLoaded', () => {
  // Progress bar functionality
  const progressBar = document.getElementById('progress-bar');
  const updateProgressBar = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  };

  window.addEventListener('scroll', updateProgressBar);
  window.addEventListener('load', updateProgressBar);

  // Get all color circle elements within the right card
  const colorCircles = document.querySelectorAll('.right-card-container .block.rounded-full');

  // Get the main image element in the right card
  const mainImage = document.querySelector('.right-card-container img');

  // Add click event listeners to each color circle
  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      // Get the image source from the data attribute
      const newImageSrc = circle.getAttribute('data-image-src');

      // Change the source of the main image
      if (mainImage && newImageSrc) {
        mainImage.src = newImageSrc;
      }
    });
  });

  const customCursor = document.getElementById('custom-cursor');

  if (!customCursor) return; // Exit if cursor element not found

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  const easingFactor = 0.15; // Adjust for smoother or faster follow

  document.body.style.cursor = 'none';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Interpolate cursor position towards mouse position
    cursorX += (mouseX - cursorX) * easingFactor;
    cursorY += (mouseY - cursorY) * easingFactor;

    // Apply the smoothed position
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';

    // Request next frame
    requestAnimationFrame(animateCursor);
  }

  // Start the animation loop
  animateCursor();

  // Handle cursor appearance on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, img, input, textarea, select, .color-circle');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)'; // Enlarge and center
      customCursor.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Semi-transparent
      customCursor.style.border = '2px solid black'; // Add a border
    });

    element.addEventListener('mouseleave', () => {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1)'; // Return to normal size
      customCursor.style.backgroundColor = 'black'; // Return to original color
      customCursor.style.border = 'none'; // Remove border
    });
  });

  // Handle click wave effect
  document.addEventListener('click', (e) => {
    const wave = document.createElement('div');
    wave.classList.add('click-wave');
    wave.style.left = e.clientX + 'px';
    wave.style.top = e.clientY + 'px';
    document.body.appendChild(wave);

    // Remove the wave element after the animation
    wave.addEventListener('animationend', () => {
      wave.remove();
    });
  });

  // Left card automatic image change
  const leftCardImage = document.querySelector('.flex-[2] img');
  // Get references to the title and description elements
  const leftCardTitle = document.querySelector('.flex-[2] .absolute.bottom-0 h3');
  const leftCardDescription = document.querySelector('.flex-[2] .absolute.bottom-0 p');

  // Define sample recommended products data
  const recommendedProducts = [
    {
      imageSrc: 'https://images.unsplash.com/photo-1542291026-7eec264c678a?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      discount: '10% OFF',
      name: 'Adidas running shoes',
      price: '$180',
      originalPrice: '$200',
      rating: '4.5'
    },
    {
      imageSrc: 'https://images.unsplash.com/photo-1511746315387-a2d88da9bbcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      discount: '5% OFF',
      name: 'Puma casual shoes',
      price: '$114',
      originalPrice: '$120',
      rating: '4.2'
    }, {
      imageSrc: 'https://images.unsplash.com/photo-1595950653106-6ca6f4f690d9?ixlib=rb-1.2.1&auto=format&fit=crop&crop=w=750&q=80',
      discount: '18% OFF',
      name: 'Converse Chuck Taylor',
      price: '$74',
      originalPrice: '$90',
      rating: '4.7'
    },{
      imageSrc: 'https://images.unsplash.com/photo-1505740420928-95ed7192a5e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      discount: '22% OFF',
      name: 'Headphones E505',
      price: '$155',
      originalPrice: '$199',
      rating: '4.9'
    },
  ];

  // Function to generate product card HTML
  function generateProductCardHtml(product) {
    return `
      <div class="relative flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
          <img class="object-cover" src="${product.imageSrc}" alt="product image" />
          ${product.discount ? `<span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">${product.discount}</span>` : ''}
          <!-- Heart icon -->
          <span class="absolute top-2 right-2 text-gray-600 z-10">
            <i class="fas fa-heart"></i>
          </span>
        </a>
        <div class="mt-4 px-5 pb-5">
          <a href="#">
            <h5 class="text-xl tracking-tight text-slate-900">${product.name}</h5>
          </a>
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">${product.price}</span>
              ${product.originalPrice ? `<span class="text-sm text-slate-900 line-through">${product.originalPrice}</span>` : ''}
            </p>
            <div class="flex items-center">
              <svg aria-hidden="true" class="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">${product.rating}</span>
            </div>
          </div>
          <a href="#" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to cart</a>
        </div>
      </div>
    `;
  }

  // Function to display products in the grid
  function displayProducts(products) {
    if (productGridContainer) {
      productGridContainer.innerHTML = ''; // Clear current products
      products.forEach(product => {
        productGridContainer.innerHTML += generateProductCardHtml(product);
      });
    }
  }

  // Get the buttons and the product grid container
  const recommendButton = document.getElementById('recommend-button');
  const newsItemButton = document.getElementById('news-item-button');
  const productGridContainer = document.getElementById('product-grid-container');

  // Sample data for initial News Items (you can populate this from your HTML or another source)
  const newsItemsProducts = [
     {
    imageSrc: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    discount: '39% OFF',
    name: 'Nike Air MX Super 2500 - Red',
    price: '$449',
    originalPrice: '$699',
    rating: '5.0'
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    discount: '25% OFF',
    name: 'Nike Air Force 1 - White',
    price: '$299',
    originalPrice: '$399',
    rating: '4.8'
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHnuYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    discount: '15% OFF',
    name: 'Nike Dunk Low - Black',
    price: '$199',
    originalPrice: '$229',
    rating: '4.9'
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    discount: '20% OFF',
    name: 'Nike Jordan 1 - Blue',
    price: '$399',
    originalPrice: '$499',
    rating: '4.7'
  },
  ];

  // Display initial news items products on page load
  displayProducts(newsItemsProducts);

  // Add event listener to Recommend button
  if (recommendButton && productGridContainer) {
    recommendButton.addEventListener('click', () => {
      displayProducts(recommendedProducts);
    });
  }

  // Add event listener to News Item button (to switch back)
   if (newsItemButton && productGridContainer) {
    newsItemButton.addEventListener('click', () => {
      displayProducts(newsItemsProducts);
    });
  }

});




