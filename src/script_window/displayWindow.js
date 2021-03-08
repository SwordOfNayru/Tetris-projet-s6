"use strict";
ipcRenderer.on("content", function (event, arg) {
    affichageJeu(arg, "canvas");
});
function affichageJeu(gameData, canvas) {
    var canva = document.getElementById(canvas);
    if (canva != null)
        canva.innerHTML = gameData.matrix.col.toString();
}
