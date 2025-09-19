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
    subtitle: "разработаем подробное руководство по использованию<br>фирменного стиля для всех каналов коммуникации"
  },
  {
    title: "сайт",
    subtitle: "спроектируем современный и функциональный веб-ресурс,<br>который эффективно решает ваши бизнес-задачи"
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

// Функция для обновления градиента фона
function updateGradient(index) {
  const container = document.querySelector('.page-container');
  if (container) {
    // Получаем цвета из SCSS переменных
    const gradientColors = [
      'rgba(255, 182, 193, 0.3)', // $gradient-design
      'rgba(173, 216, 230, 0.3)', // $gradient-identity
      'rgba(255, 218, 185, 0.3)', // $gradient-brandbook
      'rgba(221, 160, 221, 0.3)'  // $gradient-website
    ];

    const color = gradientColors[index];
    container.style.background = `linear-gradient(to bottom,
      #ffffff 0%,
      #ffffff 50%,
      ${color} 100%)`;
  }
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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем обработчики событий
  document.addEventListener('wheel', handleScroll, { passive: false });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Добавляем обработчики для индикаторов
  const indicators = document.querySelectorAll('.scroll-indicator');
  indicators.forEach(indicator => {
    indicator.addEventListener('click', handleIndicatorClick);
  });

  // Предотвращаем стандартный скролл страницы
  document.body.style.overflow = 'hidden';

  // Устанавливаем начальный контент и градиент
  updateContent(0);
});