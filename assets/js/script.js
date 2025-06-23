document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 60;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-black', 'font-semibold');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-black', 'font-semibold');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial call
    
    // Mobile menu toggle (if needed in future)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const sidebar = document.querySelector('aside');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            sidebar.classList.toggle('translate-x-full');
        });
    }
});