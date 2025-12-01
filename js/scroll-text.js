// Данные для разных секций
const sections = [
  {
    title: "дизайн",
    subtitle: "расскажем, как улучшить визуальную коммуникацию и пользовательский опыт минимальными усилиями"
  },
  {
    title: "фирменный стиль и брендбук",
    subtitle: "Оценим системность и масштабируемость стиля. Проверим, насколько текущие правила использования логотипа, цветов и шрифтов соблюдаются на практике и отражают характер продукта."
  },
  {
    title: "визуальный язык",
    subtitle: "Проанализируем носители на единство стиля и то, как дизайн и тон коммуникации помогает доносить сообщение до аудитории."
  },
  {
    title: "интерфейсы",
    subtitle: "Проверим логику работы, визуальную иерархию, читаемость текстов, контрастность и адаптивность"
  }
];

let currentSectionIndex = 0;
let isTyping = false;

// Функция для typewriter эффекта
function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// Функция для удаления текста (backspace эффект)
function deleteText(element, speed, callback) {
  const text = element.textContent;
  let i = text.length;

  function deleteChar() {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
      setTimeout(deleteChar, speed);
    } else if (callback) {
      callback();
    }
  }

  deleteChar();
}

// Функция для обновления контента с typewriter эффектом
function updateContent(index) {
  const titleElement = document.querySelector('.hero__changeable-text');
  const subtitleElement = document.querySelector('.hero__subtitle');

  if (titleElement && subtitleElement && !isTyping) {
    isTyping = true;

    // Печатаем заголовок
    typeWriter(titleElement, sections[index].title, 80, () => {
      // Печатаем подзаголовок
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sections[index].subtitle;
      const subtitleText = tempDiv.textContent;

      typeWriter(subtitleElement, subtitleText, 50, () => {
        // Пауза перед удалением
        setTimeout(() => {
          deleteText(subtitleElement, 10, () => {
            deleteText(titleElement, 15, () => {
              isTyping = false;
            });
          });
        }, 800);
      });
    });
  }
}

// Функция для автоматической смены секций
function startAutoRotation() {
  function nextSection() {
    currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    updateContent(currentSectionIndex);
  }

  setTimeout(() => {
    nextSection();
    setInterval(nextSection, 12000);
  }, 12000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  updateContent(0);
  startAutoRotation();
});
