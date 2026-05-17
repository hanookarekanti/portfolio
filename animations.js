/* ============================================================
   ANIMATIONS.JS
   Handles: theme toggle, typing effect, celebrations,
   scroll tracking, section reveals
   ============================================================ */

/* ──────────────────────────────────────────
   1. THEME TOGGLE (Dark/Light Mode)
   ────────────────────────────────────────── */

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.classList.add(savedTheme);
  updateThemeIcon(savedTheme);
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  const isLightMode = htmlElement.classList.contains('light-mode');
  
  if (isLightMode) {
    htmlElement.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark-mode');
    updateThemeIcon('dark-mode');
  } else {
    htmlElement.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
    updateThemeIcon('light-mode');
  }
});

function updateThemeIcon(theme) {
  if (theme === 'light-mode') {
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
}

/* ──────────────────────────────────────────
   2. TYPING ANIMATION FOR ROLE
   ────────────────────────────────────────── */

const typingText = document.getElementById('typingText');
const typingCursor = document.querySelector('.typing-cursor');
const celebrationEffect = document.getElementById('celebrationEffect');

const roleText = 'AI / ML Engineer';
let charIndex = 0;
let isTypingComplete = false;

function typeRole() {
  if (charIndex < roleText.length) {
    typingText.textContent += roleText[charIndex];
    charIndex++;
    setTimeout(typeRole, 80); // Typing speed: 80ms per character
  } else {
    isTypingComplete = true;
    typingCursor.classList.add('hidden');
    triggerCelebration();
  }
}

// Start typing when page loads
window.addEventListener('load', () => {
  // Delay typing slightly for visual effect
  setTimeout(typeRole, 1200);
});

/* ──────────────────────────────────────────
   3. CELEBRATION EFFECTS (Fireworks & Confetti)
   ────────────────────────────────────────── */

function triggerCelebration() {
  const celebContainer = document.getElementById('celebrationEffect');
  
  // Create multiple celebration particles
  for (let i = 0; i < 30; i++) {
    // 🎆 Fireworks
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle firework';
      
      const angle = (Math.random() * Math.PI * 2);
      const distance = 50 + Math.random() * 80;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty('--tx', `${x}px`);
      particle.style.setProperty('--ty', `${y}px`);
      
      // Random colors: cyan, purple, orange, lime
      const colors = ['#00e5ff', '#7c3aed', '#f59e0b', '#22c55e'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.left = '50%';
      particle.style.top = '50%';
      
      celebContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }, i * 30);
    
    // 🎉 Confetti
    if (i % 2 === 0) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'celebration-particle confetti';
        
        confetti.style.left = (40 + Math.random() * 20) + '%';
        confetti.style.top = '-10px';
        confetti.style.background = ['#00e5ff', '#7c3aed', '#f59e0b'][Math.floor(Math.random() * 3)];
        
        celebContainer.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1200);
      }, i * 20);
    }
  }
  
  // Strong animation after celebration (flex muscles emoji)
  setTimeout(() => {
    const robotEmoji = document.querySelector('.robot-emoji');
    if (robotEmoji) {
      robotEmoji.textContent = '💪';
      robotEmoji.style.animation = 'none';
      robotEmoji.style.transform = 'scale(1.3)';
      
      // Revert back after a moment
      setTimeout(() => {
        robotEmoji.textContent = '🤖';
        robotEmoji.style.transform = 'scale(1)';
        robotEmoji.style.animation = 'robotWave 0.6s ease-in-out infinite';
      }, 800);
    }
  }, 900);
}

/* ──────────────────────────────────────────
   4. SCROLL PROGRESS INDICATOR & CHARACTER
   ────────────────────────────────────────── */

const scrollProgressBar = document.querySelector('.scroll-progress-bar');
const scrollCharacter = document.querySelector('.scroll-character');

window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  
  if (scrollProgressBar) {
    scrollProgressBar.style.width = scrolled + '%';
  }
  
  // Move robot character along the progress bar
  if (scrollCharacter) {
    scrollCharacter.style.left = (scrolled * 1.2) + '%';
  }
  
  // Hide nav indicator when at the top
  const navIndicator = document.querySelector('.nav-scroll-indicator');
  if (navIndicator) {
    if (window.scrollY < 50) {
      navIndicator.style.opacity = '0.3';
    } else {
      navIndicator.style.opacity = '1';
    }
  }
});

/* ──────────────────────────────────────────
   5. SCROLL-TRIGGERED SECTION REVEALS
   ────────────────────────────────────────── */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      
      // Trigger animations on all fade-in children
      const fadeElements = entry.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
      fadeElements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
        }, index * 50);
      });
      
      // Optional: stop observing after triggering
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all section-reveal elements
document.querySelectorAll('.section-reveal').forEach(section => {
  observer.observe(section);
});

/* ──────────────────────────────────────────
   6. HERO SECTION ANIMATIONS (Page Load)
   ────────────────────────────────────────── */

window.addEventListener('load', () => {
  // All fade-in-up elements animate on page load
  const fadeElements = document.querySelectorAll('.fade-in-up');
  fadeElements.forEach((el, index) => {
    // Stagger the fade-in
    el.style.animation = `none`;
    el.style.opacity = '0';
    
    setTimeout(() => {
      el.style.animation = `fadeInUp 0.8s ease-out forwards`;
    }, index * 100);
  });
  
  // Fade in left elements
  const fadeLeftElements = document.querySelectorAll('.fade-in-left');
  fadeLeftElements.forEach((el, index) => {
    el.style.animation = `none`;
    el.style.opacity = '0';
    
    setTimeout(() => {
      el.style.animation = `fadeInLeft 0.8s ease-out forwards`;
    }, index * 100 + 100);
  });
  
  // Fade in right elements
  const fadeRightElements = document.querySelectorAll('.fade-in-right');
  fadeRightElements.forEach((el, index) => {
    el.style.animation = `none`;
    el.style.opacity = '0';
    
    setTimeout(() => {
      el.style.animation = `fadeInRight 0.8s ease-out forwards`;
    }, index * 100 + 100);
  });
});

/* ──────────────────────────────────────────
   7. SMOOTH SCROLL NAVIGATION
   ────────────────────────────────────────── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only prevent default for valid section links
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close hamburger menu if open
      const menuLinks = document.querySelector('.menu-links');
      if (menuLinks && menuLinks.classList.contains('open')) {
        menuLinks.classList.remove('open');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        hamburgerIcon.classList.remove('open');
      }
    }
  });
});

/* ──────────────────────────────────────────
   8. DYNAMIC SKILL CARD INTERACTIONS
   ────────────────────────────────────────── */

const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Subtle scale effect
    item.style.transform = 'translateX(5px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0) scale(1)';
  });
});

/* ──────────────────────────────────────────
   9. CONTACT FORM INTERACTIONS
   ────────────────────────────────────────── */

const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
  item.addEventListener('click', function(e) {
    // Don't prevent default (want links to work)
    // But add visual feedback
    this.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });
});

/* ──────────────────────────────────────────
   10. PERFORMANCE: Reduce animations on mobile
   ────────────────────────────────────────── */

const isMobile = window.innerWidth <= 768;

if (isMobile) {
  // Reduce celebration particles on mobile
  document.documentElement.style.setProperty('--particle-count', '15');
  
  // Speed up typing on mobile
  // This is handled in typeRole() function
}

/* ──────────────────────────────────────────
   11. EASTER EGG: Konami Code
   ────────────────────────────────────────── */

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  const key = e.key === ' ' ? ' ' : e.code || e.key;
  
  if (key === konamiCode[konamiIndex]) {
    konamiIndex++;
    
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  // Rainbow effect on page
  document.body.style.filter = 'hue-rotate(360deg)';
  
  // Emit confetti
  const body = document.body;
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'celebration-particle confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.background = ['#00e5ff', '#7c3aed', '#f59e0b', '#22c55e'][Math.floor(Math.random() * 4)];
    confetti.style.fontSize = '2rem';
    confetti.textContent = '🎉';
    
    body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 1200);
  }
  
  // Revert color after animation
  setTimeout(() => {
    document.body.style.filter = 'hue-rotate(0deg)';
  }, 3000);
}

/* ──────────────────────────────────────────
   12. ACCESSIBILITY: Respect prefers-reduced-motion
   ────────────────────────────────────────── */

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.animationDuration = '0.01ms !important';
  document.documentElement.style.animationIterationCount = '1 !important';
  document.documentElement.style.transitionDuration = '0.01ms !important';
}

console.log('✨ Animations loaded! Try scrolling and interact with elements.');
