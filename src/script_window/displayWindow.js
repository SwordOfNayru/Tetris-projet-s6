"use strict";
ipcRenderer.on("content", function (event, arg) {
    affichageJeu(arg, "canvas");
});
function affichageJeu(GameData, canvas) {
    // Création des canvas
    var leCanvas = document.getElementById(canvas);
    if (leCanvas != null) {
        leCanvas.innerHTML = GameData.matrix.col.toString();
    }
    var leCanvasNext = document.getElementById("canvasNext");
    var leCanvasReserve = document.getElementById("canvasReserve");
    // Récupération des pièces
    var ogP = GameData.onGoingPiece;
    var nP = GameData.nextPiece;
    var rP = GameData.reservePiece;
    // Initialisation de la taille de la matrice
    // Un bloc vaut 40px x 40px
    leCanvas.width = GameData.matrix.col * 40;
    leCanvas.height = GameData.matrix.row * 40;
    // Initialisation de la taille du canvas de la pièce suivante
    leCanvasNext.width = 4 * 40;
    leCanvasNext.height = 4 * 40;
    // Initialisation de la taille du canvas de la pièce de réserve
    leCanvasReserve.width = 4 * 40;
    leCanvasReserve.height = 4 * 40;
    // Initialisation des bordures de chaque canvas
    leCanvas.style.border = "solid 2px";
    leCanvasNext.style.border = "solid 2px";
    leCanvasReserve.style.border = "solid 2px";
    // Création des contextes de représentation bi-dimensionnel
    var ctx = leCanvas.getContext('2d');
    var ctxNext = leCanvasNext.getContext('2d');
    var ctxReserve = leCanvasReserve.getContext('2d');
    var ctxLesPieces = leCanvas.getContext('2d');
    var ctxTest = leCanvasNext.getContext('2d');
    // Affichage de la pièce en cours
    var array = ogP.partern;
    var laRotation = ogP.rotation;
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[laRotation][i][j] === true) {
                if (ctx != null) {
                    ctx.fillStyle = '#' + ogP.color;
                    ctx.fillRect(ogP.pos.x * 40 + (j * 40), leCanvas.height - (ogP.pos.y * 40 - (i - 1) * 40), 40, 40);
                }
            }
        }
    }
    // Affichage de la pièce suivante
    var arrayNextPiece = nP.partern;
    var leI = 0;
    var leJ = 0;
    var ligneVide = 0;
    var colonneVide = 0;
    for (i = 0; i < arrayNextPiece.length; i++) {
        leI = 0;
        leJ = 0;
        for (j = 0; j < arrayNextPiece.length; j++) {
            if (arrayNextPiece[0][i][j] === false) {
                leJ++;
                if (leJ === 4) {
                    colonneVide++;
                }
            }
            if (arrayNextPiece[0][j][i] === false) {
                leI++;
                if (leI === 4) {
                    ligneVide++;
                }
            }
        }
    }
    for (i = 0; i < arrayNextPiece.length; i++) {
        for (j = 0; j < arrayNextPiece.length; j++) {
            if (arrayNextPiece[0][i][j] === true) {
                if (ctxNext != null) {
                    if (ligneVide % 2 === 0) {
                        if (colonneVide % 2 === 0) {
                            ctxNext.fillStyle = '#' + nP.color;
                            ctxNext.fillRect(j * 40, i * 40, 40, 40);
                        }
                        else {
                            ctxNext.fillStyle = '#' + nP.color;
                            ctxNext.fillRect(j * 40, ((colonneVide / 2) * 40), 40, 40);
                        }
                    }
                    else {
                        if (colonneVide % 2 === 0) {
                            ctxNext.fillStyle = '#' + nP.color;
                            ctxNext.fillRect(j * 40 + ((ligneVide / 2) * 40), i * 40, 40, 40);
                        }
                        else {
                            ctxNext.fillStyle = '#' + nP.color;
                            ctxNext.fillRect(j * 40 + ((ligneVide / 2) * 40), i * 40 + ((colonneVide / 2) * 40), 40, 40);
                        }
                    }
                }
            }
        }
    }
    // Affichage de la pièce de réserve
    var arrayReservePiece = rP.partern;
    leI = 0;
    leJ = 0;
    ligneVide = 0;
    colonneVide = 0;
    for (i = 0; i < arrayReservePiece.length; i++) {
        leI = 0;
        leJ = 0;
        for (j = 0; j < arrayReservePiece.length; j++) {
            if (arrayReservePiece[0][i][j] === false) {
                leJ++;
                if (leJ === 4) {
                    colonneVide++;
                }
            }
            if (arrayReservePiece[0][j][i] === false) {
                leI++;
                if (leI === 4) {
                    ligneVide++;
                }
            }
        }
    }
    for (i = 0; i < arrayReservePiece.length; i++) {
        for (j = 0; j < arrayReservePiece.length; j++) {
            if (arrayReservePiece[0][i][j] === true) {
                if (ctxReserve != null) {
                    if (ligneVide % 2 === 0) {
                        if (colonneVide % 2 === 0) {
                            ctxReserve.fillStyle = '#' + rP.color;
                            ctxReserve.fillRect(j * 40, i * 40, 40, 40);
                        }
                        else {
                            ctxReserve.fillStyle = '#' + rP.color;
                            ctxReserve.fillRect(j * 40, (colonneVide / 2) * 40, 40, 40);
                        }
                    }
                    else {
                        if (colonneVide % 2 === 0) {
                            ctxReserve.fillStyle = '#' + rP.color;
                            ctxReserve.fillRect(j * 40 + ((ligneVide / 2) * 40), i * 40, 40, 40);
                        }
                        else {
                            ctxReserve.fillStyle = '#' + rP.color;
                            ctxReserve.fillRect(j * 40 + ((ligneVide / 2) * 40), i * 40 + ((colonneVide / 2) * 40), 40, 40);
                        }
                    }
                }
            }
        }
    }
    // Affichage des pièces posées dans la matrice
    var arrayMatrice = GameData.matrix.matrix;
    for (i = 0; i < GameData.matrix.col; i++) {
        for (j = 0; j < GameData.matrix.row; j++) {
            if (arrayMatrice[i][j] != undefined) {
                if (ctxLesPieces != null) {
                    ctxLesPieces.fillStyle = '#' + arrayMatrice[i][j];
                    ctxLesPieces.fillRect(i * 40, (40 * 20) - ((j + 1) * 40), 40, 40);
                }
            }
        }
    }
    // Affichage du nombre de ligne réalisé par la joueur
    var nombreLigne = document.getElementById("nbLigne");
    if (nombreLigne != null) {
        nombreLigne.innerHTML = "Ligne : " + GameData.nbRow;
    }
}
// Récupération de la valeur de pause
var laPause = GameData.pause;
// Fonction pour mettre le jeu en pause
function pause() {
    ipcRenderer.send("pause");
    if (laPause === 1) {
        laPause = 0;
    }
    else {
        laPause = 1;
    }
}
