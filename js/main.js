/**
 * Santa's Workshop Portfolio - Main Script
 * Handles UI interactions, animations, and core functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollAnimations();
    initCounters();
    initNavigation();
    initModals();
    initCustomCursor();
});

/* --- Theme / Dark Mode --- */
function initTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');
    
    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.body.removeAttribute('data-theme');
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up, .animate-slide-left, .animate-slide-right, .animate-pop, .tech-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* --- Animated Counters --- */
function initCounters() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps estimate

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString() + (target > 100 ? '+' : '');
                    }
                };
                updateCounter();
            });
            observer.unobserve(statsContainer);
        }
    });

    observer.observe(statsContainer);
}

/* --- Mobile Navigation --- */
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Simple toggle for mobile view - needing CSS support or class toggle
            const isVisible = navLinks.style.display === 'flex';
            if (isVisible) {
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.background = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--color-card-bg)';
                navLinks.style.padding = '20px';
                navLinks.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth < 768) {
                    navLinks.style.display = '';
                }
            }
        });
    });
}

/* --- Project Modals --- */
function initModals() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');

    // Project Data
    const projects = {
        'project-1': {
            title: 'Auto-Wrapping Gift Machine',
            img: 'assets/images/projects/wrapping-machine.png',
            desc: 'A revolutionary device that wraps 500 gifts per minute using compressed steam and festive magic. It reduced the elf workload by 40% and features a self-replenishing paper system based on infinite loop theory.',
            tags: ['Magic', 'Mechanics', 'Steam Power', 'Efficiency']
        },
        'project-2': {
            title: 'Interactive Dream Toy System',
            img: 'assets/images/projects/dream-toy.png',
            desc: 'This holographic interface taps into the sheer imagination of a child to generate toy prototypes in real-time. It uses the Elvish AI Engine to predict trends before they happen.',
            tags: ['Holograms', 'AI', 'Cloud Data', 'UX Design']
        },
        'project-3': {
            title: 'Magical Automation Dashboard',
            img: 'assets/images/projects/magical-dashboard.png',
            desc: 'The central nervous system of the Workshop floor. This dashboard monitors Golem assembly lines, Reindeer stability, and Magic levels across the North Pole facility.',
            tags: ['UI/UX', 'Runes', 'Real-time Monitoring', 'Dashboard']
        },
        'project-4': {
            title: 'Sleigh Route Optimizer',
            img: 'assets/images/projects/sleigh-optimizer.png',
            desc: 'A complex pathfinding algorithm that accounts for weather patterns, time zone shifts, and chimney soot density. Ensures Santa creates the optimal path to visit every house in one night.',
            tags: ['Algorithms', 'GPS', 'Weather API', 'Logistics']
        }
    };

    document.querySelectorAll('.btn-view-project').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-id');
            const data = projects[projectId];
            
            if (data) {
                modalImg.src = data.img;
                modalTitle.innerText = data.title;
                modalDesc.innerText = data.desc;
                
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.innerText = tag;
                    span.style.background = 'var(--color-primary)';
                    span.style.color = 'white';
                    span.style.padding = '5px 15px';
                    span.style.borderRadius = '15px';
                    span.style.fontSize = '0.8em';
                    span.style.marginRight = '5px';
                    modalTags.appendChild(span);
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/* --- Custom Cursor --- */
function initCustomCursor() {
    const cursor = document.getElementById('cursor-star');
    const trail = document.getElementById('cursor-trail');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Simple trail effect
            // For a more advanced trail, we'd need a particle system or array of elements
            // Here we just make the trail follow with a slight delay using CSS transition? 
            // Better to use JS for accurate lag
            setTimeout(() => {
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
            }, 50);
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
}
