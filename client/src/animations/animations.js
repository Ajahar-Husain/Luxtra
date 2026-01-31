import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation configurations
export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

// Card hover animations
export const cardHover = {
  scale: 1.02,
  y: -5,
  transition: { duration: 0.3, ease: 'easeOut' },
};

export const cardTap = {
  scale: 0.98,
};

// Button animations
export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const buttonTap = {
  scale: 0.95,
};

// GSAP Animation Functions
export const animateOnScroll = (elements, options = {}) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  };

  const config = { ...defaults, ...options };

  gsap.fromTo(
    elements,
    { y: config.y, opacity: config.opacity },
    {
      y: 0,
      opacity: 1,
      duration: config.duration,
      stagger: config.stagger,
      ease: config.ease,
      scrollTrigger: {
        trigger: elements,
        start: config.start,
        toggleActions: config.toggleActions,
      },
    }
  );
};

export const animateCounter = (element, endValue, duration = 2) => {
  gsap.to(element, {
    innerText: endValue,
    duration,
    snap: { innerText: 1 },
    ease: 'power2.out',
  });
};

export const parallaxScroll = (element, speed = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

export const revealText = (element) => {
  gsap.fromTo(
    element,
    { 
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
      opacity: 0 
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      duration: 1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    }
  );
};

export const magneticButton = (button) => {
  const handleMouseMove = (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Image reveal animation
export const imageReveal = (element) => {
  const wrapper = element.parentElement;
  
  gsap.set(element, { scale: 1.2 });
  
  gsap.to(wrapper, {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top 80%',
    },
  });

  gsap.to(element, {
    scale: 1,
    duration: 1.5,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: wrapper,
      start: 'top 80%',
    },
  });
};

export default {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageVariants,
  cardHover,
  cardTap,
  buttonHover,
  buttonTap,
  animateOnScroll,
  animateCounter,
  parallaxScroll,
  revealText,
  magneticButton,
  imageReveal,
};
