// @flow

const Color = require('color');
const exec = require('child_process').exec;
const sprintf = require('sprintf-js').sprintf;

const $ = require('jquery');

// let alarm_wav = new Audio('../res/alarm.wav');
// alarm_wav.play();

let time_str = "";

const schedule = [
  {hour: 0, color: Color('#800000'), screen_brightness: 1},
  {hour: 5, color: Color('#800000'), screen_brightness: 1},
  {hour: 10, color: Color('palegreen'), screen_brightness: 128},
  {hour: 21, color: Color('palegreen'), screen_brightness: 128},
  {hour: 22, color: Color('orange'), screen_brightness: 128},
  {hour: 24, color: Color('#800000'), screen_brightness: 1},
];

function colorForNow(d: Date): {color: Color, screen_brightness: number} {
  const hour_now = d.getHours();
  for (var i = 1; i < schedule.length; i++) {    
    if (hour_now < schedule[i].hour) {
      const ratio = ((hour_now - schedule[i - 1].hour) * 60 + d.getMinutes()) /
        ((schedule[i].hour - schedule[i - 1].hour) * 60 + 60);
      const screen_brightness = schedule[i].screen_brightness > schedule[i - 1].screen_brightness
        ? (ratio * (schedule[i].screen_brightness - schedule[i - 1].screen_brightness) + schedule[i - 1].screen_brightness)
        : ((1 - ratio) * (schedule[i - 1].screen_brightness - schedule[i].screen_brightness) + schedule[i].screen_brightness);
      return {
        color: schedule[i - 1].color.mix(schedule[i].color, ratio),
        screen_brightness: Math.floor(screen_brightness),
      };
    }
  }
  throw 'unreachable';
}

function renderTime() {
  const d = new Date();
  const new_time_str = sprintf('<span id="timetext" class="timetext_class">%d<span class="dots_class">:</span>%02d</span>',  d.getHours(), d.getMinutes());
  if (new_time_str != time_str) {
    $('#content').html(new_time_str);
    const {color, screen_brightness} = colorForNow(d);
    const cmd = sprintf('echo %d | sudo tee /sys/devices/platform/gizmo-cpld/gizmo-backlight/backlight/gizmo_backlight/brightness', 10);
    exec(cmd);
    $('#timetext').css({color: color.hsl().string()});
    time_str = new_time_str;
  }
}

setInterval(renderTime, 1000);
renderTime();
