// Smooth scrolling dan active link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Update active link pada scroll
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

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.style.display = 'none';
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.elements[0].value;
            const email = this.elements[1].value;
            const subject = this.elements[2].value;
            const message = this.elements[3].value;

            // Simple validation
            if (name && email && subject && message) {
                // Show success message
                alert('Terima kasih ' + name + '! Pesan Anda telah kami terima. Kami akan menghubungi Anda segera.');
                
                // Reset form
                this.reset();
            } else {
                alert('Mohon isi semua field yang tersedia.');
            }
        });
    }
});

// Scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        if (!document.getElementById('scrollToTop')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTop';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #1e3a8a, #0ea5e9);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 18px;
                cursor: pointer;
                z-index: 999;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            document.body.appendChild(scrollBtn);

            scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            scrollBtn.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.15)';
            });

            scrollBtn.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        }
    } else {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            scrollBtn.remove();
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
    threshold: 0.5
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

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.profil-card, .fasilitas-card');

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
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    fadeObserver.observe(el);
});

// Initialize tooltips
document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseover', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background: #1f2937;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.875rem;
            z-index: 1000;
            white-space: nowrap;
        `;
        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';

        this.addEventListener('mouseout', function() {
            tooltip.remove();
        }, { once: true });
    });
});

// Add visual feedback on click
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.parentElement.tagName === 'BUTTON') {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        const btn = e.target.tagName === 'BUTTON' ? e.target : e.target.parentElement;
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

        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation keyframes
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
`;
document.head.appendChild(style);
