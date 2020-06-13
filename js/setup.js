'use strict';

var QUANTITY_PERSONS = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setupSimilar = document.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();

var userDialog = document.querySelector('.setup');
var setupUserName = userDialog.querySelector('.setup-user-name');

var openSetup = document.querySelector('.setup-open');
var closeSetup = userDialog.querySelector('.setup-close');

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');


var getRandomArrElement = function (arr) {
  var randomElement = arr[Math.floor(Math.random() * arr.length)];

  return randomElement;
};

var generatePersons = function (quantity, names, surnames, coats, eyes) {
  var arr = [];

  for (var i = 0; i < quantity; i++) {
    var obj = {};
    obj.name = getRandomArrElement(names) + ' ' + getRandomArrElement(surnames);
    obj.coatColor = getRandomArrElement(coats);
    obj.eyesColor = getRandomArrElement(eyes);

    arr.push(obj);
  }

  return arr;
};

var generateWizards = function (data) {
  for (var i = 0; i < data.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = data[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = data[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = data[i].eyesColor;

    fragment.appendChild(wizardElement);
  }
};

var data = generatePersons(QUANTITY_PERSONS, NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

generateWizards(data);
similarListElement.appendChild(fragment);


var onEcsPressForClose = function (evt) {
  if (evt.key === 'Escape' && document.activeElement !== setupUserName) {
    evt.preventDefault();
    closeSetupModal();
  }
};

var openSetupModal = function () {
  userDialog.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');

  document.addEventListener('keydown', onEcsPressForClose);

  wizardCoat.addEventListener('click', setCoatColor);
  wizardEyes.addEventListener('click', setEyesColor);
  wizardFireball.addEventListener('click', setFireballColor);
};

var closeSetupModal = function () {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onEcsPressForClose);

  wizardCoat.removeEventListener('click', setCoatColor);
  wizardEyes.removeEventListener('click', setEyesColor);
  wizardFireball.removeEventListener('click', setFireballColor);
};

var setCoatColor = function () {
  var coatColorInput = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
  var coatColor = getRandomArrElement(COAT_COLORS);

  wizardCoat.style.fill = coatColor;
  coatColorInput.value = coatColor;
};

var setEyesColor = function () {
  var eyesColorInput = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
  var eyesColor = getRandomArrElement(EYES_COLORS);

  wizardEyes.style.fill = eyesColor;
  eyesColorInput.value = eyesColor;
};

var setFireballColor = function () {
  var fireballColorInput = wizardFireball.querySelector('input[name="fireball-color"]');
  var fireballColor = getRandomArrElement(FIREBALL_COLORS);

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

closeSetup.addEventListener('click', function () {
  closeSetupModal();
});

closeSetup.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeSetupModal();
  }
});
