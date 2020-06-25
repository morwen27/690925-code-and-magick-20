'use strict';

(function () {
  var QUANTITY_WIZARDS = 4;

  var userDialog = document.querySelector('.setup');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var wizards = [];

  var render = function (data) {

    similarListElement.innerHTML = '';

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_WIZARDS; i++) {
      data[i] = window.wizard.getRandomArrElement(data);
      fragment.appendChild(generateWizards(data[i]));
    }
    similarListElement.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var nameComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var sortedWizard = wizards
      .slice()
      .sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = nameComparator(left.name, right.name);
        }
        return rankDiff;
      });

    render(sortedWizard);
  };

  window.wizard.wizard.onEyesChange = function (color) {
    eyesColor = color;
    // window.debounce.debounce(updateWizards);
    updateWizards();
  };

  window.wizard.wizard.onCoatChange = function (color) {
    coatColor = color;
    // window.debounce.debounce(updateWizards);
    updateWizards();
  };

  var generateWizards = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var loadSuccessHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: blueviolet; color: black';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);

})();
