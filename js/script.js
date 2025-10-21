// Simple interactivity: fade-in animation when scrolling
window.addEventListener('scroll', function () {
  const features = document.querySelectorAll('.feature');
  const triggerBottom = window.innerHeight * 0.8;

  features.forEach(feature => {
    const featureTop = feature.getBoundingClientRect().top;
    if (featureTop < triggerBottom) {
      feature.style.opacity = '1';
      feature.style.transform = 'translateY(0)';
    }
  });
});

// Initialize animation style
document.querySelectorAll('.feature').forEach(feature => {
  feature.style.opacity = '0';
  feature.style.transform = 'translateY(50px)';
  feature.style.transition = 'all 0.6s ease-out';
});
