// Cursor trail gradient effect
document.addEventListener('DOMContentLoaded', () => {
  const pageContainer = document.querySelector('.page-container');
  if (!pageContainer) return;

  const trailPositions = [];
  const MAX_TRAIL_LENGTH = 30;
  const FADE_DURATION = 1500;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();

    trailPositions.push({
      x: e.pageX,
      y: e.pageY,
      timestamp: now
    });

    // Remove old positions
    while (trailPositions.length > 0 && now - trailPositions[0].timestamp > FADE_DURATION) {
      trailPositions.shift();
    }

    if (trailPositions.length > MAX_TRAIL_LENGTH) {
      trailPositions.shift();
    }

    updateGradient();
  });

  function updateGradient() {
    if (trailPositions.length === 0) {
      pageContainer.style.background = '#ffffff';
      return;
    }

    const gradients = trailPositions.map((pos, index) => {
      const age = Date.now() - pos.timestamp;
      const opacity = Math.max(0, 1 - (age / FADE_DURATION));
      const sizeMultiplier = 1 - (index / trailPositions.length) * 0.3;
      const size = 350 * sizeMultiplier;

      return `radial-gradient(circle ${size}px at ${pos.x}px ${pos.y}px,
        rgba(60, 213, 0, ${opacity * 0.15}) 0%,
        rgba(60, 213, 0, ${opacity * 0.14}) 10%,
        rgba(60, 213, 0, ${opacity * 0.12}) 20%,
        rgba(60, 213, 0, ${opacity * 0.1}) 30%,
        rgba(120, 223, 50, ${opacity * 0.08}) 40%,
        rgba(180, 234, 100, ${opacity * 0.06}) 50%,
        rgba(220, 244, 180, ${opacity * 0.05}) 60%,
        rgba(255, 255, 255, ${opacity * 0.04}) 70%,
        rgba(255, 255, 255, ${opacity * 0.03}) 80%,
        rgba(255, 255, 255, ${opacity * 0.02}) 90%,
        rgba(255, 255, 255, ${opacity * 0.01}) 95%,
        transparent 100%)`;
    });

    pageContainer.style.background = `${gradients.join(', ')}, #ffffff`;
  }

  // Clean up old positions periodically
  setInterval(() => {
    const now = Date.now();
    let changed = false;

    while (trailPositions.length > 0 && now - trailPositions[0].timestamp > FADE_DURATION) {
      trailPositions.shift();
      changed = true;
    }

    if (changed || trailPositions.length > 0) {
      updateGradient();
    }
  }, 50);
});
