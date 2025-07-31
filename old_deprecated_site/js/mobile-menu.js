class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.mobile-navbar__toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.menuLinks = document.querySelectorAll('.mobile-menu__nav a');
    this.body = document.body;
    
    if (this.menuToggle && this.mobileMenu) {
      this.init();
    }
  }
  
  init() {
    // Toggle menu on button click
    this.menuToggle.addEventListener('click', () => {
      this.toggleMenu();
    });
    
    // Close menu when clicking on a link
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen()) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    const isOpen = this.isMenuOpen();
    
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.menuToggle.classList.add('active');
    this.mobileMenu.classList.add('active');
    this.body.style.overflow = 'hidden';
    
    // Set aria attributes for accessibility
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.menuToggle.setAttribute('aria-label', 'Закрыть меню');
  }
  
  closeMenu() {
    this.menuToggle.classList.remove('active');
    this.mobileMenu.classList.remove('active');
    this.body.style.overflow = '';
    
    // Set aria attributes for accessibility
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.setAttribute('aria-label', 'Открыть меню');
  }
  
  isMenuOpen() {
    return this.mobileMenu.classList.contains('active');
  }
}

// Initialize mobile menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
});

module.exports = MobileMenu;