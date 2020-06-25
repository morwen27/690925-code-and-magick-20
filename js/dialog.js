'use strict';

(function () {
  var DEFAULT_USER_DIALOG_X = '675px';
  var DEFAULT_USER_DIALOG_Y = '80px';

  var userDialog = document.querySelector('.setup');
  var setupUserName = userDialog.querySelector('.setup-user-name');
  var setupSimilar = document.querySelector('.setup-similar');
  var form = document.querySelector('.setup-wizard-form');

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

    wizardCoat.addEventListener('click', window.wizard.setCoatColor);
    wizardEyes.addEventListener('click', window.wizard.setEyesColor);
    wizardFireball.addEventListener('click', window.wizard.setFireballColor);

    userDialog.style.left = DEFAULT_USER_DIALOG_X;
    userDialog.style.top = DEFAULT_USER_DIALOG_Y;
  };

  var closeSetupModal = function () {
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onEcsPressForClose);

    closeSetup.removeEventListener('click', closeSetupModal);
    closeSetup.removeEventListener('keydown', onEnterForClose);

    wizardCoat.removeEventListener('click', window.wizard.setCoatColor);
    wizardEyes.removeEventListener('click', window.wizard.setEyesColor);
    wizardFireball.removeEventListener('click', window.wizard.setFireballColor);
  };

  var submitWizardHandler = function (evt) {
    window.backend.save(new FormData(form), function () {
      userDialog.classList.add('hidden');
    }, function () {});

    evt.preventDefault();
  };

  openSetup.addEventListener('click', function () {
    openSetupModal();
  });

  openSetup.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openSetupModal();
    }
  });

  form.addEventListener('submit', submitWizardHandler);
})();
