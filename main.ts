const { app, BrowserWindow, ipcMain } = require('electron');
const Game = require("./src/class/TS/GameAI");
const GameData = require("./src/class/TS/Game").GameData;
const Piece = require("./src/class/TS/Pieces");
const Matrix = require("./src/class/TS/Matrix");
const Display = require("./src/class/TS/Display");
const Player = require("./src/class/TS/Player");
const RandomTable = require("./src/class/TS/randomTable");
console.log(Game);
const rng = new RandomTable.RandomTable();
const game = new Game.GameAI(Date.now, rng, {p_dic:0.5, p_hole:-10, p_maxHeight:0.2});



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
  game.display.frame = null;
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