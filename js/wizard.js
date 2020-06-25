'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {},
  };

  var getRandomArrElement = function (arr) {
    var randomElement = arr[Math.floor(Math.random() * arr.length)];

    return randomElement;
  };

  var setCoatColor = function () {
    var coatColorInput = document.querySelector('.setup-wizard-appearance input[name="coat-color"]');
    var newCoatColor = getRandomArrElement(COAT_COLORS);

    wizardCoat.style.fill = newCoatColor;
    coatColorInput.value = newCoatColor;

    wizard.onCoatChange(newCoatColor);
  };

  var setEyesColor = function () {
    var eyesColorInput = document.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
    var newEyesColor = getRandomArrElement(EYES_COLORS);

    wizardEyes.style.fill = newEyesColor;
    eyesColorInput.value = newEyesColor;

    wizard.onEyesChange(newEyesColor);
  };

  var setFireballColor = function () {
    var fireballColorInput = wizardFireball.querySelector('input[name="fireball-color"]');
    var newFireballColor = getRandomArrElement(FIREBALL_COLORS);

    wizardFireball.style.background = newFireballColor;
    fireballColorInput.value = newFireballColor;
  };

  window.wizard = {
    setCoatColor: setCoatColor,
    setEyesColor: setEyesColor,
    setFireballColor: setFireballColor,
    getRandomArrElement: getRandomArrElement,
    wizard: wizard,
  };

})();
