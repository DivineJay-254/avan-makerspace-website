document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.hero-image');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.remove('active');
      if (i === index) {
        img.classList.add('active');
      }
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // Show first image on load
  showImage(0);

  // Change image every 5 seconds
  setInterval(nextImage, 5000);
});
