// Initialize EmailJS
emailjs.init('HVMTP7qzaNBznD628'); // Public Key

// Smooth scrolling dan active link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Update active link pada scroll dengan smooth transition
    window.addEventListener('scroll', function() {
        let current = '';

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger menu toggle dengan animasi
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.style.display = 'none';
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Form submission dengan EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Mengirim...';
            button.disabled = true;

            // Kirim email menggunakan EmailJS
            emailjs.sendForm('service_kz4uq6e', 'template_p0ppduy', this)
                .then(function(response) {
                    showNotification('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.', 'success');
                    contactForm.reset();
                    button.textContent = originalText;
                    button.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.', 'error');
                    button.textContent = originalText;
                    button.disabled = false;
                });
        });
    }
});

// Custom notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Scroll to top button dengan animasi
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        if (!document.getElementById('scrollToTop')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTop';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: linear-gradient(135deg, #ff8c00, #ffa500);
                color: white;
                border: none;
                border-radius: 50%;
                width: 55px;
                height: 55px;
                font-size: 20px;
                cursor: pointer;
                z-index: 999;
                box-shadow: 0 8px 20px rgba(255, 140, 0, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: slideUp 0.4s ease;
            `;

            document.body.appendChild(scrollBtn);

            scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            scrollBtn.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.15) translateY(-5px)';
                this.style.boxShadow = '0 12px 30px rgba(255, 140, 0, 0.5)';
            });

            scrollBtn.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 8px 20px rgba(255, 140, 0, 0.3)';
            });
        }
    } else {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            scrollBtn.style.animation = 'slideDown 0.4s ease';
            setTimeout(() => scrollBtn.remove(), 400);
        }
    }
});

// Animate numbers on page load
function animateNumbers() {
    const numbers = document.querySelectorAll('.prestasi-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.innerText);
        const isPercentage = number.innerText.includes('%');
        const increment = target / 50;
        let count = 0;

        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(counter);
            }
            number.innerText = Math.floor(count) + (isPercentage ? '%' : '+');
        }, 30);
    });
}

// Trigger animation when section is in view
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('prestasi')) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const prestasiSection = document.querySelector('.prestasi');
if (prestasiSection) {
    observer.observe(prestasiSection);
}

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.profil-card, .fasilitas-card, .prestasi-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});

// Parallax effect untuk hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = '0 ' + (window.pageYOffset * 0.5) + 'px';
    }
});

// Add ripple effect pada semua tombol
document.addEventListener('click', function(e) {
    const btn = e.target.closest('button, .btn');
    if (btn && !btn.classList.contains('ripple-initialized')) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        if (!btn.style.position || btn.style.position === 'static') {
            btn.style.position = 'relative';
        }
        if (btn.style.overflow !== 'hidden') {
            btn.style.overflow = 'hidden';
        }

        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            width: 0;
            height: 0;
            opacity: 1;
        }
        to {
            width: 600px;
            height: 600px;
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(100px);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll link handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add visual feedback untuk input fields
const inputFields = document.querySelectorAll('input, textarea');
inputFields.forEach(field => {
    field.addEventListener('focus', function() {
        this.style.background = 'linear-gradient(135deg, #ffffff 0%, #fff8f0 100%)';
    });
    
    field.addEventListener('blur', function() {
        this.style.background = '#ffffff';
    });
});
