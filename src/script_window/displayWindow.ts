ipcRenderer.on("content", (event,arg) => {
    affichageJeu(arg,"canvas");
});

function affichageJeu(gameData:any, canvas:string) {
    var canva = document.getElementById(canvas);
    if(canva != null)
        canva.innerHTML = gameData.matrix.col.toString();
}