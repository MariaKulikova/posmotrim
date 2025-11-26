// Данные для разных секций
const sections = [
  {
    title: "дизайн",
    subtitle: "проверим консистентность и актуальность, поможем поправить<br>мелкие детали, и укажем если «что-то не то»"
  },
  {
    title: "айдентику",
    subtitle: "чтоб айдентика отражала характер продукта, была актуальна и<br>соответствовала современным трендам"
  },
  {
    title: "брендбук",
    subtitle: "чтобы все носители фирменного стиля соответсвовали брендбуку и формировали единый визуальный язык"
  },
  {
    title: "тексты",
    subtitle: "чтоб ваш сервис говорил с клиентом на одном языке во всех точках касания"
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

// Функция для обновления градиента фона (теперь не меняет цвет)
function updateGradient(_index) {
  // Функция оставлена для совместимости, но больше не меняет цвет
}

// Массив для хранения следа курсора
const trailPositions = [];
const maxTrailLength = 60;
const fadeDuration = 2000;

// Массив для хранения эффектов клика
const clickEffects = [];

// Функция для обновления градиента в зависимости от позиции курсора
function updateGradientPosition() {
  const container = document.querySelector('.page-container');
  if (!container) return;

  const now = Date.now();
  const allGradients = [];

  // Создаем радиальные градиенты для каждой точки следа
  if (trailPositions.length > 0) {
    const trailGradients = trailPositions.map((pos) => {
      const age = now - pos.timestamp;
      // Плавное затухание с использованием ease-out функции
      const fadeProgress = age / fadeDuration;
      const opacity = Math.max(0, 1 - Math.pow(fadeProgress, 0.5));
      const size = 180;

      // Создаем плавные пятна для следа с большим количеством градаций
      return `radial-gradient(circle ${size}px at ${pos.x}px ${pos.y}px,
        rgba(60, 213, 0, ${opacity * 0.4}) 0%,
        rgba(60, 213, 0, ${opacity * 0.35}) 15%,
        rgba(60, 213, 0, ${opacity * 0.3}) 30%,
        rgba(180, 234, 100, ${opacity * 0.25}) 45%,
        rgba(255, 255, 255, ${opacity * 0.2}) 60%,
        rgba(255, 255, 255, ${opacity * 0.12}) 75%,
        rgba(255, 255, 255, ${opacity * 0.06}) 90%,
        transparent 100%)`;
    });
    allGradients.push(...trailGradients);
  }

  // Создаем эффекты клика (булька)
  if (clickEffects.length > 0) {
    const clickGradients = clickEffects.map((click) => {
      const age = now - click.timestamp;
      const clickDuration = 600; // Длительность эффекта клика
      const progress = age / clickDuration;

      if (progress >= 1) return null; // Эффект завершен

      // Размер увеличивается быстро, затем исчезает
      const size = 50 + (progress * 250);
      const opacity = Math.max(0, 1 - Math.pow(progress, 0.8));

      // Создаем эффект "булька"
      return `radial-gradient(circle ${size}px at ${click.x}px ${click.y}px,
        rgba(60, 213, 0, ${opacity * 0.7}) 0%,
        rgba(60, 213, 0, ${opacity * 0.5}) 20%,
        rgba(255, 255, 255, ${opacity * 0.4}) 50%,
        transparent 100%)`;
    }).filter(g => g !== null);

    allGradients.push(...clickGradients);
  }

  // Применяем все градиенты с белым фоном
  container.style.background = allGradients.length > 0
    ? `${allGradients.join(', ')}, #ffffff`
    : '#ffffff';
}

// Функция для плавного следования за курсором
function smoothFollow() {
  const now = Date.now();

  // Удаляем старые точки следа
  while (trailPositions.length > 0 && now - trailPositions[0].timestamp > fadeDuration) {
    trailPositions.shift();
  }

  // Удаляем старые эффекты клика
  const clickDuration = 600;
  while (clickEffects.length > 0 && now - clickEffects[0].timestamp > clickDuration) {
    clickEffects.shift();
  }

  // Обновляем градиент
  updateGradientPosition();

  requestAnimationFrame(smoothFollow);
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
  const now = Date.now();

  // Добавляем новую точку в след
  trailPositions.push({
    x: event.pageX,
    y: event.pageY,
    timestamp: now
  });

  // Ограничиваем длину следа
  if (trailPositions.length > maxTrailLength) {
    trailPositions.shift();
  }
}

// Обработчик клика мыши
function handleClick(event) {
  const now = Date.now();

  // Добавляем эффект клика
  clickEffects.push({
    x: event.pageX,
    y: event.pageY,
    timestamp: now
  });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем обработчики событий
  document.addEventListener('wheel', handleScroll, { passive: false });
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('click', handleClick);

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