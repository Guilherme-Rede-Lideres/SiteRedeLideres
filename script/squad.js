const carousel = document.querySelector('.carousel');
document.querySelector('.next').onclick = () => {
  carousel.scrollBy({ left: 340, behavior: 'smooth' });
};
document.querySelector('.prev').onclick = () => {
  carousel.scrollBy({ left: -340, behavior: 'smooth' });
};
