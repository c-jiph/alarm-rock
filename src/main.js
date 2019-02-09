// @flow

const {app, BrowserWindow} = require('electron');

let mainWindow = null;

// Allows audio to play from startup.
// https://github.com/electron/electron/issues/13525
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.on('ready', () => {
  mainWindow = new BrowserWindow({width:1920, height:1080});
  mainWindow.loadFile('src/index.html');
  //mainWindow.setFullScreen(true);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
