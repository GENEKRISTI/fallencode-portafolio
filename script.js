document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. FILTROS DE PROYECTOS Y BOTÓN "VOLVER ARRIBA"
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
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

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('d-none');
            } else {
                backToTopBtn.classList.add('d-none');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // 2. CANVAS MATRIX DIGITAL RAIN (CORREGIDO)
    // ==========================================
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
    window.addEventListener('resize', resizeCanvas);

    const cyberColors = ['#ff2a85', '#00f0ff', '#9d4edd', '#3a86ff'];



const cyberColors = ['#ff2a85', '#00f0ff', '#9d4edd', '#3a86ff'];

    

    function drawMatrix() {
        const isLight = document.body.classList.contains('light-mode');
        
        // En modo claro limpiamos el canvas por completo para ver el fondo blanco limpio
        if (isLight) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            // Estela oscura clásica para el modo cyberpunk
            ctx.fillStyle = 'rgba(9, 5, 20, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // ESTO ES LO QUE CAMBIA: Forzamos los colores neón vibrantes en ambos modos
            ctx.fillStyle = cyberColors[Math.floor(Math.random() * cyberColors.length)];
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }





    // ==========================================
    // 3. MODO CLARO / OSCURO (CON PERSISTENCIA)
    // ==========================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const bodyElement = document.body;

    if (localStorage.getItem('theme') === 'light') {
        bodyElement.classList.add('light-mode');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('light-mode');
            
            if (bodyElement.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }
});


function drawMatrix() {
        const isLight = document.body.classList.contains('light-mode');
        
        // En modo claro limpiamos el canvas para que el fondo sea blanco limpio
        if (isLight) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            // Estela oscura clásica para el modo cyberpunk
            ctx.fillStyle = 'rgba(9, 5, 20, 0.12)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // <--- AQUÍ ESTÁ EL CAMBIO: Mantiene los colores neón vibrantes en ambos modos --->
            ctx.fillStyle = cyberColors[Math.floor(Math.random() * cyberColors.length)];
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
