// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate counters when visible
            if (entry.target.classList.contains('dashboard-cards') ||
                entry.target.classList.contains('stats-grid')) {
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Dashboard and stats animations
const dashboardCards = document.querySelector('.dashboard-cards');
const statsGrid = document.querySelector('.stats-grid');

if (dashboardCards) observer.observe(dashboardCards);
if (statsGrid) observer.observe(statsGrid);

// Dataset Chart
function createDatasetChart() {
    const canvas = document.getElementById('datasetChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;

    const data = [
        { label: 'Customer Service', value: 85000, color: '#E63946' },
        { label: 'Sales', value: 65000, color: '#FFD700' },
        { label: 'Support', value: 55000, color: '#FF6B6B' },
        { label: 'Marketing', value: 45000, color: '#FFA500' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const barWidth = canvas.width / (data.length * 2);
    const maxValue = Math.max(...data.map(d => d.value));

    // Draw bars
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * (canvas.height - 60);
        const x = (index * 2 + 0.5) * barWidth;
        const y = canvas.height - barHeight - 40;

        // Draw bar
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, canvas.height - 20);

        // Draw value
        ctx.fillStyle = item.color;
        ctx.font = 'bold 14px Poppins';
        ctx.fillText(item.value.toLocaleString(), x + barWidth / 2, y - 10);
    });

    // Draw title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Training Data Distribution', canvas.width / 2, 20);
}

// Audio Player Customization
document.querySelectorAll('audio').forEach(audio => {
    audio.addEventListener('play', function() {
        document.querySelectorAll('audio').forEach(otherAudio => {
            if (otherAudio !== this) {
                otherAudio.pause();
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission
    formMessage.className = 'form-message';
    formMessage.textContent = 'Sending message...';
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.className = 'form-message success';
        formMessage.textContent = `Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`;
        contactForm.reset();

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1000);
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Initialize Chart on Load
window.addEventListener('load', () => {
    createDatasetChart();
});

// Responsive Chart Resize
window.addEventListener('resize', () => {
    createDatasetChart();
});

// Add hover effects to cards
document.querySelectorAll('.card, .audio-player, .tech-step, .stat-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Intersection Observer for staggered animations
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

// Apply staggered animation to cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    staggerObserver.observe(card);
});

// Console log for debugging
console.log('PHOENIX Partner Platform initialized successfully');
