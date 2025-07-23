// scripts/main.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Utility Functions for Performance ---
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        let lastResult;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
                lastResult = func.apply(context, args);
            }
            return lastResult;
        };
    }


    // -------------------------------------------
    // 1. Hero Section Animations
    // -------------------------------------------

    // "Hello" Typing & Deleting Effect
    const heroGreetingElement = document.querySelector('.hero-greeting');
    const greetingText = "Hello, I'm";
    let charIndex = 0;
    let isDeleting = false;
    let hasTypedOnce = false; // Flag to ensure tagline reveals only once

    function typeAndDeleteGreeting() {
        if (!heroGreetingElement) return;

        if (isDeleting) {
            // Deleting phase (from front to back)
            if (charIndex > 0) {
                heroGreetingElement.textContent = greetingText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeAndDeleteGreeting, 50); // Deleting speed
            } else {
                isDeleting = false;
                // After deleting, wait a bit then start typing again
                setTimeout(typeAndDeleteGreeting, 1000); // Wait 1 second before re-typing
            }
        } else {
            // Typing phase
            if (charIndex < greetingText.length) {
                heroGreetingElement.textContent += greetingText.charAt(charIndex);
                charIndex++;
                setTimeout(typeAndDeleteGreeting, 80); // Typing speed
            } else {
                // After typing, reveal tagline if not already revealed
                if (!hasTypedOnce) {
                    const heroTagline = document.querySelector('.hero-tagline');
                    if (heroTagline) {
                        heroTagline.classList.add('reveal-gradient');
                        hasTypedOnce = true; // Set flag so it only happens once
                    }
                }
                isDeleting = true;
                // After typing, wait 10 seconds then start deleting
                setTimeout(typeAndDeleteGreeting, 10000); // Wait 10 seconds before deleting
            }
        }
    }

    // Start typing when the page loads
    if (heroGreetingElement) {
        typeAndDeleteGreeting();
    }


    // Starfield/Particle Background Animation (Hero Section) - Remains the same
    const heroCanvas = document.getElementById('starfield');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let heroParticles = [];
        const numHeroParticles = 100; // Number of stars/particles
        const heroParticleSpeed = 0.5; // Speed of particle movement

        class HeroParticle {
            constructor(x, y, radius, color, vx, vy) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.color = color;
                this.vx = vx;
                this.vy = vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap particles around the screen
                if (this.x - this.radius > heroCanvas.width) this.x = -this.radius;
                if (this.x + this.radius < 0) this.x = heroCanvas.width + this.radius;
                if (this.y - this.radius > heroCanvas.height) this.y = -this.radius;
                if (this.y + this.radius < 0) this.y = heroCanvas.height + this.radius;
            }
        }

        function initHeroParticles() {
            heroParticles = [];
            for (let i = 0; i < numHeroParticles; i++) {
                const x = Math.random() * heroCanvas.width;
                const y = Math.random() * heroCanvas.height;
                const radius = Math.random() * 1.5 + 0.5; // Small stars
                const color = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`; // Varying opacity for twinkle
                const vx = (Math.random() - 0.5) * heroParticleSpeed; // Slight horizontal drift
                const vy = (Math.random() - 0.5) * heroParticleSpeed; // Slight vertical drift
                heroParticles.push(new HeroParticle(x, y, radius, color, vx, vy));
            }
        }

        function animateHeroParticles() {
            requestAnimationFrame(animateHeroParticles);
            ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height); // Clear canvas

            heroParticles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }

        const resizeHeroCanvas = debounce(() => {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroCanvas.width = heroSection.offsetWidth;
                heroCanvas.height = heroSection.offsetHeight;
                initHeroParticles();
            }
        }, 250);

        window.addEventListener('resize', resizeHeroCanvas);

        resizeHeroCanvas();
        animateHeroParticles();
    }


    // -------------------------------------------
    // 2. Body Background: 3D Fish with Tilt Control (using Three.js)
    // -------------------------------------------
    const bodyCanvas = document.getElementById('background-particles');
    let scene, camera, renderer, fishGroup, waterPlane;
    let targetFishRotation = { x: 0, y: 0 }; // For smooth rotation based on tilt

    function initThreeJS() {
        if (!bodyCanvas) return;

        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Start with black background, water will cover it

        // Camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 10); // Position camera slightly back

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas: bodyCanvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // Transparent clear color, scene background will show

        // --- Create Fish Model (Simplified) ---
        fishGroup = new THREE.Group();

        // Body: Elongated sphere or box
        const bodyGeometry = new THREE.SphereGeometry(1.5, 32, 16);
        bodyGeometry.scale(1.0, 0.6, 0.6); // Make it elongated
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x00A0FF, roughness: 0.5, metalness: 0.1 }); // Blue fish
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        fishGroup.add(body);

        // Tail: Cone
        const tailGeometry = new THREE.ConeGeometry(0.8, 1.5, 32);
        const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x0077CC, roughness: 0.5, metalness: 0.1 });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.rotation.x = Math.PI / 2; // Orient correctly
        tail.position.set(0, 0, -1.8); // Position behind body
        fishGroup.add(tail);

        // Fins (simple planes)
        const finGeometry = new THREE.PlaneGeometry(1.2, 0.8);
        const finMaterial = new THREE.MeshStandardMaterial({ color: 0x00C0FF, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
        const leftFin = new THREE.Mesh(finGeometry, finMaterial);
        leftFin.rotation.y = Math.PI / 2;
        leftFin.position.set(-1.2, 0, 0);
        fishGroup.add(leftFin);

        const rightFin = new THREE.Mesh(finGeometry, finMaterial);
        rightFin.rotation.y = -Math.PI / 2;
        rightFin.position.set(1.2, 0, 0);
        fishGroup.add(rightFin);

        // Orient the fish to face forward along Z-axis
        fishGroup.rotation.y = Math.PI / 2;
        fishGroup.position.set(0, 0, 0); // Initial position
        scene.add(fishGroup);

        // --- Create Water Plane ---
        const waterGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
        const waterMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xADD8E6, // Light blue water
            transparent: true,
            opacity: 0.2, // Very subtle transparency
            roughness: 0.5,
            metalness: 0.1,
            clearcoat: 0.5,
            clearcoatRoughness: 0.5
        });
        waterPlane = new THREE.Mesh(waterGeometry, waterMaterial);
        waterPlane.rotation.x = -Math.PI / 2; // Lie flat
        waterPlane.position.y = -2; // Position below the fish
        scene.add(waterPlane);

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft ambient light
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White directional light
        directionalLight.position.set(5, 10, 7);
        scene.add(directionalLight);

        // --- Event Listeners ---
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('deviceorientation', handleOrientation);

        animateThreeJS(); // Start the animation loop
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function handleOrientation(event) {
        // event.gamma: left-to-right tilt (degrees)
        // event.beta: front-to-back tilt (degrees)

        // Map tilt to a target rotation for the fish
        // Gamma (left-right) affects Y-axis rotation (yaw)
        // Beta (front-back) affects X-axis rotation (pitch)
        // We'll invert beta for more intuitive control (tilting phone forward makes fish dive)

        // Convert degrees to radians and scale
        const maxTiltAngle = 30; // Max degrees of tilt to react to
        targetFishRotation.y = THREE.MathUtils.degToRad(event.gamma / maxTiltAngle * (Math.PI / 4)); // Max +/- 45 degrees yaw
        targetFishRotation.x = THREE.MathUtils.degToRad(-event.beta / maxTiltAngle * (Math.PI / 6)); // Max +/- 30 degrees pitch
    }

    function animateThreeJS() {
        requestAnimationFrame(animateThreeJS);

        if (!fishGroup || !renderer || !scene || !camera) return;

        // Smoothly interpolate fish rotation towards target
        fishGroup.rotation.y += (targetFishRotation.y - fishGroup.rotation.y) * 0.05;
        fishGroup.rotation.x += (targetFishRotation.x - fishGroup.rotation.x) * 0.05;

        // Optional: Simple idle swimming motion
        fishGroup.position.z = Math.sin(Date.now() * 0.001) * 0.5; // Gentle forward/backward bob
        fishGroup.position.y = Math.cos(Date.now() * 0.0008) * 0.2; // Gentle up/down bob

        renderer.render(scene, camera);
    }

    // Initialize Three.js when the DOM is ready
    if (bodyCanvas) {
        initThreeJS();
    }


    // -------------------------------------------
    // 3. Smooth Scrolling for Navigation Links
    // -------------------------------------------
    const navLinks = document.querySelectorAll(
        '.main-nav a, .nav-bottom-mobile a, .hero-cta-buttons a'
    );

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            let targetElement;
            if (targetId === '#hero' || targetId === '#') {
                targetElement = document.getElementById('hero');
            } else {
                targetElement = document.querySelector(targetId);
            }

            if (targetElement) {
                let offset = 0;
                const siteHeader = document.querySelector('.site-header');
                const mobileNavBottom = document.querySelector('.nav-bottom-mobile');

                if (window.innerWidth > 768) {
                    if (siteHeader && window.getComputedStyle(siteHeader).display !== 'none') {
                        offset = siteHeader.offsetHeight;
                    }
                } else {
                    if (targetId !== '#hero' && targetId !== '#') {
                        if (mobileNavBottom && window.getComputedStyle(mobileNavBottom).display !== 'none') {
                            offset = mobileNavBottom.offsetHeight;
                        }
                    }
                }

                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // -------------------------------------------
    // 4. Active Navigation State on Scroll
    // -------------------------------------------
    const sections = document.querySelectorAll('section');
    const siteHeader = document.querySelector('.site-header');
    const mobileNavBottom = document.querySelector('.nav-bottom-mobile');

    const updateActiveLink = throttle(() => {
        let currentActive = '';
        let offsetHeight = 0;

        if (window.innerWidth > 768) {
            if (siteHeader && window.getComputedStyle(siteHeader).display !== 'none') {
                offsetHeight = siteHeader.offsetHeight;
            }
        } else {
            if (mobileNavBottom && window.getComputedStyle(mobileNavBottom).display !== 'none') {
                offsetHeight = mobileNavBottom.offsetHeight;
            }
        }

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= offsetHeight + 50 && sectionTop + section.offsetHeight > offsetHeight + 50) {
                currentActive = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });

        document.querySelectorAll('.nav-bottom-mobile a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }, 100);


    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();


    // -------------------------------------------
    // 5. Timeline Lighting Effect & Item Fade-in
    // -------------------------------------------
    const timelines = document.querySelectorAll('.timeline');

    timelines.forEach(timeline => {
        const timelineLine = timeline.querySelector('.timeline-line');
        const timelineItems = timeline.querySelectorAll('.timeline-item');

        if (!timelineLine) return;

        const itemObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        });

        timelineItems.forEach(item => {
            itemObserver.observe(item);
        });

        const updateTimelineLine = throttle(() => {
            const timelineRect = timeline.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const headerHeight = window.innerWidth > 768 && siteHeader && window.getComputedStyle(siteHeader).display !== 'none' ? siteHeader.offsetHeight : 0;
            const mobileNavHeight = window.innerWidth <= 768 && mobileNavBottom && window.getComputedStyle(mobileNavBottom).display !== 'none' ? mobileNavBottom.offsetHeight : 0;

            let scrollYRelativeToTimeline = window.pageYOffset - (timeline.offsetTop - headerHeight - mobileNavHeight);
            let newHeight = Math.max(0, Math.min(timeline.offsetHeight, scrollYRelativeToTimeline));

            if (timelineRect.top >= viewportHeight) {
                newHeight = 0;
            }
            if (timelineRect.bottom <= 0) {
                 newHeight = timeline.offsetHeight;
            }

            timelineLine.style.height = `${newHeight}px`;
        }, 50);

        window.addEventListener('scroll', updateTimelineLine);
        window.addEventListener('resize', updateTimelineLine);
        updateTimelineLine();
    });


    // -------------------------------------------
    // 6. General Fade-in Animation on Scroll
    // -------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const generalFadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.section h2, .section p:not(.hero-tagline), .about-image, .skill-category-card, .project-card, .achievement-card, .contact-form, .social-links, .hero-cta-buttons .button, .about-tools-logos h3, .tool-logos-grid img, .blog-content h3, .blog-content p, .contact-content p'
    ).forEach(el => {
        if (!el.classList.contains('hero-tagline') && !el.closest('.timeline-item')) {
            el.classList.add('fade-in-element');
            generalFadeInObserver.observe(el);
        }
    });

});
