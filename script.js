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


                   // Toggle Dark/Light Mode
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const bodyElement = document.body;

    // Verificar si el usuario ya tenía un modo guardado previamente
    if (localStorage.getItem('theme') === 'light') {
        bodyElement.classList.add('light-mode');
        if (themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            bodyElement.classList.toggle('light-mode');
            
            if (bodyElement.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
            }
        });
    }

