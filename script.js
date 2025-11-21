// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    // ===== CONTACT FORM (EmailJS Integration) =====
    const contactForm = document.getElementById("contact-form");
    const statusMsg = document.getElementById("status-message");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameEl = document.getElementById("name");
            const emailEl = document.getElementById("email");
            const messageEl = document.getElementById("message");

            if (!nameEl || !emailEl || !messageEl) {
                console.error("Contact form inputs missing.");
                return;
            }

            const params = {
                from_name: nameEl.value,
                email_id: emailEl.value,
                message: messageEl.value,
            };

            // Update with your EmailJS details
            emailjs
                .send("service_yygw2af", "template_ypcbwiv", params, "pr7LYyENIDZAtDCg8")
                .then(() => {
                    if (statusMsg) {
                        statusMsg.textContent = "✅ Message sent successfully!";
                        statusMsg.style.color = "#22c55e";
                    }
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("Error sending email:", error);
                    if (statusMsg) {
                        statusMsg.textContent =
                            "❌ Failed to send message. Please try again.";
                        statusMsg.style.color = "#ef4444";
                    }
                });
        });
    }

    // ===== Typed.js (Typing Animation) =====
    if (window.Typed) {
        new Typed(".typing", {
            strings: [
                "Frontend Developer",
                "Web Designer",
                "Tech Enthusiast",
                "UI/UX Explorer",
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: "|",
        });
    }

    // ===== Theme Toggle =====
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            themeToggle.textContent = document.body.classList.contains("light-mode")
                ? "🌞"
                : "🌙";
        });
    }

    // ===== AOS Animation on Scroll =====
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 80,
        });
    }

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target)
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        });
    });

    // ===== Fade-In Effect for Visible Sections =====
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    fadeElements.forEach((el) => observer.observe(el));
});
// ===== Active section highlight in navbar =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ===== ENHANCED FEATURES =====

// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 1000);
  }
});

// ===== Scroll to Top Button =====
const scrollToTopBtn = document.querySelector('.scroll-to-top');

if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== Mobile Hamburger Menu =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// ===== Skills Progress Bar Animation =====
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width;
        }
        observer.unobserve(bar);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => observer.observe(bar));
};

if (document.querySelectorAll('.skill-progress').length > 0) {
  animateSkillBars();
}

// ===== Project Filtering =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== Dark Mode Persistence =====
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.textContent = '🌞';
  }

  // Save theme preference
  const originalToggle = themeToggleBtn.onclick;
  themeToggleBtn.onclick = null;
  
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggleBtn.textContent = isLight ? '🌞' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ===== Form Validation Enhancement =====
if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateInput(input);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateInput(input);
      }
    });
  });

  function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;

    if (input.hasAttribute('required') && !value) {
      isValid = false;
    }

    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    if (isValid) {
      input.classList.remove('error');
      input.style.borderColor = '';
    } else {
      input.classList.add('error');
      input.style.borderColor = '#ef4444';
    }

    return isValid;
  }
}

// ===== Particle Background Effect (Optional) =====
function createParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

if (document.getElementById('particle-canvas')) {
  createParticles();
}

// ===== Typing Effect for Text Elements =====
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Animate counters when visible
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// ===== Console Easter Egg =====
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #38bdf8; font-weight: bold;');
console.log('%cLooking to hire? Contact me!', 'font-size: 14px; color: #0284c7;');

// ===== Performance Monitoring =====
if (window.performance) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
  });
}

