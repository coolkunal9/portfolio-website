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
