import {Piece} from "./Pieces";
import {PieceGenerator} from "./Pieces";
import {Display} from "./Display";
import {Player} from "./Player";
import {Matrix} from "./Matrix";

//Equivalent de la class système. 
//
//Avoir le jeu encapsuler dans une class permet d'en lancé plusieurs.
//TODO : Doit pouvoir fonctionner sans interface graphique.
class Game {
    matrix: Matrix;
    pieceOnGoing: Piece;
    nextPiece: Piece;
    reservePiece: Piece;
    lastUpdate: number;
    end: Boolean;
    pause: Boolean;
    gravity: number;
    display: Display;
    player: Player;

    constructor(canvas) {

        //Data toutes les variables lié aux données
        this.matrix = new Matrix(10,20);
        this.pieceOnGoing = null;
        this.nextPiece = PieceGenerator.generatePiece();
        this.reservePiece = PieceGenerator.generatePiece();
        this.lastUpdate = Date.now(); //Permet d'avoir le temps de la dernière update
        this.end = true; //tant que true le jeu continue
        this.pause = true;

        //Physique toute les variable lié à la physique du jeu
        this.gravity = 0.1; //Valeurs de distance parcouru par la pièces après une seconde.
        //Affichage
        this.display = new Display(canvas);

        //Recupération des contrôles joueurs
        this.player = new Player();
    }


    loop(timestamp) {
        var progress = timestamp - this.lastUpdate;
        
        this.update(progress);
        this.display.printCMDMatrix(this.matrix, this.pieceOnGoing, this.nextPiece, this.reservePiece);

        this.lastUpdate = timestamp;
        window.requestAnimationFrame(() => this.loop(Date.now));
    }

    update(progress) {
        console.log("update");
        if(!this.pause) {
            console.log(this.pieceOnGoing);
            if(this.pieceOnGoing === null) {
                this.pushNextPiece();
            }
        }
    }

    start() {
        window.requestAnimationFrame((t) => this.loop(t));
    }

    pushNextPiece() {
        this.pieceOnGoing = this.reservePiece;
        this.reservePiece = PieceGenerator.generatePiece();
        
        this.pieceOnGoing.modPos(4.0,0.0);
    }

    shortUnPause() {
        this.pause = false;
        this.pause = true;
    }
}