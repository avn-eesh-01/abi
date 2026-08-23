const navbarScript = document.querySelector('script[src*="navbar.js"]');
const scriptSrc = navbarScript?.getAttribute('src') || 'navbar.js';
const ROOT = scriptSrc.includes('../') ? '../' : './';

const navbarHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="${ROOT}" class="nav-logo">
                <img src="${ROOT}assets/logo.png" alt="Affiliation Bureau of India" style="height: 65px; width: auto;">
            </a>
            <ul class="nav-links" id="navLinks">
                <li><a href="${ROOT}" class="nav-link" id="nav-home">Home</a></li>
                <li><a href="${ROOT}services/" class="nav-link" id="nav-services">Services</a></li>
                <li class="nav-dropdown">
                    <a href="${ROOT}affiliation-categories/" class="nav-link nav-dropdown-overview" id="nav-categories">Affiliation Categories</a>
                    <button class="nav-dropdown-toggle" id="nav-categories-toggle" type="button" aria-label="Open affiliation category menu" aria-expanded="false" aria-controls="categoryMenu">
                        <i class="fas fa-chevron-down" aria-hidden="true"></i>
                    </button>
                    <ul class="nav-dropdown-menu" id="categoryMenu" aria-label="Affiliation categories">
                        <li><a href="${ROOT}affiliation-categories/#schools" class="nav-dropdown-link">School Affiliation</a></li>
                        <li><a href="${ROOT}affiliation-categories/#colleges" class="nav-dropdown-link">College Affiliation</a></li>
                        <li><a href="${ROOT}affiliation-categories/#universities" class="nav-dropdown-link">University Affiliation</a></li>
                    </ul>
                </li>
                <li><a href="${ROOT}about/" class="nav-link" id="nav-about">About Us</a></li>
                <li><a href="${ROOT}contact/" class="nav-link" id="nav-contact">Contact</a></li>
            </ul>
            <a href="${ROOT}contact/#contact" class="btn btn-primary nav-cta">
                Apply for Affiliation <i class="fas fa-arrow-right"></i>
            </a>
            <button class="mobile-toggle" id="mobileToggle" type="button" aria-label="Open navigation" aria-controls="navLinks" aria-expanded="false">
                <i class="fas fa-bars toggle-icon-bars" style="font-size: 1.5rem; color: var(--gray-700);"></i>
                <i class="fas fa-xmark toggle-icon-cross" style="font-size: 1.5rem; color: var(--gray-700); display: none;"></i>
            </button>
        </div>
    </nav>
`;

// Inject the navbar
const container = document.getElementById('navbar-container');
if (container) {
    container.innerHTML = navbarHTML;
}

// Mobile menu toggle functionality
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (mobileToggle && navLinks) {
    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open navigation');
        document.body.classList.remove('menu-open');
    };

    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        document.body.classList.toggle('menu-open', isOpen);
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    const navItems = navLinks.querySelectorAll('.nav-link, .nav-dropdown-link');
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) closeMenu();
    });
}

const categoryToggle = document.getElementById('nav-categories-toggle');
const categoryDropdown = categoryToggle?.closest('.nav-dropdown');

if (categoryToggle && categoryDropdown) {
    const closeCategoryMenu = () => {
        categoryDropdown.classList.remove('open');
        categoryToggle.setAttribute('aria-expanded', 'false');
    };

    categoryToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = categoryDropdown.classList.toggle('open');
        categoryToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
        if (!categoryDropdown.contains(event.target)) closeCategoryMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeCategoryMenu();
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight the active page based on URL
const currentPath = window.location.pathname;
const pageMatch = currentPath.match(/\/(services|affiliation-categories|about|contact)(?:\/|$)/);

if (pageMatch) {
    const activeNav = {
        services: 'nav-services',
        'affiliation-categories': 'nav-categories',
        about: 'nav-about',
        contact: 'nav-contact',
    }[pageMatch[1]];

    if (activeNav) {
        document.getElementById(activeNav)?.classList.add('active');
    }
} else {
    document.getElementById('nav-home')?.classList.add('active');
}
