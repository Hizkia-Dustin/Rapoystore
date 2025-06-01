document.addEventListener('DOMContentLoaded', () => {
  // Get all color circle elements within the right card
  const colorCircles = document.querySelectorAll('.right-card-container .absolute.top-4 .block.rounded-full');

  // Get the main image element in the right card
  const mainImage = document.querySelector('.right-card-container img');

  // Add the initial transition class and active state
  if (mainImage) {
    mainImage.classList.add('card-image-transition', 'card-image-active');
  }

  // Add click event listeners to each color circle
  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      // Get the image source from the data attribute
      const newImageSrc = circle.getAttribute('data-image-src');

      // Only animate if the source is changing
      if (mainImage && newImageSrc && mainImage.src !== newImageSrc) {
        // Remove active state and add exit animation class
        mainImage.classList.remove('card-image-active');
        mainImage.classList.add('card-image-exit');

        // Wait for the exit transition to complete
        setTimeout(() => {
          // Change the image source
          mainImage.src = newImageSrc;

          // Remove exit class and add enter class for the new image's starting position
          mainImage.classList.remove('card-image-exit');
          mainImage.classList.add('card-image-enter');

          // Force a reflow to ensure the enter state is applied before the transition
          void mainImage.offsetWidth; // Trigger reflow

          // Transition to the active state
          mainImage.classList.remove('card-image-enter');
          mainImage.classList.add('card-image-active');
        }, 200); // Match this duration to the CSS transition duration
      }
    });
  });
});

'use client';
import { useState, useEffect, useRef } from 'react';
export default function SmoothFollower() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 },
  });
  const [isHovering, setIsHovering] = useState(false);
  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    window.addEventListener('mousemove', handleMouseMove);
    const interactiveElements = document.querySelectorAll(
      'a, button, img, input, textarea, select'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    const animate = () => {
      const lerp = (start, end, factor) => {
        return start + (end - start) * factor;
      };
      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );
      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );
      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      cancelAnimationFrame(animationId);
    };
  }, []);
  if (typeof window === 'undefined') return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        className="absolute rounded-full dark:bg-white bg-black "
        style={{
          width: '8px',
          height: '8px',
          transform: 'translate(-50%, -50%)',
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      <div
        className="absolute rounded-full border dark:border-white border-black "
        style={{
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          transform: 'translate(-50%, -50%)',
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </div>
  );
}

