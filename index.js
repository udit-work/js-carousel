const carouselContainer = document.querySelector('.carousel-container');
const defaultClass = 'slide';

// Array of image URLs
const imageUrls = [
    'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png',
    'http://placekitten.com/g/1600/900'
];

const slides = imageUrls.map(url => {
  const slide = document.createElement('div');
  slide.classList.add(defaultClass);

  const image = document.createElement('img');
  image.src = url;
  image.alt = 'Image';
  slide.appendChild(image);

  carouselContainer.appendChild(slide);

  return slide;
});

let currentIndex = 0;
let timer;
let isAnimating = false;

/**
 * Shows the specified slide with the given direction.
 * @param {number} index - The index of the slide to show.
 * @param {string} direction - The direction of the slide animation ('next' or 'previous').
 */
function showSlide(index, direction) {
  // Ignore if an animation is already in progress or the index is the same as the current index
  if (isAnimating || index === currentIndex) {
    return;
  }

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[currentIndex == slides.length - 1 ? 0 : currentIndex + 1];
  const previousSlide = slides[currentIndex == 0 ? slides.length - 1 : currentIndex - 1];

  previousSlide.className = defaultClass;
  nextSlide.className = defaultClass;
  currentSlide.className = defaultClass;
  currentSlide.classList.add(direction);
  if (direction == 'next') {
      nextSlide.classList.add('active');
  } else {
    previousSlide.classList.add('active');
  }
  const transitionEndHandler = () => {
      currentSlide.classList.remove('active', direction);
      nextSlide.classList.remove('next', 'previous', direction);
      previousSlide.classList.remove('next', 'previous', direction);
      isAnimating = false;
      currentIndex = index;
    currentSlide.removeEventListener('transitionend', transitionEndHandler);
  };

  currentSlide.addEventListener('transitionend', transitionEndHandler);
}

/**
 * Shows the next slide in the carousel.
 */
function nextSlide() {
  const nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex, 'next');
  resetTimer();
}

/**
 * Shows the previous slide in the carousel.
 */
function previousSlide() {
  const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(previousIndex, 'previous');
  resetTimer();
}

/**
 * Resets the timer for automatic sliding.
 */
function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    nextSlide();
  }, 3000); // Delay of 3 seconds
}

/**
 * @description util function for registering click
 * events on the element.
 * @param {HTMLElement} element 
 * @param {Function} callback 
 */
function registerClickEvent(element, callback) {
    element.addEventListener('click', callback);
}

slides[currentIndex].classList.add('active');

const previousButton = document.querySelector('.previous-button');
registerClickEvent(previousButton, previousSlide);
const nextButton = document.querySelector('.next-button');
registerClickEvent(nextButton, nextSlide);

// Start the timer for automatic sliding
resetTimer();