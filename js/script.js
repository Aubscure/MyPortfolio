// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check Local Storage or System Preference on load
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

// Toggle Event with rotation animation (handled in mobile theme toggle section below)

// Desktop theme toggle hover effects
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('mouseenter', () => {
        const icons = themeToggleBtn.querySelectorAll('i');
        icons.forEach(icon => {
            if (!icon.style.transform || icon.style.transform === 'rotate(0deg)') {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    themeToggleBtn.addEventListener('mouseleave', () => {
        const icons = themeToggleBtn.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });
    });
}

// --- Mobile Menu Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    
    mobileMenu.classList.toggle('hidden');
    
    // Rotate the hamburger icon smoothly
    icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (isHidden) {
        icon.style.transform = 'rotate(90deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.style.transform = 'rotate(0deg)';
    });
});

// --- Scroll Animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add appropriate animation based on element type
            if (entry.target.classList.contains('scroll-element')) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll elements
document.querySelectorAll('.scroll-element').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// --- Parallax Scrolling Effect ---
window.addEventListener('scroll', () => {
    // Only apply parallax on larger screens to prevent mobile issues
    if (window.innerWidth >= 768) {
        const scrollY = window.scrollY;
        const blobs = document.querySelectorAll('.animate-blob');
        
        blobs.forEach((blob, index) => {
            const speed = 0.5 + index * 0.1;
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
});

// --- Smooth Scroll Enhancement ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// --- Button Ripple Effect ---
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn-primary, .btn-secondary, a[href^="#projects"], a[href^="mailto"]').forEach(button => {
    button.addEventListener('click', createRipple);
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
});

// --- Continuous Animations for Interactive Elements ---
// Add subtle animations on page load
window.addEventListener('load', () => {
    // Animate nav on load
    const nav = document.querySelector('nav');
    if (nav) {
        nav.style.animation = 'slideDown 0.6s ease-out';
    }
    
    // Animate hero content
    const h2 = document.querySelector('#home h2');
    const h1 = document.querySelector('#home h1');
    const p = document.querySelector('#home p');
    
    if (h2) h2.style.animation = 'fadeInUp 0.8s ease-out';
    if (h1) h1.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';
    if (p) p.style.animation = 'fadeInUp 0.8s ease-out 0.4s forwards';
});

// --- Icon Hover Effects ---
document.querySelectorAll('.fa-download, .fa-arrow-right').forEach(icon => {
    const parent = icon.parentElement;
    parent.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-3px) scale(1.1)';
        icon.style.transition = 'transform 0.3s ease-out';
    });
    parent.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

// --- Add hover scale to all tech pills ---
document.querySelectorAll('.tech-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        pill.style.transform = 'scale(1.15) translateY(-5px)';
        pill.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    pill.addEventListener('mouseleave', () => {
        pill.style.transform = 'scale(1) translateY(0)';
    });
});

// --- Mobile Theme Toggle ---
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
        const icons = themeToggleMobile.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            icon.style.transform = 'rotate(360deg)';
        });
        
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            htmlElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
        
        // Sync desktop theme toggle
        if (themeToggleBtn) {
            const desktopIcons = themeToggleBtn.querySelectorAll('i');
            desktopIcons.forEach(icon => {
                icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                icon.style.transform = 'rotate(360deg)';
            });
        }
    });
}

// Sync desktop theme toggle with mobile
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const icons = themeToggleBtn.querySelectorAll('i');
        icons.forEach(icon => {
            icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            icon.style.transform = 'rotate(360deg)';
        });
        
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            htmlElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
        
        // Sync mobile theme toggle
        if (themeToggleMobile) {
            const mobileIcons = themeToggleMobile.querySelectorAll('i');
            mobileIcons.forEach(icon => {
                icon.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                icon.style.transform = 'rotate(360deg)';
            });
        }
    });


    // --- Project Card Expansion Logic ---

    // 1. Mobile "See More" Toggle
    document.querySelectorAll('.see-more-btn').forEach(btn => {
        // Check if text is actually long enough to need a button
        const textElement = btn.previousElementSibling; // The <p> tag
        
        // If text is short (scrollHeight <= clientHeight), hide the button
        // 72px is approx 4.5rem. We allow a small buffer.
        if (textElement.scrollHeight <= 80) {
            btn.style.display = 'none';
        }

        btn.addEventListener('click', (e) => {
            // Stop the click from triggering the card's main link
            e.stopPropagation();
            
            const isExpanded = textElement.classList.contains('max-h-[24rem]');
            
            if (isExpanded) {
                // Shrink back
                textElement.classList.remove('max-h-[24rem]');
                textElement.classList.add('max-h-[4.5rem]');
                btn.textContent = 'See More';
            } else {
                // Expand
                textElement.classList.remove('max-h-[4.5rem]');
                textElement.classList.add('max-h-[24rem]');
                btn.textContent = 'See Less';
            }
        });
    });

    // 2. Prevent "View Code" button from double-firing if nested (Safety Check)
    // Since we used onclick on the parent div, we don't strictly need this, 
    // but it's good practice to stop propagation on interactive children.
    document.querySelectorAll('.project-card a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}