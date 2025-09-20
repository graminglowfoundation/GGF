// ==================== ULTRA-OPTIMIZED NGO WEBSITE JAVASCRIPT ====================

// Cache DOM elements
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const $1 = sel => document.querySelector(sel);

// Premium Preloader
(() => {
  let progress = 0;
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");
  const loadingMessage = document.getElementById("loading-message");
  const preloader = document.getElementById("preloader");

  if (!progressText || !preloader || !progressFill || !loadingMessage) {
    const fallbackPreloader = document.querySelector('#preloader');
    if (fallbackPreloader) {
      fallbackPreloader.style.display = 'none';
    }
    return;
  }

  const messages = [
    "Initializing...",
    "Loading Resources...",
    "Connecting to Community...",
    "Preparing Impact Data...",
    "Almost Ready...",
    "Welcome to Gramin Glow Foundation!"
  ];

  let messageIndex = 0;

  const loading = setInterval(() => {
    progress += 4;
    
    // Update progress bar and text
    progressText.textContent = progress + "%";
    progressFill.style.width = progress + "%";
    
    // Update loading message
    if (progress % 20 === 0 && messageIndex < messages.length - 1) {
      messageIndex++;
      loadingMessage.textContent = messages[messageIndex];
    }
    
    if (progress >= 100) {
      progress = 100;
      progressText.textContent = "100%";
      progressFill.style.width = "100%";
      loadingMessage.textContent = messages[messages.length - 1];
      clearInterval(loading);
      
      setTimeout(() => {
        preloader.style.cssText = "opacity:0;visibility:hidden;pointer-events:none;transition:all 0.8s ease";
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 500);
      return;
    }
  }, 40);

  // Fallback: Force hide preloader after 4 seconds
  setTimeout(() => {
    if (preloader.style.display !== 'none') {
      preloader.style.display = 'none';
    }
  }, 4000);
})();



// Counter Animation - Optimized
const animateCounter = (el, target) => {
  let start = 0;
  const step = target / 100;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, 20);
};

// Stats Observer - Optimized
const heroStats = $1('.hero-stats');
if (heroStats) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      $$('.stat-number').forEach(stat => {
        const target = +stat.dataset.count;
        animateCounter(stat, target);
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(heroStats);
}

// Ripple Effect - Optimized
$$('.premium-btn').forEach(btn => {
  btn.onclick = function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.className = 'btn-ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };
});

// Parallax - Throttled
let ticking = false;
const parallaxElements = $$('.floating-icon');

if (parallaxElements.length) {
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((el, i) => {
      const speed = 0.5 + (i * 0.1);
      el.style.transform = `translateY(${-(scrolled * speed)}px) rotate(${scrolled * 0.1}deg)`;
    });
    ticking = false;
  };

  window.onscroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };
}

// Scroll Indicator - Optimized
const scrollIndicator = $1('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.onclick = () => {
    $1('.featured-highlights')?.scrollIntoView({ behavior: 'smooth' });
  };
}

// Slider - Ultra Optimized
(() => {
  const slides = $$('.highlight-slide');
  const dotsContainer = $1('.slider-dots');
  if (!slides.length || !dotsContainer) return;

  let slideIndex = 0;
  let autoSlide;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = i === 0 ? 'dot active' : 'dot';
    dot.onclick = () => showSlide(i);
    dotsContainer.appendChild(dot);
  });

  const dots = $$('.dot');

  const showSlide = n => {
    slides[slideIndex].classList.remove('active');
    dots[slideIndex].classList.remove('active');
    slideIndex = n;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    resetAutoSlide();
  };

  const nextSlide = () => showSlide((slideIndex + 1) % slides.length);
  const startAutoSlide = () => autoSlide = setInterval(nextSlide, 3000);
  const resetAutoSlide = () => { clearInterval(autoSlide); startAutoSlide(); };

  // Navigation
  $1('.prev-btn')?.addEventListener('click', () => showSlide((slideIndex - 1 + slides.length) % slides.length));
  $1('.next-btn')?.addEventListener('click', () => showSlide((slideIndex + 1) % slides.length));

  startAutoSlide();
})();

// Falling Icons - Optimized
const createFallingIcons = type => {
  const container = $('falling-icons-container');
  if (!container) return;
  
  const icons = {
    health: ['🏥', '💊', '🩺', '❤️', '🚑'],
    education: ['📚', '✏️', '🎓', '📝', '🖊️'],
    agriculture: ['🌾', '🌱', '🚜', '🌳', '🍃']
  };
  
  const iconSet = icons[type];
  const count = window.innerWidth <= 768 ? 6 : 8;
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const icon = document.createElement('div');
      icon.className = `falling-icon ${type}`;
      icon.textContent = iconSet[Math.floor(Math.random() * iconSet.length)];
      icon.style.cssText = `left:${Math.random() * 90 + 5}%;top:-80px;animation-delay:${Math.random() * 0.8}s`;
      
      container.appendChild(icon);
      setTimeout(() => icon.remove(), 4000);
    }, i * 100);
  }
};

// Make global
window.createFallingIcons = createFallingIcons;
window.openPage = url => window.open(url, '_blank');

// Donate Popup - Optimized
(() => {
  const donateBtn = $1('.floating-donate');
  const donatePopup = $('donate-popup');
  const closeBtn = $1('.popup-close');

  if (!donateBtn || !donatePopup || !closeBtn) return;

  const closePopup = () => {
    donatePopup.style.display = 'none';
    donatePopup.setAttribute('aria-hidden', 'true');
  };

  donateBtn.onclick = () => {
    donatePopup.style.display = 'flex';
    donatePopup.setAttribute('aria-hidden', 'false');
  };

  closeBtn.onclick = closePopup;
  donatePopup.onclick = e => e.target === donatePopup && closePopup();
})();

// Message Form - Optimized
(() => {
  const form = $('premium-message-form');
  if (!form) return;

  const statusDiv = $('messageStatus');
  const submitBtn = form.querySelector('.premium-message-btn');

  form.onsubmit = function(e) {
    e.preventDefault();
    
    const data = new FormData(this);
    const [name, email, subject, message] = ['fullName', 'email', 'subject', 'message'].map(k => data.get(k));
    
    if (!name || !email || !subject || !message) {
      statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill all fields.';
      statusDiv.className = 'message-status error';
      statusDiv.style.display = 'block';
      setTimeout(() => statusDiv.style.display = 'none', 3000);
      return;
    }
    
    const mailtoLink = `mailto:graminglowfoundation2025@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Opening email...';
    statusDiv.className = 'message-status success';
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
      this.reset();
    }, 2000);
  };
})();

// Hero Mouse Tracker - Optimized
const hero = $1('.hero');
if (hero) {
  const bgElements = $$('.hero-background-elements .bg-shape');
  let mouseX = 0, mouseY = 0;
  
  hero.onmousemove = e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 100;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 100;
  };
  
  const updateBg = () => {
    bgElements.forEach((el, i) => {
      const speed = 0.02 + (i * 0.01);
      el.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
    requestAnimationFrame(updateBg);
  };
  
  if (bgElements.length) updateBg();
}

// Performance Optimizations
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
}

// Smooth scrolling - Delegated
document.onclick = e => {
  const a = e.target.closest('a');
  const href = a?.getAttribute('href');
  if (href?.startsWith('#')) {
    e.preventDefault();
    $1(href)?.scrollIntoView({ behavior: 'smooth' });
  }
};

// Animation Observer - Optimized
const animationObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      animationObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

$$('.animate-slide-up, .animate-fade-in').forEach(el => animationObserver.observe(el));

// Accessibility
const heroTitle = $1('.hero-title');
if (heroTitle) {
  heroTitle.setAttribute('aria-label', 'Empowering Rural Communities - Together We Glow, Forever We Grow');
}
// Modern Mobile Navigation JavaScript
(() => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavInterface = document.getElementById('mobileNavInterface');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');

  if (!mobileMenuBtn || !mobileNavInterface || !mobileNavOverlay || !mobileNavClose) return;

  const openMobileNav = () => {
    mobileNavInterface.style.display = 'block';
    mobileMenuBtn.style.opacity = '0';
    mobileMenuBtn.style.visibility = 'hidden';
    document.body.classList.add('mobile-nav-open');
    setTimeout(() => {
      mobileNavInterface.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNavInterface.classList.remove('show');
    mobileMenuBtn.style.opacity = '1';
    mobileMenuBtn.style.visibility = 'visible';
    document.body.classList.remove('mobile-nav-open');
    setTimeout(() => {
      mobileNavInterface.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 500);
  };

  // Event listeners
  mobileMenuBtn.addEventListener('click', openMobileNav);
  mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNavOverlay.addEventListener('click', closeMobileNav);

  // Close on link click
  document.querySelectorAll('.mobile-nav-link, .mobile-social-link, .mobile-donate-btn').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMobileNav, 300);
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavInterface.classList.contains('show')) {
      closeMobileNav();
    }
  });
})();

// Keep existing navigation functionality for desktop
(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  if (!navToggle || !navMenu || !navOverlay) return;

  const closeMenu = () => {
    navMenu.classList.remove('show');
    navOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  navToggle.onclick = () => {
    const isOpen = navMenu.classList.toggle('show');
    navOverlay.classList.toggle('show');
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  };

  navOverlay.onclick = closeMenu;
  document.querySelectorAll('.nav-menu a').forEach(link => link.onclick = closeMenu);
})();
