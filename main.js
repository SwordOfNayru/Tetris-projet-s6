"use strict";
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain;
var Game = require("./src/class/TS/Game");
var game = new Game.Game();
function createWindow() {
    var win = new BrowserWindow({
        width: 800,
        height: 1000,
        webPreferences: {
            nodeIntegration: true
        },
        frame: true
    });
    win.loadFile('test.html');
}
app.whenReady().then(createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
app.on('browser-window-created', function (event, windows) {
    game.display.frame = windows;
    game.start();
});
ipcMain.on('pause', function () {
    game.pauseGame();
});
//Key listener
ipcMain.on('KeyDown', function (event, arg) {
    game.player.keyDown(arg);
});
ipcMain.on('KeyUp', function (event, arg) {
    game.player.keyUp(arg);
});
