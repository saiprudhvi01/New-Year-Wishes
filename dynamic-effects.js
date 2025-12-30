// Dynamic visual effects manager
class DynamicEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createLightOrbs();
        this.createFloatingParticles();
        this.addInteractiveGlow();
        this.initMobileOptimizations();
    }

    createLightOrbs() {
        const orbsContainer = document.createElement('div');
        orbsContainer.className = 'light-orbs';
        
        // Create 4 floating light orbs
        for (let i = 0; i < 4; i++) {
            const orb = document.createElement('div');
            orb.className = `light-orb light-orb-${i + 1}`;
            orbsContainer.appendChild(orb);
        }
        
        document.body.appendChild(orbsContainer);
    }

    createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            this.createParticle(particlesContainer);
        }
        
        document.body.appendChild(particlesContainer);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle ${duration}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.8);
        `;
        
        container.appendChild(particle);
    }

    addInteractiveGlow() {
        // Add glow effect to interactive elements
        const interactiveElements = document.querySelectorAll('button, .wish-card, .hero-quote, .pre-new-year-message');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all 0.3s ease';
                element.style.transform = 'scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    initMobileOptimizations() {
        // Reduce effects on mobile for better performance
        if (window.innerWidth <= 768) {
            document.body.style.setProperty('--particle-count', '10');
            document.body.style.setProperty('--orb-count', '2');
        }
    }
}

// Add particle animation CSS
const particleCSS = `
@keyframes floatParticle {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

@media (max-width: 768px) {
    .light-orb {
        animation-duration: 20s !important;
        opacity: 0.2 !important;
    }
    
    body::after {
        animation-duration: 30s !important;
        opacity: 0.3 !important;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DynamicEffects();
});

// Add touch effects for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${touch.clientX - 50}px;
            top: ${touch.clientY - 50}px;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);
