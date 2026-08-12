/* ============================================
   Affiliation Bureau of India - Script
   Premium Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        // Sticky navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link highlight for in-page scrolling
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection && (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/abi/') || window.location.pathname.endsWith('/'))) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === 'index.html' && currentSection === 'home') {
                    link.classList.add('active');
                } else if (href === 'services.html') {
                    link.classList.remove('active');
                } else if (href.includes('#')) {
                    link.classList.remove('active');
                    if (href.endsWith(`#${currentSection}`)) {
                        link.classList.add('active');
                    }
                }
            });
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ========== MOBILE MENU TOGGLE ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========== ANIMATED COUNTERS ==========
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * target);
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    }

    // Trigger counters on scroll into view
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll(
        '.service-card, .stat-card, .category-card, .process-step, .section-header, .categories-info, .cta-banner, .expertise-intro, .expertise-card, .about-story-copy, .about-story-panel, .team-card'
    );

    revealElements.forEach(el => el.classList.add('scroll-reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for siblings
                const siblings = entry.target.parentElement.querySelectorAll('.scroll-reveal');
                let delay = 0;
                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) {
                        delay = i * 0.08;
                    }
                });
                entry.target.style.transitionDelay = `${delay}s`;
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== HERO FLOATING PARTICLES ==========
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // ========== TILT EFFECT ON SERVICE CARDS ==========
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ========== PARALLAX ON HERO (Subtle) ==========
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const heroContent = hero.querySelector('.hero-content');
                const heroBgImage = hero.querySelector('.hero-bg-image');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                    heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
                }
                if (heroBgImage) {
                    heroBgImage.style.transform = `translateY(${scrolled * 0.06}px)`;
                }
            }
        }, { passive: true });
    }

    // ========== RIPPLE EFFECT ON BUTTONS ==========
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-anim 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-anim {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other accordions
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});
