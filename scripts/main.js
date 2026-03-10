document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        
        // Update aria-expanded attribute
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking overlay (outside nav)
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            hamburger.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Timeline scroll animation
    const timelineEntries = document.querySelectorAll('.timeline-entry');
    
    if (timelineEntries.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        timelineEntries.forEach(entry => {
            observer.observe(entry);
        });
    }

    // ===================
    // Flip Cards
    // ===================
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // ===================
    // Draggable Stickers
    // ===================
    const draggables = document.querySelectorAll('.draggable');
    let currentDrag = null;
    let offsetX = 0;
    let offsetY = 0;

    draggables.forEach(sticker => {
        sticker.addEventListener('mousedown', (e) => {
            currentDrag = sticker;
            const rect = sticker.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            sticker.style.zIndex = 1000;
        });

        sticker.addEventListener('touchstart', (e) => {
            currentDrag = sticker;
            const touch = e.touches[0];
            const rect = sticker.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
            sticker.style.zIndex = 1000;
        }, { passive: true });
    });

    document.addEventListener('mousemove', (e) => {
        if (currentDrag) {
            currentDrag.style.left = (e.clientX - offsetX) + 'px';
            currentDrag.style.top = (e.clientY - offsetY) + 'px';
            currentDrag.style.right = 'auto';
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (currentDrag) {
            const touch = e.touches[0];
            currentDrag.style.left = (touch.clientX - offsetX) + 'px';
            currentDrag.style.top = (touch.clientY - offsetY) + 'px';
            currentDrag.style.right = 'auto';
        }
    }, { passive: true });

    document.addEventListener('mouseup', () => {
        if (currentDrag) {
            currentDrag.style.zIndex = 50;
            currentDrag = null;
        }
    });

    document.addEventListener('touchend', () => {
        if (currentDrag) {
            currentDrag.style.zIndex = 50;
            currentDrag = null;
        }
    });



    // ===================
    // Contact Form - mailto handler
    // ===================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // email address 
            const toEmail = 'cheyenne.clark@adelaide.edu.au';
            
            // Build the email body
            const body = `Hi Cheyenne,

My name: ${name}
My email: ${email}

Message:
${message}

---
Sent from your website contact form`;
            
            // Encode for URL
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(body);
            
            // Open mailto link
            window.location.href = `mailto:${toEmail}?subject=${encodedSubject}&body=${encodedBody}`;
        });
    }
});