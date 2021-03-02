import {Piece} from "./Pieces";
import {PieceGenerator} from "./Pieces";
import {Display} from "./Display";
import {Player} from "./Player";
import {Matrix} from "./Matrix";
import { BrowserWindow, TouchBarSlider } from 'electron';
import {Color} from "./Matrix";
//Equivalent de la class système. 
//
//Avoir le jeu encapsuler dans une class permet d'en lancé plusieurs.
//TODO : Doit pouvoir fonctionner sans interface graphique.
class Game {
    matrix: Matrix;
    onGoingPiece: Piece;
    nextPiece: Piece;
    reservePiece: Piece;
    lastUpdate: number;
    end: Boolean;
    pause: Boolean;
    gravity: number;
    display: Display;
    player: Player;

    constructor() {

        //Data toutes les variables lié aux données
        this.matrix = new Matrix(10,20);
        this.onGoingPiece = PieceGenerator.generatePiece();
        this.nextPiece = PieceGenerator.generatePiece();
        this.reservePiece = PieceGenerator.generatePiece();
        this.lastUpdate = Date.now(); //Permet d'avoir le temps de la dernière update
        this.end = true; //tant que true le jeu continue
        this.pause = false;

        //Physique toute les variable lié à la physique du jeu
        this.gravity = 0.5; //Valeurs de distance parcouru par la pièces après une seconde.
        //Affichage
        this.display = new Display();

        //Recupération des contrôles joueurs
        this.player = new Player();
    }

    /**
     * 
     * @param timestamp Temps à l'appel de la boucle
     */
    loop(timestamp: number) {
        var progress = timestamp - this.lastUpdate;
        
        this.update(progress);
        //this.display.printCMDMatrix(this.matrix, this.onGoingPiece, this.nextPiece, this.reservePiece);
        //Ligne d'update graphique via la class Display
        this.display.sendSTR(this.matrix, this.onGoingPiece, this.nextPiece, this.reservePiece);

        this.lastUpdate = timestamp;
    }
    
    /**
     * 
     * @param progress Mis à jour du jeux physique
     */
    update(progress: number) {
        if(!this.pause) {
            this.falling(progress);
        }
    }

    falling(progress:number) {

        //Verification du null de onGoingPiece
        let piece = new Piece();
        if(this.onGoingPiece != null) {
            piece = this.onGoingPiece.copy();
        }
        
        //Determine la prochaine position
        var sec = progress / 1000; //temps écouler entre deux frames exprimer en seconde
        var calculateDeltaY = -this.gravity * sec
        
        //Bloc de test a supp
        var blocs = piece.getPosBlock(); //this.matrix.getAllVerifPos(piece.getPosBlock());
        this.display.jsConsoleLog(this.matrix.getAllVerifPos(piece.getPosBlock()));
        this.display.jsConsoleLog(this.onGoingPiece);
        this.display.jsConsoleLog(blocs);

        //fin bloc de test
        //On verifie la future position       
        if(this.matrix.verifPos(piece,0,calculateDeltaY)) {
            this.onGoingPiece?.modPos(0, calculateDeltaY);
            this.onGoingPiece.blocked = 0;    
        }
        else {
            this.onGoingPiece.pos.y = Math.floor(this.onGoingPiece.pos.y);
            this.onGoingPiece.blocked += sec;
        }
        
    }

    /**
     * Lance la boucle du jeu
     */
    async start() {
        this.matrix.matrix[4][5] = {r:255, g:222,b:222};
        setInterval(() => this.loop(Date.now()),16)
    }

    pauseGame() {
        this.pause = !this.pause;
    }

    pushNextPiece() {
        this.onGoingPiece = this.reservePiece;
        this.reservePiece = PieceGenerator.generatePiece();
        
    }

    shortUnPause() {
        this.pause = false;
        this.pause = true;
    }
}

export {Game};