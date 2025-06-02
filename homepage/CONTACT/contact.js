// Simple scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('opacity-100', 'translate-y-0');
      element.classList.remove('opacity-0', 'translate-y-10');
    }
  });
};

// Initial check for elements in view
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);

// Form handling
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.innerHTML = `
      <span class="inline-block animate-spin mr-2">⟳</span>
      Sending...
    `;
    button.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      button.innerHTML = `
        <span class="inline-block mr-2">✓</span>
        Message Sent!
      `;
      button.classList.add('bg-green-600');
      
      setTimeout(() => {
        form.reset();
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.remove('bg-green-600');
      }, 2000);
    }, 1500);
  });
}

// Simple hover effects
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.classList.add('translate-x-2');
  });
  
  item.addEventListener('mouseleave', () => {
    item.classList.remove('translate-x-2');
  });
});
