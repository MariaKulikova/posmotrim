// Данные для разных секций
const sections = [
  {
    title: "дизайн",
    subtitle: "проверим консистентность и актуальность, поможем поправить<br>мелкие детали, и укажем если «что-то не то»"
  },
  {
    title: "айдентику",
    subtitle: "создадим уникальный стиль бренда, который будет отражать<br>ваши ценности и выделяться среди конкурентов"
  },
  {
    title: "брендбук",
    subtitle: "чтобы все носители фирменного стиля соответсвовали брендбуку и формировали единый визуальный язык"
  },
  {
    title: "UX копирайтинг",
    subtitle: "чтоб ваш сервис говорил с клиентом  на одном языке во всех точках касания"
  },
  {
    title: "юзабилити",
    subtitle: "проверим контрастность, наличие темных паттернов, использование компонентов и структуру"
  },
  {
    title: "сайт",
    subtitle: "чтоб ваш сайт соответствовал актуальным гайдам, не было раздражающих темных паттернов, элементы интерфейса использовались корректно"
  }
];

let currentSectionIndex = 0;
let isScrolling = false;

// Функция для обновления контента
function updateContent(index) {
  const titleElement = document.querySelector('.hero__changeable-text');
  const subtitleElement = document.querySelector('.hero__subtitle');

  if (titleElement && subtitleElement) {
    // Добавляем классы для анимации исчезновения
    titleElement.classList.add('distort-out');
    subtitleElement.classList.add('slide-out');

    setTimeout(() => {
      // Обновляем содержимое
      titleElement.textContent = sections[index].title;
      subtitleElement.innerHTML = sections[index].subtitle;

      // Убираем классы исчезновения и добавляем появления
      titleElement.classList.remove('distort-out');
      titleElement.classList.add('distort-in');
      subtitleElement.classList.remove('slide-out');
      subtitleElement.classList.add('slide-in');

      // Убираем классы появления после анимации
      setTimeout(() => {
        titleElement.classList.remove('distort-in');
        subtitleElement.classList.remove('slide-in');
      }, 300);
    }, 150);
  }

  // Обновляем индикаторы
  updateIndicators(index);

  // Обновляем градиент фона
  updateGradient(index);
}

// Переменные для отслеживания позиции мыши
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentColorIndex = 0;

// Функция для обновления градиента фона
function updateGradient(index) {
  currentColorIndex = index;
  updateGradientPosition(mouseX, mouseY);
}

// Переменные для плавного движения
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let smoothX = targetX;
let smoothY = targetY;
let animationFrame = null;

// Функция для обновления градиента в зависимости от позиции курсора
function updateGradientPosition(x, y) {
  const container = document.querySelector('.page-container');
  if (container) {
    // Получаем цвета из SCSS переменных
    const gradientColors = [
      'rgba(248, 132, 205, 0.5)', // $gradient-design - Розовый
      'rgba(148, 139, 241, 0.5)', // $gradient-identity - Фиолетовый
      'rgba(232, 241, 139, 0.5)', // $gradient-brandbook - Желто-зеленый
      'rgba(123, 226, 246, 0.5)'  // $gradient-website - Голубой
    ];

    const currentColor = gradientColors[currentColorIndex];

    // Нормализованные координаты курсора
    const normalizedX = x / window.innerWidth;
    const normalizedY = y / window.innerHeight;

    // Расстояние от центра нижней части экрана
    const centerX = 0.5;
    const bottomY = 1;
    const distanceFromCenter = Math.sqrt(
      Math.pow(normalizedX - centerX, 2) +
      Math.pow(normalizedY - bottomY, 2)
    );

    // Интенсивность эффекта зависит от близости к низу экрана
    const effectIntensity = Math.max(0, 1 - normalizedY);

    // Создаем простой и чистый градиент
    const gradientPosition = 50 + (normalizedX - 0.5) * effectIntensity * 30;
    const gradientHeight = 20 - effectIntensity * 10;

    // Основной градиент с одним плавным переходом
    container.style.background = `linear-gradient(180deg,
      #ffffff 0%,
      #ffffff ${gradientHeight}%,
      transparent ${gradientHeight + 5}%,
      transparent ${gradientHeight + 35}%,
      ${currentColor} ${gradientHeight + 70}%,
      ${currentColor} 100%)`;

    // Убираем все фильтры
    container.style.filter = 'none';

    // Плавный переход только для градиента
    container.style.transition = 'background 0.3s ease-out';
  }
}

// Функция для плавного следования за курсором
function smoothFollow() {
  // Интерполяция для плавного движения
  smoothX += (targetX - smoothX) * 0.1;
  smoothY += (targetY - smoothY) * 0.1;

  updateGradientPosition(smoothX, smoothY);

  animationFrame = requestAnimationFrame(smoothFollow);
}

// Функция для обновления индикаторов
function updateIndicators(index) {
  const indicators = document.querySelectorAll('.scroll-indicator');
  indicators.forEach((indicator, i) => {
    if (i === index) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Переменная для накопления дельты скролла
let accumulatedDelta = 0;
let scrollTimeout = null;

// Обработчик скролла
function handleScroll(event) {
  // Предотвращаем стандартное поведение скролла
  event.preventDefault();
  event.stopPropagation();

  // Если анимация еще идет, игнорируем новые события
  if (isScrolling) {
    return false;
  }

  // Накапливаем дельту скролла
  const delta = event.deltaY || -event.wheelDelta || event.detail;
  accumulatedDelta += delta;

  // Очищаем предыдущий таймаут
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // Устанавливаем новый таймаут для обработки накопленной дельты
  scrollTimeout = setTimeout(() => {
    // Проверяем, достаточно ли накоплено для перехода
    if (Math.abs(accumulatedDelta) > 30) { // Порог чувствительности
      // Блокируем новые события
      isScrolling = true;

      // Определяем направление на основе накопленной дельты
      if (accumulatedDelta > 0) {
        // Скролл вниз - переход к следующему блоку
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
        } else {
          // Если достигли последнего блока, переходим к первому
          currentSectionIndex = 0;
        }
        updateContent(currentSectionIndex);
      } else {
        // Скролл вверх - переход к предыдущему блоку
        if (currentSectionIndex > 0) {
          currentSectionIndex--;
        } else {
          // Если на первом блоке, переходим к последнему
          currentSectionIndex = sections.length - 1;
        }
        updateContent(currentSectionIndex);
      }

      // Разблокируем через время анимации
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }

    // Сбрасываем накопленную дельту
    accumulatedDelta = 0;
    scrollTimeout = null;
  }, 50); // Небольшая задержка для накопления событий

  return false;
}

// Обработчик касаний для мобильных устройств
let touchStartY = 0;
let touchEndY = 0;

function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
  if (isScrolling) return;

  touchEndY = event.changedTouches[0].clientY;
  const deltaY = touchStartY - touchEndY;

  if (Math.abs(deltaY) > 50) { // Минимальное расстояние для срабатывания
    isScrolling = true;

    if (deltaY > 0) {
      // Свайп вверх (скролл вниз) - переход к следующему блоку
      if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
      } else {
        // Если достигли последнего блока, переходим к первому
        currentSectionIndex = 0;
      }
      updateContent(currentSectionIndex);
    } else {
      // Свайп вниз (скролл вверх) - переход к предыдущему блоку
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
      } else {
        // Если на первом блоке, переходим к последнему
        currentSectionIndex = sections.length - 1;
      }
      updateContent(currentSectionIndex);
    }

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
}

// Обработчик клика по индикаторам
function handleIndicatorClick(event) {
  if (isScrolling) return;

  const index = parseInt(event.target.dataset.index);
  if (!isNaN(index) && index >= 0 && index < sections.length) {
    isScrolling = true;
    currentSectionIndex = index;
    updateContent(currentSectionIndex);

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
}

// Обработчик движения мыши
function handleMouseMove(event) {
  targetX = event.clientX;
  targetY = event.clientY;
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем обработчики событий
  document.addEventListener('wheel', handleScroll, { passive: false });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('mousemove', handleMouseMove);

  // Добавляем обработчики для индикаторов
  const indicators = document.querySelectorAll('.scroll-indicator');
  indicators.forEach(indicator => {
    indicator.addEventListener('click', handleIndicatorClick);
  });

  // Предотвращаем стандартный скролл страницы
  document.body.style.overflow = 'hidden';

  // Устанавливаем начальный контент и градиент
  updateContent(0);

  // Запускаем плавную анимацию следования
  smoothFollow();
});