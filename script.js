// JavaScript for Ganadería Premium Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 90; // Increased offset to account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current nav item
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');

    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Increased offset for better detection
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', setActiveNavItem);

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-item h2');
        
        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.innerText = Math.ceil(current) + counter.innerText.replace(/\d/g, '').replace(/\+/g, '+');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = counter.innerText;
                }
            };
            
            updateCounter();
        });
    };

    // Intersection Observer for animations (DISABLED)
    // const observerOptions = {
    //     threshold: 0.1,
    //     rootMargin: '0px 0px -50px 0px'
    // };

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add('animate-on-scroll');
    //             
    //             // Trigger counter animation for stats section
    //             if (entry.target.classList.contains('bg-success')) {
    //                 animateCounters();
    //             }
    //         }
    //     });
    // }, observerOptions);

    // Observe elements for animation (DISABLED)
    // const animateElements = document.querySelectorAll('.card, .service-item, .stat-item, .contact-item');
    // animateElements.forEach(el => observer.observe(el));

    // Add hover effects to cards (DISABLED)
    // const cards = document.querySelectorAll('.card');
    // cards.forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-10px)';
    //     });
    //     
    //     card.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0)';
    //     });
    // });

    // Form validation (if form is added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
                this.reset();
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add loading animation
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = '<div class="spinner-border text-success" role="status"><span class="visually-hidden">Cargando...</span></div>';
    pageLoader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(pageLoader);

    // Hide loader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(pageLoader);
            }, 300);
        }, 500);
    });

    // Add parallax effect to hero section (DISABLED)
    // const heroSection = document.querySelector('.hero-section');
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const parallax = scrolled * 0.5;
    //     
    //     if (heroSection) {
    //         heroSection.style.transform = `translateY(${parallax}px)`;
    //     }
    // });
});

// Utility functions
const utils = {
    // Scroll to top function
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    // Format phone number
    formatPhone: function(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    },
    
    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'btn btn-success btn-scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', utils.scrollToTop);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
