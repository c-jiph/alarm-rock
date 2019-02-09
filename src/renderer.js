// @flow

// const $ = require('jquery');
// var jQuery = $;
// require('bigtext/dist/bigtext.js');

// let alarm_wav = new Audio('../res/alarm.wav');
// alarm_wav.play();

function renderTime() {
  const d = new Date();
  $('#content').html('<span>' + d.getHours() + ':' + d.getMinutes() + '</span>');
  $('#content').bigtext();
}

setInterval(renderTime, 1000);
renderTime();
