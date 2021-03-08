"use strict";
ipcRenderer.on("content", function (event, arg) {
    console.log(arg);
    console.log(arg.matrix);
});
