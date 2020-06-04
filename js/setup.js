'use strict';

var QUANTITY_PERSONS = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');

var setupSimilar = document.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();


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
userDialog.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
