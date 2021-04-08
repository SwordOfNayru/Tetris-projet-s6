import { BrowserWindow } from "electron";

const { app,  ipcMain } = require('electron');
const Game = require("./src/class/TS/Game");
const GameAI = require("./src/class/TS/GameAI");
const GameData = require("./src/class/TS/Game").GameData;
const Piece = require("./src/class/TS/Pieces");
const Matrix = require("./src/class/TS/Matrix");
const Display = require("./src/class/TS/Display");
const Player = require("./src/class/TS/Player");
const RandomTable = require("./src/class/TS/randomTable");
var rng = new RandomTable.RandomTable();
var game = new Game.Game(Date.now, rng);
var fenetre:BrowserWindow



function createWindow () {
  const win = new BrowserWindow({
    icon: "image/Logo.ico",
    title: "Tetris",
    fullscreen:false,
    webPreferences: {
      nodeIntegration: true
    },
    frame:true,
    autoHideMenuBar: true
  })

  win.loadFile('start.html');
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  game.display.frame = null;
  game = null;
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
  fenetre = windows;
  windows.maximize();
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

ipcMain.on('start-humain', (event, arg) => {
  rng.renew();
  game.defeat();
  game = new Game.Game(Date.now, rng);
  game.display.frame = fenetre;
  game.start();
  fenetre.webContents.send('go');
});

ipcMain.on('start-ai', (event, arg) => {
  rng.renew();
  game.defeat();
  game = new GameAI.GameAI(Date.now, rng, {p_dic:-0,p_hole:-0,p_maxHeight:1});
  game.display.frame = fenetre;
  game.start();
  fenetre.webContents.send('go');
});