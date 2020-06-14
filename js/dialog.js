'use strict';

(function () {
  var DEFAULT_USER_DIALOG_X = '675px';
  var DEFAULT_USER_DIALOG_Y = '80px';

  var userDialog = document.querySelector('.setup');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var setupSimilar = document.querySelector('.setup-similar');

  var openSetup = document.querySelector('.setup-open');
  var closeSetup = userDialog.querySelector('.setup-close');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var onEcsPressForClose = function (evt) {
    if (evt.key === 'Escape' && document.activeElement !== setupUserName) {
      evt.preventDefault();
      closeSetupModal();
    }
  };

  var onEnterForClose = function (evt) {
    if (evt.key === 'Enter') {
      closeSetupModal();
    }
  };

  var openSetupModal = function () {
    userDialog.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');

    closeSetup.addEventListener('click', closeSetupModal);
    closeSetup.addEventListener('keydown', onEnterForClose);

    document.addEventListener('keydown', onEcsPressForClose);

    wizardCoat.addEventListener('click', setCoatColor);
    wizardEyes.addEventListener('click', setEyesColor);
    wizardFireball.addEventListener('click', setFireballColor);

    userDialog.style.left = DEFAULT_USER_DIALOG_X;
    userDialog.style.top = DEFAULT_USER_DIALOG_Y;
  };

  var closeSetupModal = function () {
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onEcsPressForClose);

    closeSetup.removeEventListener('click', closeSetupModal);
    closeSetup.removeEventListener('keydown', onEnterForClose);

    wizardCoat.removeEventListener('click', setCoatColor);
    wizardEyes.removeEventListener('click', setEyesColor);
    wizardFireball.removeEventListener('click', setFireballColor);
  };

  var setCoatColor = function () {
    var coatColorInput = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
    var coatColor = window.setupSimilarPerson.getRandomArrElement(window.setupSimilarPerson.COAT_COLORS);

    wizardCoat.style.fill = coatColor;
    coatColorInput.value = coatColor;
  };

  var setEyesColor = function () {
    var eyesColorInput = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
    var eyesColor = window.setupSimilarPerson.getRandomArrElement(window.setupSimilarPerson.EYES_COLORS);

    wizardEyes.style.fill = eyesColor;
    eyesColorInput.value = eyesColor;
  };

  var setFireballColor = function () {
    var fireballColorInput = wizardFireball.querySelector('input[name="fireball-color"]');
    var fireballColor = window.setupSimilarPerson.getRandomArrElement(window.setupSimilarPerson.FIREBALL_COLORS);

    wizardFireball.style.background = fireballColor;
    fireballColorInput.value = fireballColor;
  };

  openSetup.addEventListener('click', function () {
    openSetupModal();
  });

  openSetup.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openSetupModal();
    }
  });
})();
