ipcRenderer.on("content", (event,arg) => {
    console.log(arg);

    console.log(arg.matrix);
});

