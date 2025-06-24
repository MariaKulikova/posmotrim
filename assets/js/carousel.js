class InfiniteCarousel {
  constructor(element) {
    this.carousel = element;
    this.track = this.carousel.querySelector('.carousel__track');
    this.items = this.carousel.querySelectorAll('.carousel__items');
    
    if (this.track && this.items.length > 0) {
      this.init();
    }
  }
  
  init() {
    // Clone detection to ensure seamless loop
    this.setupInfiniteScroll();
    
    // Pause on hover
    this.setupHoverPause();
    
    // Handle touch/drag on mobile
    this.setupTouchHandling();
  }
  
  setupInfiniteScroll() {
    // Ensure we have enough items for smooth scrolling
    const firstSet = this.items[0];
    const itemsWidth = firstSet.offsetWidth;
    const viewportWidth = this.carousel.offsetWidth;
    
    // If we need more items to fill the viewport, clone more sets
    if (itemsWidth < viewportWidth * 2) {
      const additionalClones = Math.ceil((viewportWidth * 2) / itemsWidth);
      for (let i = 0; i < additionalClones; i++) {
        const clone = firstSet.cloneNode(true);
        this.track.appendChild(clone);
      }
    }
  }
  
  setupHoverPause() {
    let isPaused = false;
    
    this.carousel.addEventListener('mouseenter', () => {
      if (!isPaused) {
        this.track.style.animationPlayState = 'paused';
        isPaused = true;
      }
    });
    
    this.carousel.addEventListener('mouseleave', () => {
      if (isPaused) {
        this.track.style.animationPlayState = 'running';
        isPaused = false;
      }
    });
  }
  
  setupTouchHandling() {
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    
    this.track.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - this.carousel.offsetLeft;
      scrollLeft = this.carousel.scrollLeft;
      this.track.style.animationPlayState = 'paused';
    });
    
    this.track.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - this.carousel.offsetLeft;
      const walk = (x - startX) * 2;
      this.carousel.scrollLeft = scrollLeft - walk;
    });
    
    this.track.addEventListener('touchend', () => {
      isDown = false;
      setTimeout(() => {
        this.track.style.animationPlayState = 'running';
      }, 1000);
    });
  }
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => new InfiniteCarousel(carousel));
});

module.exports = InfiniteCarousel;