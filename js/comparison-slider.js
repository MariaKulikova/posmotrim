// Before/After Comparison Slider Component
class ComparisonSlider {
  constructor(element) {
    this.container = element;
    this.handle = this.container.querySelector('.comparison-slider__handle');
    this.afterImage = this.container.querySelector('.comparison-slider__image--after');
    
    if (!this.handle || !this.afterImage) return;
    
    this.isActive = false;
    this.currentX = null;
    
    this.init();
  }
  
  init() {
    // Mouse events
    this.handle.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    
    // Touch events
    this.handle.addEventListener('touchstart', this.startDrag.bind(this));
    document.addEventListener('touchmove', this.drag.bind(this));
    document.addEventListener('touchend', this.endDrag.bind(this));
    
    // Click on container to move handle
    this.container.addEventListener('click', this.moveToClick.bind(this));
  }
  
  startDrag(e) {
    e.preventDefault();
    this.isActive = true;
    this.container.classList.add('comparison-slider--dragging');
    document.body.style.cursor = 'col-resize';
  }
  
  drag(e) {
    if (!this.isActive) return;
    
    e.preventDefault();
    
    const rect = this.container.getBoundingClientRect();
    const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    
    let position = ((x - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    
    this.updatePosition(position);
  }
  
  endDrag() {
    this.isActive = false;
    this.container.classList.remove('comparison-slider--dragging');
    document.body.style.cursor = '';
  }
  
  moveToClick(e) {
    if (e.target === this.handle || this.isActive) return;
    
    const rect = this.container.getBoundingClientRect();
    const x = e.clientX;
    
    let position = ((x - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    
    this.updatePosition(position);
  }
  
  updatePosition(position) {
    this.handle.style.left = `${position}%`;
    this.afterImage.style.clipPath = `inset(0 0 0 ${position}%)`;
  }
}

// Initialize all comparison sliders on page load
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.comparison-slider');
  sliders.forEach(slider => new ComparisonSlider(slider));
});