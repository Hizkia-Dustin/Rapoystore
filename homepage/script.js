document.addEventListener('DOMContentLoaded', () => {
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
});



