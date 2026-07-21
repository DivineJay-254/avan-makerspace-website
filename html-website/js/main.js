// ===== Mobile Menu Toggle =====
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-menu a');

  if (!mobileMenuBtn) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}

// ===== Image Carousel =====
function initCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');
  
  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-image');
    const interval = parseInt(carousel.dataset.interval) || 5000;
    let currentIndex = 0;

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    if (images.length > 1) {
      setInterval(nextImage, interval);
    } else {
      showImage(0);
    }
  });
}

// ===== Animated Counter =====
function animateCounter(element, endValue, duration = 2000) {
  const steps = 60;
  const stepValue = endValue / steps;
  let current = 0;
  const step = () => {
    current += stepValue;
    if (current >= endValue) {
      element.textContent = endValue;
    } else {
      element.textContent = Math.floor(current);
      requestAnimationFrame(step);
    }
  };
  step();
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const endValue = parseInt(counter.dataset.counter);
        animateCounter(counter, endValue);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== WhatsApp Widget =====
function initWhatsAppWidget() {
  const phoneNumber = '254123456789'; // Replace with actual number
  const widget = document.getElementById('whatsapp-widget');
  
  if (widget) {
    widget.href = `https://wa.me/${phoneNumber}?text=Hello%20Avan`;
  }
}

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCarousels();
  initCounters();
  initSmoothScroll();
  initWhatsAppWidget();
});
