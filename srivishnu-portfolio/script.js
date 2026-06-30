document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // MOBILE MENU NAVIGATION
    // ==========================================================================
    const menuToggle = document.getElementById('framer-nav-toggle');
    const navMenu = document.getElementById('framer-nav-menu');
    const navLinks = document.querySelectorAll('.nav-link-framer');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars-staggered');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            }
        });

        // Close menu on selecting menu links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars-staggered');
            });
        });
    }

    // ==========================================================================
    // STICKY HEADER & SCROLL TRACKING
    // ==========================================================================
    const header = document.querySelector('.navbar-framer');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Blur navbar on scrolling
        if (window.scrollY > 40) {
            header.style.background = 'rgba(0, 0, 0, 0.7)';
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.4)';
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }

        // Identify current scroll offset and set navbar link active highlight
        let scrollPosition = window.scrollY + 140;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ==========================================================================
    // FAQ INTERACTIVE ACCORDIONS
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close other open accordions
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });

            // Toggle selected item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ==========================================================================
    // CONTACT FORM INTERACTIVE SUBMISSION
    // ==========================================================================
    const cForm = document.getElementById('framer-contact-form');
    const cSuccessAlert = document.getElementById('c-success-alert');
    const cSubmit = document.getElementById('c-submit');

    if (cForm) {
        cForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('c-name').value.trim();
            const email = document.getElementById('c-email').value.trim();
            const message = document.getElementById('c-message').value.trim();

            if (!name || !email || !message) {
                return;
            }

            // Disable buttons, show loading state
            cSubmit.disabled = true;
            cSubmit.innerHTML = 'Sending Message <i class="fa-solid fa-circle-notch fa-spin"></i>';

            // Simulate form submission delay
            setTimeout(() => {
                cForm.style.display = 'none';
                cSuccessAlert.style.display = 'block';
            }, 1600);
        });
    }

    // ==========================================================================
    // ENTRANCE SCROLL REVEAL (AOS STYLING)
    // ==========================================================================
    const animatedSelectors = [
        '.hero-framer-tag', '.hero-framer-title', '.hero-framer-subtitle', '.hero-framer-actions',
        '.hero-framer-image-card', '.project-stack-card', '.exp-card-framer', '.cert-card-framer', 
        '.languages-card-framer', '.faq-item', '.footer-cta-card'
    ];

    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-framer');
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-framer');
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.reveal-framer').forEach(el => {
        observer.observe(el);
    });
});
