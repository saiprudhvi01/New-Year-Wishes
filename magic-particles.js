// Add professional floating particles to the welcome page
function createMagicParticles() {
    const welcome = document.querySelector('.welcome');
    if (!welcome) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'professional-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: -1;
    `;
    
    welcome.appendChild(particlesContainer);
    
    // Create subtle particles
    const symbols = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 15; i++) {
        createParticle(particlesContainer, symbols[Math.floor(Math.random() * symbols.length)]);
    }
}

function createParticle(container, symbol) {
    const particle = document.createElement('div');
    const size = Math.random() * 12 + 8;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 8;
    
    particle.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        color: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        animation: floatParticle ${duration}s linear infinite;
        left: ${Math.random() * 100}%;
        animation-delay: ${delay}s;
        opacity: 0.6;
    `;
    
    particle.textContent = symbol;
    container.appendChild(particle);
}

// Add particle animation CSS
const particleCSS = `
@keyframes floatParticle {
    0% {
        transform: translateY(100vh) rotate(0deg) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
        transform: scale(1);
    }
    90% {
        opacity: 0.6;
        transform: scale(1);
    }
    100% {
        transform: translateY(-100vh) rotate(360deg) scale(0);
        opacity: 0;
    }
}

.professional-particles {
    background: 
        radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.01) 0%, transparent 50%);
    animation: backgroundPulse 8s ease-in-out infinite;
}

@keyframes backgroundPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createMagicParticles);
