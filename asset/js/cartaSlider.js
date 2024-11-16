// script.js

let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slider = document.getElementById('slider');

const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

// Función para cambiar al siguiente slide
function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSliderPosition();
}

// Función para cambiar al slide anterior
function showPrevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
}

// Función para actualizar la posición y el tamaño de las imágenes
function updateSliderPosition() {
    const offset = -currentIndex * 100; // Desplazamiento en porcentaje
    slider.style.transform = `translateX(${offset}%)`;

    // Asegurarnos de que la imagen central se vea más grande
    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.classList.add('center');
        } else {
            slide.classList.remove('center');
        }
    });
}

// Usando addEventListener para los botones
nextButton.addEventListener('click', showNextSlide);
prevButton.addEventListener('click', showPrevSlide);

// Cambiar de imagen cada 3 segundos automáticamente
setInterval(showNextSlide, 3000);
