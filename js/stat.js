'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;

var FONT_GAP = 20;
var FONT = '16px PT Mono';
var FONT_BASE_COLOR = '#000';
var FONT_BASELINE = 'hanging';

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, color, font, baselineSetting, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baselineSetting;
  ctx.fillText(text, x, y);
};

var drawColumn = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  if (arr.length !== 0) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

var getColor = function (h, l) {
  var saturation = Math.floor(Math.random() * 100);
  var color = 'hsl(' + h + ', ' + saturation + '%, ' + l + '%)';

  return color;
};


window.renderStatistics = function (ctx, players, times) {
  var titleX = CLOUD_X + GAP;
  var titleY = CLOUD_Y + GAP;
  var firstPlayersNameGapX = CLOUD_X + 2 * GAP;
  var firstPlayersNameGapY = CLOUD_HEIGHT - GAP;
  var maxTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, FONT_BASE_COLOR, FONT, FONT_BASELINE, 'Ура, вы победили!', titleX, titleY);
  renderText(ctx, FONT_BASE_COLOR, FONT, FONT_BASELINE, 'Список результатов:', titleX, titleY + FONT_GAP);  

  for (var i = 0; i < players.length; i++) {

    var currentBarHeight = (times[i] * BAR_HEIGHT) / maxTime;
    var columnPositionX = firstPlayersNameGapX + (BAR_WIDTH + BAR_GAP) * i;
    var columnPositionY = firstPlayersNameGapY - currentBarHeight;
    var currentColor;

    if (players[i] !== 'Вы') {
      currentColor = getColor(229, 26);
    } else {
      currentColor = 'rgba(255, 0, 0, 1)';
    }

    renderText(ctx, FONT_BASE_COLOR, FONT, FONT_BASELINE, players[i], columnPositionX, firstPlayersNameGapY);

    drawColumn(ctx, currentColor, columnPositionX, (columnPositionY - FONT_GAP / 2), BAR_WIDTH, currentBarHeight);

    renderText(ctx, FONT_BASE_COLOR, FONT, FONT_BASELINE, Math.round(times[i]), columnPositionX, (columnPositionY - 1.5 * FONT_GAP));
  }

};
