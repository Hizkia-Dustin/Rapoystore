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


});




