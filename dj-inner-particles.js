// Add professional particles to inner pages
function createInnerDJParticles() {
    const body = document.body;
    if (!body) return;
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'inner-professional-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: -1;
    `;
    
    body.appendChild(particlesContainer);
    
    // Create subtle particles
    const symbols = ['✨', '⭐', '💫', '🌟', '🎵'];
    
    for (let i = 0; i < 12; i++) {
        createInnerParticle(particlesContainer, symbols[Math.floor(Math.random() * symbols.length)]);
    }
}

function createInnerParticle(container, symbol) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 6;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    
    particle.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        color: rgba(255, 255, 255, 0.2);
        pointer-events: none;
        animation: innerFloatParticle ${duration}s linear infinite;
        left: ${Math.random() * 100}%;
        animation-delay: ${delay}s;
        opacity: 0.4;
    `;
    
    particle.textContent = symbol;
    container.appendChild(particle);
}

// Add inner particle animation CSS
const innerParticleCSS = `
@keyframes innerFloatParticle {
    0% {
        transform: translateY(100vh) rotate(0deg) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 0.4;
        transform: scale(1);
    }
    90% {
        opacity: 0.4;
        transform: scale(1);
    }
    100% {
        transform: translateY(-100vh) rotate(360deg) scale(0);
        opacity: 0;
    }
}

.inner-professional-particles {
    pointer-events: none;
    z-index: -1;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = innerParticleCSS;
document.head.appendChild(style);

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createInnerDJParticles);
