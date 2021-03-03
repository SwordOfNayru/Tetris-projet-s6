import {Piece} from "./Pieces";
import {PieceGenerator} from "./Pieces";
import {Display} from "./Display";
import {Player} from "./Player";
import {Matrix} from "./Matrix";
import { BrowserWindow, TouchBarSlider } from 'electron';
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
    continue: Boolean;
    pause: Boolean;
    display: Display;
    player: Player;
    nbRow:number;

    //TODO rajout de la gestion de repetition de touche
    //config variable
    gravity: number;
    blockedMaxTime: number;
    varLoop: NodeJS.Timeout | undefined;

    constructor() {

        //Data toutes les variables lié aux données
        this.matrix = new Matrix(10,20);
        this.onGoingPiece = PieceGenerator.generatePiece();
        this.nextPiece = PieceGenerator.generatePiece();
        this.reservePiece = PieceGenerator.generatePiece();
        this.lastUpdate = Date.now(); //Permet d'avoir le temps de la dernière update
        this.continue = true; //tant que true le jeu continue
        this.pause = false;
        this.nbRow = 0;
        this.varLoop = undefined;

        //Physique toute les variable lié à la physique du jeu
        this.gravity = 0.5; //Valeurs de distance parcouru par la pièces après une seconde.
        this.blockedMaxTime = 3;//Valeur en seconde avant qu'une pièce soit bloqué
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
        this.display.sendGameSTR(this);

        this.lastUpdate = timestamp;
    }
    
    /**
     * 
     * @param progress Mis à jour du jeux physique
     */
    update(progress: number) { //*Suite de condition encapsuler les actions dans des fonctions
        if(!this.pause) {
            if(!this.isBlocked()){
                this.falling(progress);
            } else if(this.register()) { //inscription de la piece
                //TODO Verification des lignes
                this.pushNextPiece();
            } else {
                this.defeat();
            }
        }
    }
    
    /**
     * Déclare la défaite en arrétant la boucle
     */
    defeat() {
        this.continue = false;
        if(this.varLoop != undefined) {
            clearInterval(this.varLoop);
        }
    }

    /**
     * Vérifie que la piece est bloqué
     * @returns Vrai si la pièce est bloqué. Faux si elle est libre
     */
    isBlocked():boolean {
        if(this.onGoingPiece.blocked > this.blockedMaxTime) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Fait tomber la piece
     * @param progress nombre de ms entre deux itération de la boucle
     */
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
     * Inscrit la pièce dans la matrice ou active la défaite
     * @returns Vrai si la pièce est incrit. Faux si la pièce ne peux être inscrit.
     */
    register():boolean {
        return this.matrix.register(this.onGoingPiece);
    }

    /**
     * Lance la boucle du jeu
     */
    async start() {
        this.matrix.matrix[4][18] = "FFFFFF";
        this.varLoop=setInterval(() => this.loop(Date.now()),16)
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