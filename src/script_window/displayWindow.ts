ipcRenderer.on("content", (event,arg) => {
    affichageJeu(arg,"canvas");
});

function affichageJeu(GameData:any, canvas:string) {
    var leCanvas = document.getElementById(canvas) as HTMLCanvasElement;

    if(leCanvas != null) {
        leCanvas.innerHTML = GameData.matrix.col.toString();
    }

    var leCanvasNext = document.getElementById("canvasNext") as HTMLCanvasElement;

    var leCanvasReserve = document.getElementById("canvasReserve") as HTMLCanvasElement;


    let ogP = GameData.onGoingPiece;
    let nP = GameData.nextPiece;
    let rP = GameData.reservePiece;

    leCanvas.width = GameData.matrix.col * 40;
    leCanvas.height = GameData.matrix.row * 40;

    leCanvasNext.width = 4 * 40;
    leCanvasNext.height = 4 * 40;

    leCanvasReserve.width = 4 * 40;
    leCanvasReserve.height = 4 * 40;

    leCanvas.style.border = "solid 2px"
    leCanvasNext.style.border = "solid 2px"
    leCanvasReserve.style.border = "solid 2px"

    let ctx = leCanvas.getContext('2d');
    let ctxNext = leCanvasNext.getContext('2d');
    let ctxReserve = leCanvasReserve.getContext('2d');
    let ctxLesPieces = leCanvas.getContext('2d');

    var arrayNextPiece = nP.partern;

    for (var i = 0; i < arrayNextPiece.length; i++) {
        for (var j = 0; j < arrayNextPiece.length; j++) {
            if (arrayNextPiece[0][i][j] === true) {
                if(ctxNext != null) {
                    ctxNext.fillStyle = '#' + nP.color;
                    ctxNext.fillRect(j * 40, i * 40, 40,40);
                }
            }
        }
    }

    var array = ogP.partern;
    var laRotation = ogP.rotation;


    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length; j++) {
            if (array[laRotation][i][j] === true) {
                if(ctx != null) {
                    ctx.fillStyle = '#' + ogP.color;
                    ctx.fillRect(ogP.pos.x * 40 + (j * 40), leCanvas.height - (ogP.pos.y * 40 - (i-1) * 40), 40,40);
                }
            }
        }
    }

    var arrayReservePiece = rP.partern;

    for (i = 0; i < arrayReservePiece.length; i++) {
        for (j = 0; j < arrayReservePiece.length; j++) {
            if (arrayReservePiece[0][i][j] === true) {
                if(ctxReserve != null) {
                    ctxReserve.fillStyle = '#' + rP.color;
                    ctxReserve.fillRect(j * 40, i * 40, 40,40);
                }
            }
        }
    }





    var arrayMatrice = GameData.matrix.matrix;

    for (i = 0; i < GameData.matrix.col; i++) {
        for (j = 0; j < GameData.matrix.row; j++) {
            if (arrayMatrice[i][j] != undefined) {
                if(ctxLesPieces != null) {
                    ctxLesPieces.fillStyle = '#' + arrayMatrice[i][j];
                    ctxLesPieces.fillRect(i * 40, (40*20) - ((j+1) * 40), 40,40);
                }
            }
        }
    }

    var nombreLigne = document.getElementById("nbLigne");

    if(nombreLigne != null) {
        nombreLigne.innerHTML = "Ligne : " + GameData.nbRow;
    }
}

var laPause = GameData.pause;

function pause() {
    ipcRenderer.send("pause");
    if (laPause === 1) {
        laPause = 0;
    } else {
        laPause = 1;
    }
}


