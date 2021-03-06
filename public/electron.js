const electron = require('electron');
const isDev = require('electron-is-dev');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 50,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'toggl.png'),
    frame: false,
    transparent: true
    // resizable: false
  });

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools({     mode: 'detach'  });
  mainWindow.setSkipTaskbar(true);
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  mainWindow.setAlwaysOnTop(true);

  electron.ipcMain.on('resize-window', function (e, x, y) {

    mainWindow.setSize(x, y);
  });

  // electron.powerMonitor.on('suspend', () => console.log('suspend'));
  // electron.powerMonitor.on('resume', () => console.log('resume'));
  // electron.powerMonitor.on('lock-screen', () => console.log('lock-screen'));
  // electron.powerMonitor.on('unlock-screen', () => console.log('unlock-screen'));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => setTimeout(createWindow, 300));

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});