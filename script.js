document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideEl = document.getElementById('current-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        currentSlideEl.textContent = currentSlide + 1;
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    // Event Listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event Listener for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide(); // Swipe left
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide(); // Swipe right
        }
    }
});

// Gerador de Animações (Partículas)
function initParticles() {
    const slideAnimations = [
        { id: 'slide-1', type: 'led', count: 10 },
        { id: 'slide-2', type: 'like', count: 15, icon: '❤' },
        { id: 'slide-3', type: 'star', count: 20, icon: '✦' },
        { id: 'slide-4', type: 'like', count: 15, icon: '💬' },
        { id: 'slide-5', type: 'rocket', count: 8, icon: '🚀' },
        { id: 'slide-6', type: 'arrow', count: 10, icon: '↗' },
        { id: 'slide-7', type: 'star', count: 20, icon: '💰' },
        { id: 'slide-8', type: 'arrow', count: 12, icon: '📈' },
        { id: 'slide-9', type: 'rocket', count: 15, icon: '🚀' }
    ];

    slideAnimations.forEach(config => {
        const slide = document.getElementById(config.id);
        if (!slide) return;
        const bg = slide.querySelector('.animated-bg');
        if (!bg) return;
        
        // Remove opacidade global que esconde as particulas
        bg.style.opacity = '1';
        bg.style.mixBlendMode = 'normal';

        for (let i = 0; i < config.count; i++) {
            const particle = document.createElement('div');
            particle.className = `particle particle-${config.type}`;
            
            if (config.icon) {
                particle.textContent = config.icon;
            }

            // Posição horizontal aleatória
            const left = Math.random() * 100;
            particle.style.left = `${left}%`;

            // Delay aleatório para não começarem todos juntos
            const delay = Math.random() * 5;
            particle.style.animationDelay = `${delay}s`;

            // Duração aleatória para variar velocidade
            const duration = 3 + Math.random() * 4;
            particle.style.animationDuration = `${duration}s`;

            bg.appendChild(particle);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
});
