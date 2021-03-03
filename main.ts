const { app, BrowserWindow, ipcMain } = require('electron');
const Game = require("./src/class/TS/Game");
const game = new Game.Game();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    },
    frame: true
  })

  win.loadFile('test.html');
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

app.on('browser-window-created', (event, windows) => {
  game.display.frame = windows;
  game.start();
})

ipcMain.on('pause', () => {
  game.pauseGame();
});

//Key listener
ipcMain.on('KeyDown', (event,arg) => {
    game.player.keyDown(arg);
});

ipcMain.on('KeyUp', (event,arg) => {
    game.player.keyUp(arg);
});