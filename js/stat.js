'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var firstPlayersNameGapX = CLOUD_X + 2 * GAP;
var firstPlayersNameGapY = CLOUD_HEIGHT - GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);

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

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var currentBarHeight = (times[i] * BAR_HEIGHT) / maxTime;
    var currentColorSaturation = 26;
    if (i > 0) {
      currentColorSaturation = Math.floor(Math.random() * Math.floor(100));
    }

    ctx.fillText(players[i], firstPlayersNameGapX + (BAR_WIDTH + BAR_GAP) * i, firstPlayersNameGapY);
    ctx.fillStyle = 'hsl(229, ' + currentColorSaturation + '%, 26%)';
    ctx.fillRect(firstPlayersNameGapX + (BAR_WIDTH + BAR_GAP) * i, firstPlayersNameGapY - currentBarHeight - FONT_GAP / 2, BAR_WIDTH, currentBarHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), firstPlayersNameGapX + (BAR_WIDTH + BAR_GAP) * i, firstPlayersNameGapY - currentBarHeight - 1.5 * FONT_GAP);
  }

};
