// Cursor trail gradient effect
document.addEventListener('DOMContentLoaded', () => {
  const pageContainer = document.querySelector('.page-container');

  if (!pageContainer) {
    console.error('Page container not found');
    return;
  }

  console.log('Cursor trail initialized');

  // Array to store trail positions
  const trailPositions = [];
  const maxTrailLength = 30; // Number of trail points
  const fadeDuration = 1500; // Duration in ms for trail to fade out

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();

    // Add new position to trail - using pageX/pageY for absolute positioning
    trailPositions.push({
      x: e.pageX,
      y: e.pageY,
      timestamp: now
    });

    // Remove old positions that have exceeded fade duration
    while (trailPositions.length > 0 &&
           now - trailPositions[0].timestamp > fadeDuration) {
      trailPositions.shift();
    }

    // Also limit by max trail length
    if (trailPositions.length > maxTrailLength) {
      trailPositions.shift();
    }

    updateGradient();
  });

  function updateGradient() {
    if (trailPositions.length === 0) {
      pageContainer.style.background = '#ffffff';
      return;
    }

    // Create radial gradients at each trail position
    const gradients = trailPositions.map((pos, index) => {
      const age = Date.now() - pos.timestamp;
      const opacity = Math.max(0, 1 - (age / fadeDuration)); // Fade out over time
      const sizeMultiplier = 1 - (index / trailPositions.length) * 0.3; // Smaller towards the end
      const size = 400 * sizeMultiplier;

      // Using a more vibrant purple/lavender color
      return `radial-gradient(circle ${size}px at ${pos.x}px ${pos.y}px,
        rgba(200, 180, 255, ${opacity * 0.8}) 0%,
        rgba(230, 220, 255, ${opacity * 0.4}) 40%,
        transparent 70%)`;
    });

    // Combine all gradients with white background
    pageContainer.style.background = `${gradients.join(', ')}, #ffffff`;
  }

  // Clean up old positions periodically
  setInterval(() => {
    const now = Date.now();
    let changed = false;
    while (trailPositions.length > 0 &&
           now - trailPositions[0].timestamp > fadeDuration) {
      trailPositions.shift();
      changed = true;
    }
    if (changed || trailPositions.length > 0) {
      updateGradient();
    }
  }, 50);
});
