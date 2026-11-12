/* ==========================================
   FALLENCODE // INTERACTIVE SCRIPTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('d-none');
        } else {
            backToTopBtn.classList.add('d-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Caracteres estilo Matrix y ciberespacio
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const charArray = chars.split('');
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];

    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
        }
    }
    initDrops();
    window.addEventListener('resize', initDrops);

    // Colores de estilo cyberfunk (fucsia, cian, morado, azul eléctrico)
    const cyberColors = ['#ff2a85', '#00f0ff', '#9d4edd', '#3a86ff'];

    function drawMatrix() {
        // Detecta si tu página tiene modo claro u oscuro activo para adaptar el fondo del rastro
        const isLight = document.body.classList.contains('light-mode');
        
        // Estela semitransparente para generar el efecto de desvanecimiento
        ctx.fillStyle = isLight ? 'rgba(238, 242, 255, 0.12)' : 'rgba(9, 5, 20, 0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            const color = cyberColors[Math.floor(Math.random() * cyberColors.length)];
            
            ctx.fillStyle = color;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Velocidad de la animación (42 milisegundos por frame)
    setInterval(drawMatrix, 42);
});
