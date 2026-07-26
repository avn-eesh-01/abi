const navbarHTML = `
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">
                <img src="assets/logo-2-abi.png" alt="Affiliation Bureau of India" style="height: 65px; width: auto;">
            </a>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html" class="nav-link" id="nav-home">Home</a></li>
                <li><a href="services.html" class="nav-link" id="nav-services">Services</a></li>
                <li><a href="affiliation-categories.html" class="nav-link" id="nav-categories">Affiliation Categories</a></li>
                <li><a href="about.html" class="nav-link" id="nav-about">About Us</a></li>
                <li><a href="index.html#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="index.html#contact" class="btn btn-primary nav-cta">
                Apply for Affiliation <i class="fas fa-arrow-right"></i>
            </a>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
`;

// Inject the navbar
const container = document.getElementById('navbar-container');
if (container) {
    container.innerHTML = navbarHTML;
}

// Highlight the active page based on URL
const currentPath = window.location.pathname;
if (currentPath.includes('services.html')) {
    document.getElementById('nav-services').classList.add('active');
} else if (currentPath.includes('affiliation-categories.html')) {
    document.getElementById('nav-categories').classList.add('active');
} else if (currentPath.includes('about.html')) {
    document.getElementById('nav-about').classList.add('active');
} else if (currentPath.endsWith('index.html') || currentPath.endsWith('/abi/') || currentPath.endsWith('/')) {
    document.getElementById('nav-home').classList.add('active');
}
