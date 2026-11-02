document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // Пошаговая логика оплаты (Card Number → Name → Expiry → CVV → Success)
  // =========================================================================
  const steps = document.querySelectorAll('.step-content');
  const nextButtons = document.querySelectorAll('.btn-modal-next');
  const resetButton = document.querySelector('.btn-modal-reset');
  let currentStepIndex = 0;

  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentStepIndex < steps.length - 1) {
        steps[currentStepIndex].classList.remove('active');
        currentStepIndex++;
        steps[currentStepIndex].classList.add('active');
      }
    });
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      steps[currentStepIndex].classList.remove('active');
      currentStepIndex = 0;
      steps[currentStepIndex].classList.add('active');
    });
  }

  // =========================================================================
  // Форматирование даты карты (MM/YY)
  // =========================================================================
  const expiryInput = document.getElementById('input-card-expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
      } else {
        e.target.value = value;
      }
    });
  }

  // =========================================================================
  // Форматирование номера карты (0000 0000 0000 0000)
  // =========================================================================
  const cardInput = document.getElementById('input-card-number');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formatted = value.match(/.{1,4}/g);
      if (formatted) {
        e.target.value = formatted.join(' ');
      } else {
        e.target.value = '';
      }
    });
  }

  // =========================================================================
  // Navbar — затемнение при скролле
  // =========================================================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(14, 14, 14, 0.98)';
    } else {
      navbar.style.background = 'rgba(20, 20, 20, 0.92)';
    }
  });

  // =========================================================================
  // 3D Tilt эффект на карточках галереи
  // =========================================================================
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) scale(1.01) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =========================================================================
  // 3D Tilt на карточках товаров
  // =========================================================================
  const apparelCards = document.querySelectorAll('.apparel-card');
  apparelCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) scale(1.02) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});