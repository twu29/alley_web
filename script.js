// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background - ALWAYS BLACK (no scroll changes)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // Keep header always black - no changes on scroll
    navbar.style.background = '#000000';
    navbar.style.boxShadow = '0 4px 20px rgba(255, 105, 180, 0.3)';
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#000000' : '#ff0000'};
        color: #ffffff;
        border-radius: 0;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 4px 4px 0px #000000;
        border: 2px solid #000000;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.habit-card, .project-card, .timeline-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Mouse cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: #000000;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
});

// Hover effects for interactive elements
document.querySelectorAll('.btn, .nav-link, .project-link, .social-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(2)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.transform = 'scale(1)';
        }
    });
});

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #000000;
            border-radius: 50%;
            opacity: 0.1;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: #ffffff;
        background-color: #000000;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.1;
        }
        90% {
            opacity: 0.1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .particle {
        animation: float 20s linear infinite;
    }
    
    /* Glitch effect for title */
    .hero-title:hover {
        animation: glitch 0.3s ease-in-out;
    }
    
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    /* Magnetic effect for buttons */
    .btn {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .btn:hover {
        transform: translate(-4px, -4px) scale(1.05);
    }
    
    /* Staggered animation for cards */
    .habit-card:nth-child(1) { animation-delay: 0.1s; }
    .habit-card:nth-child(2) { animation-delay: 0.2s; }
    .habit-card:nth-child(3) { animation-delay: 0.3s; }
    .habit-card:nth-child(4) { animation-delay: 0.4s; }
    .habit-card:nth-child(5) { animation-delay: 0.5s; }
    .habit-card:nth-child(6) { animation-delay: 0.6s; }
    
    .project-card:nth-child(1) { animation-delay: 0.1s; }
    .project-card:nth-child(2) { animation-delay: 0.2s; }
    .project-card:nth-child(3) { animation-delay: 0.3s; }
    
    .timeline-item:nth-child(1) { animation-delay: 0.1s; }
    .timeline-item:nth-child(2) { animation-delay: 0.2s; }
    .timeline-item:nth-child(3) { animation-delay: 0.3s; }
    
    /* Scroll indicator */
    .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #000000;
        transform-origin: left;
        transform: scaleX(0);
        z-index: 10000;
        transition: transform 0.1s ease;
    }
    
    /* Loading screen */
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .loading-screen.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .loading-text {
        font-size: 2rem;
        font-weight: 900;
        color: #000000;
        text-transform: uppercase;
        letter-spacing: 2px;
        animation: loadingPulse 1s ease-in-out infinite alternate;
    }
    
    @keyframes loadingPulse {
        0% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Create loading screen
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading-screen';
loadingScreen.innerHTML = '<div class="loading-text">Loading...</div>';
document.body.appendChild(loadingScreen);

// Hide loading screen after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 1000);
});

// Create scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

// Update scroll indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
});

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Add tilt effect to cards
document.querySelectorAll('.habit-card, .project-card, .timeline-content').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const rotateX = (y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});
