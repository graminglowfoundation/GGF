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

// Premium Floating Chatbot Functionality
(() => {
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotMini = document.getElementById('chatbotMini');
  const miniChatInput = document.getElementById('miniChatInput');
  
  if (!chatbotToggle || !chatbotMini) return;
  
  let isChatOpen = false;
  
  // Toggle mini chat
  window.toggleMiniChat = () => {
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
      chatbotMini.classList.add('show');
      chatbotToggle.innerHTML = '<i class="fas fa-times"></i>';
      chatbotToggle.style.transform = 'scale(0.9)';
      
      // Add welcome animation
      setTimeout(() => {
        const welcomeMsg = chatbotMini.querySelector('.welcome-message');
        if (welcomeMsg) {
          welcomeMsg.style.animation = 'messageSlideIn 0.6s ease-out';
        }
      }, 300);
    } else {
      chatbotMini.classList.remove('show');
      chatbotToggle.innerHTML = '<i class="fas fa-comments"></i>';
      chatbotToggle.style.transform = 'scale(1)';
    }
  };
  
  // Close mini chat
  window.closeMiniChat = () => {
    if (isChatOpen) {
      toggleMiniChat();
    }
  };
  
  // Open fullscreen chat
  window.openFullscreenChat = (topic = '') => {
    const message = miniChatInput ? miniChatInput.value.trim() : '';
    let url = 'chatbot/chatbot.html';
    
    // Add topic or message as URL parameter
    if (topic) {
      url += `?topic=${encodeURIComponent(topic)}`;
    } else if (message) {
      url += `?message=${encodeURIComponent(message)}`;
    }
    
    // Open in new window with specific dimensions
    const chatWindow = window.open(
      url,
      'NGOChatbot',
      'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );
    
    if (chatWindow) {
      chatWindow.focus();
      // Clear mini input if message was sent
      if (miniChatInput && message) {
        miniChatInput.value = '';
      }
      // Close mini chat
      closeMiniChat();
    }
  };
  
  // Mini chat functionality
  const miniMessages = document.getElementById('miniMessages');
  let miniChatHistory = [];
  
  // Send message in mini chat
  window.sendMiniMessage = (message = '') => {
    const input = miniChatInput;
    const text = message || (input ? input.value.trim() : '');
    if (!text) return;
    
    // Add user message
    addMiniMessage(text, 'user');
    if (input) input.value = '';
    
    // Generate bot response
    setTimeout(() => {
      const response = generateMiniResponse(text);
      addMiniMessage(response, 'bot');
    }, 800);
  };
  
  // Add message to mini chat
  const addMiniMessage = (text, sender) => {
    if (!miniMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `mini-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'mini-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const bubble = document.createElement('div');
    bubble.className = 'mini-bubble';
    bubble.textContent = text;
    
    // Add message actions for bot messages
    if (sender === 'bot') {
      const actions = document.createElement('div');
      actions.className = 'mini-message-actions';
      actions.innerHTML = `
        <button class="mini-action-btn" onclick="speakMiniMessage('${text.replace(/'/g, "\\'")}')"><i class="fas fa-volume-up"></i></button>
        <button class="mini-action-btn" onclick="copyMiniMessage('${text.replace(/'/g, "\\'")}')"><i class="fas fa-copy"></i></button>
        <button class="mini-action-btn" onclick="shareMiniMessage('${text.replace(/'/g, "\\'")}')"><i class="fas fa-share"></i></button>
      `;
      messageDiv.appendChild(actions);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    miniMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    miniMessages.scrollTop = miniMessages.scrollHeight;
    
    // Store in history
    miniChatHistory.push({text, sender});
  };
  
  // Generate mini responses
  const generateMiniResponse = (message) => {
    const responses = {
      health: [
        "Our Swasthya Bornamala program teaches health through fun cartoons! 🎥",
        "We're improving rural health with interactive education. Want details? 👩‍⚕️",
        "Health literacy saves lives. See our impact in villages! 🏥"
      ],
      education: [
        "Education empowers communities. We use creative methods! 📚",
        "Learning should be fun and accessible for all children. 🎆",
        "Our programs blend traditional wisdom with modern knowledge. 🌱"
      ],
      agriculture: [
        "Sustainable farming transforms rural livelihoods! 🌾",
        "We help farmers adopt better practices for higher yields. 🚜",
        "Agriculture + education = food security for all. 🌽"
      ],
      donate: [
        "Every donation directly impacts a rural family. Thank you! ❤️",
        "Your support helps us reach more villages. 🙏"
      ],
      contact: [
        "Reach us at graminglowfoundation2025@gmail.com or +91 9046927764 📞",
        "We're in East Midnapore, West Bengal. Let's connect! 📍"
      ]
    };
    
    const lower = message.toLowerCase();
    
    for (const [key, msgs] of Object.entries(responses)) {
      if (lower.includes(key) || (key === 'health' && (lower.includes('medical') || lower.includes('doctor'))) ||
          (key === 'education' && (lower.includes('school') || lower.includes('learn'))) ||
          (key === 'agriculture' && (lower.includes('farm') || lower.includes('crop')))) {
        return msgs[Math.floor(Math.random() * msgs.length)];
      }
    }
    
    const general = [
      "I'm here to help! What interests you most about our work? 🤔",
      "Let me know how I can assist you today! 😊",
      "Curious about our impact? Ask me anything! ✨"
    ];
    
    return general[Math.floor(Math.random() * general.length)];
  };
  
  // Handle mini input enter key
  if (miniChatInput) {
    miniChatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMiniMessage();
      }
    });
    
    // Auto-resize and character limit
    miniChatInput.addEventListener('input', (e) => {
      const value = e.target.value;
      if (value.length > 200) {
        e.target.value = value.substring(0, 200);
      }
    });
  }
  
  // Add floating animation to chatbot button
  if (chatbotToggle) {
    setInterval(() => {
      if (!isChatOpen) {
        chatbotToggle.style.animation = 'chatbotPulse 3s ease-in-out';
        setTimeout(() => {
          chatbotToggle.style.animation = '';
        }, 3000);
      }
    }, 10000); // Pulse every 10 seconds
  }
  
  // Auto-show chatbot after 30 seconds (optional)
  setTimeout(() => {
    if (!isChatOpen && !localStorage.getItem('chatbot-shown')) {
      // Show a subtle notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        bottom: 120px;
        right: 30px;
        background: linear-gradient(135deg, #138808, #10b981);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 8px 25px rgba(19, 136, 8, 0.3);
        z-index: 1499;
        animation: slideInRight 0.5s ease-out;
        cursor: pointer;
        max-width: 250px;
      `;
      notification.innerHTML = '🤖 Hi! I can help you learn about our rural impact programs!';
      
      document.body.appendChild(notification);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
      }, 5000);
      
      // Click to open chat
      notification.onclick = () => {
        toggleMiniChat();
        notification.remove();
      };
      
      localStorage.setItem('chatbot-shown', 'true');
    }
  }, 30000);
  
  // Mini message actions
  window.speakMiniMessage = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 1.1;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      showMiniToast('🔊 Speaking message...');
    }
  };
  
  window.copyMiniMessage = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showMiniToast('📋 Message copied!');
      }).catch(() => {
        fallbackCopyMini(text);
      });
    } else {
      fallbackCopyMini(text);
    }
  };
  
  const fallbackCopyMini = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showMiniToast('📋 Message copied!');
    } catch (err) {
      showMiniToast('❌ Failed to copy');
    }
    document.body.removeChild(textArea);
  };
  
  window.shareMiniMessage = (text) => {
    const shareData = {
      title: 'Message from GGF AI',
      text: text,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData).then(() => {
        showMiniToast('📤 Message shared!');
      }).catch(() => {
        fallbackShareMini(text);
      });
    } else {
      fallbackShareMini(text);
    }
  };
  
  const fallbackShareMini = (text) => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' - Shared from Gramin Glow Foundation')}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showMiniToast('📤 Opening share options...');
  };
  
  const showMiniToast = (message) => {
    const existingToast = document.querySelector('.mini-toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'mini-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 200px;
      right: 20px;
      background: linear-gradient(135deg, #138808, #10b981);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      z-index: 1600;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(19, 136, 8, 0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes messageSlideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .mini-message-actions {
      display: flex;
      gap: 4px;
      margin-top: 8px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .mini-message:hover .mini-message-actions {
      opacity: 1;
    }
    .mini-action-btn {
      width: 24px;
      height: 24px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      transition: all 0.2s ease;
    }
    .mini-action-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: scale(1.1);
    }
    .mini-bubble {
      line-height: 1.5;
    }
    .mini-bubble p {
      margin: 0 0 8px 0;
      line-height: 1.5;
    }
    .mini-bubble p:last-child {
      margin-bottom: 0;
    }
  `;
  document.head.appendChild(style);
})();

// Optimized Sponsors Slider
(() => {
  const elements = {
    slider: document.getElementById('sponsorsSlider'),
    slides: document.querySelectorAll('.sponsor-slide'),
    indicators: document.querySelectorAll('.indicator'),
    prevBtn: document.getElementById('sponsorPrevBtn'),
    nextBtn: document.getElementById('sponsorNextBtn')
  };
  
  if (!elements.slider || !elements.slides.length) return;
  
  let state = { current: 0, interval: null, transitioning: false, paused: false };
  
  const showSlide = (index) => {
    if (state.transitioning || index === state.current) return;
    
    state.transitioning = true;
    elements.slides[state.current].classList.remove('active');
    elements.indicators[state.current]?.classList.remove('active');
    
    state.current = index;
    elements.slides[state.current].classList.add('active');
    elements.indicators[state.current]?.classList.add('active');
    
    setTimeout(() => state.transitioning = false, 400);
    restartTimer();
  };
  
  const nextSlide = () => showSlide((state.current + 1) % elements.slides.length);
  const prevSlide = () => showSlide((state.current - 1 + elements.slides.length) % elements.slides.length);
  
  const startTimer = () => {
    if (!state.paused) state.interval = setInterval(nextSlide, 30000);
  };
  
  const stopTimer = () => clearInterval(state.interval);
  const restartTimer = () => { stopTimer(); startTimer(); };
  const pauseSlider = () => { state.paused = true; stopTimer(); };
  const resumeSlider = () => { state.paused = false; startTimer(); };
  
  // Direct button events
  elements.prevBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
  });
  
  elements.nextBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
  });
  
  // Indicator clicks
  elements.indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });
  
  // Touch optimization
  let touch = { startX: 0, threshold: 80 };
  elements.slider.addEventListener('touchstart', e => {
    touch.startX = e.touches[0].clientX;
    pauseSlider();
  }, { passive: true });
  
  elements.slider.addEventListener('touchend', e => {
    const diff = touch.startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > touch.threshold) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    setTimeout(resumeSlider, 1000);
  }, { passive: true });
  
  // Hover pause
  elements.slider.addEventListener('mouseenter', pauseSlider);
  elements.slider.addEventListener('mouseleave', resumeSlider);
  
  // Visibility optimization
  const observer = new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? resumeSlider() : pauseSlider();
  }, { threshold: 0.3 });
  observer.observe(elements.slider);
  
  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Initialize
  elements.slides[0].classList.add('active');
  elements.indicators[0]?.classList.add('active');
  startTimer();
  
  // Add optimized styles
  const style = document.createElement('style');
  style.textContent = `
    .sponsor-slide { 
      opacity: 0;
      transition: opacity 0.5s ease;
      position: absolute;
      width: 100%;
    }
    .sponsor-slide.active { opacity: 1; position: relative; }
    .sponsor-card { transition: transform 0.2s ease; }
    .sponsor-card:hover { transform: scale(1.01); }
    @media (max-width: 768px) {
      .sponsor-image { touch-action: manipulation; }
      .image-overlay { display: none; }
    }
  `;
  document.head.appendChild(style);
})();

// Global API
window.sponsorsSlider = {
  next: () => document.getElementById('sponsorNextBtn')?.click(),
  prev: () => document.getElementById('sponsorPrevBtn')?.click(),
  goTo: (i) => document.querySelectorAll('.indicator')[i]?.click()
};

