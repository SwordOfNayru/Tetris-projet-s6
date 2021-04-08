import {Piece,O} from "./Pieces";
import {PieceGenerator} from "./Pieces";
import {Display} from "./Display";
import {Player} from "./Player";
import {Matrix} from "./Matrix";
import { BrowserWindow, TouchBarSlider } from 'electron';
import {RandomTable} from "./randomTable";
//Equivalent de la class système. 
//
//Avoir le jeu encapsuler dans une class permet d'en lancé plusieurs.
class Game {
    //Liste des variables
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
    canExchange: boolean;
    varLoop: NodeJS.Timeout | undefined;
    pieceNumber: number;
    id: number;

    //config variable
    baseGravity: number
    augmentGravity: number
    gravity: number;
    blockedMaxTime: number;
    rng: RandomTable;




    constructor(id:number, rng:RandomTable) {

        //Data toutes les variables lié aux données
        this.matrix = new Matrix(10,20);
        this.id = id;
        this.rng = rng;
        this.rng.register(id);
        //Piece
        this.pieceNumber = 0;
        
        //L'ordre est important pour les replays reserve > next > ongoing
        this.reservePiece = this.rng.generate(this.id);
        this.nextPiece = this.rng.generate(this.id);
        this.onGoingPiece = this.rng.generate(this.id);

        this.lastUpdate = Date.now(); //Permet d'avoir le temps de la dernière update
        this.continue = true; //tant que true le jeu continue
        this.pause = false;
        this.nbRow = 0;
        this.varLoop = undefined;
        this.canExchange = true;
        

        //Physique toute les variable lié à la physique du jeu
        this.baseGravity = 2
        this.augmentGravity = 0.002;
        this.gravity = this.baseGravity; //Valeurs de distance parcouru par la pièces après une seconde.
        this.blockedMaxTime = 1.5;//Valeur en seconde avant qu'une pièce soit bloqué
        
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
        this.display.sendGame(this);
        ////this.display.sendGame(this);

        this.lastUpdate = timestamp;
    }
    
    /**
     * Permet d'effectuer les mouvements
     * @param progress ecart entre deux itération de la boucle
     */
    update(progress: number) { //*Suite de condition encapsuler les actions dans des fonctions
        if(!this.pause) {
            if(!this.isBlocked()){ //Si la pièce peut bouger
                this.exchange();
                this.falling(progress);
                this.moving(progress);
                this.fastFalling();
            } else if(this.register()) { //inscription de la piece
                this.nbRow += this.matrix.detect();
                this.gravity = this.baseGravity + (this.nbRow * this.augmentGravity);
                this.pushNextPiece();
            } else { //Defaite
                this.defeat();
            }
        }
    }

    /**
     * Echange la pièce en cour et la pièce de réserve
     */
    exchange() {
        if(this.player.isExchange() && this.canExchange) {
            this.canExchange = false;

            let piece = this.onGoingPiece;
            this.onGoingPiece = this.reservePiece;
            this.reservePiece = piece;

            this.reservePiece.pos = {x:3.0,y:23.0};
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
     * Permet le fast falling donc faire tomber la pièce rapidement
     */
    fastFalling() {
        if(this.player.isFastFall()) {
            let y_tmp = this.matrix.findYmat(this.onGoingPiece.copy());
            if(y_tmp < this.onGoingPiece.pos.y && y_tmp > -1) {
                this.onGoingPiece.pos.y = y_tmp;
            }
        }
    }
    
    //La direction et la rotation sont gérer dans la même fonction pour économiser une copie de pièce.
    //La rotation s'effectura toujours après la rotation.
    /**
     * Permet de bouger la pièce sur les côté
     * @param progress ecart entre deux itération de la boucle
     */
    moving(progress:number) {
        let move = this.player.isMoving(progress);
        ////console.log("game move", move, this.onGoingPiece);
        let rotate = this.player.isRotate(progress);
        let deltaX = 0;
        let deltaRotation = 0;
        
        let piece = new Piece();
        if(this.onGoingPiece != null) {
            piece = this.onGoingPiece.copy();
        }

        if(move != "None") {    
            //Determine la prochaine possition
            if(move == "L") {
                deltaX = -1;
            } else if(move == "R") {
                deltaX = 1;
            }

            if(this.matrix.verifPos(piece, deltaX, 0)) {
                this.onGoingPiece.modPos(deltaX,0);
            }
        }

        //Teste de rotation
        if(rotate != "None") { //TODO Rajout de l'exclusion des O
            if(rotate == "L") {
                deltaRotation = -1;
            } else if (rotate == "R") {
                deltaRotation = 1;
            }

            //?La repétition des lignes n'est pas propres à modifier ?
            if(this.matrix.verifPos(piece,0,0,deltaRotation)) {
                if(deltaRotation == -1)
                    this.onGoingPiece.turnPieceLeft();
                if(deltaRotation == 1)
                    this.onGoingPiece.turnPieceRight();
            } else if (this.matrix.verifPos(piece,1,0)) { //On as pas à changer la rotation car piece à déjà sa rotation de changé
                if(deltaRotation == -1)
                    this.onGoingPiece.turnPieceLeft();
                if(deltaRotation == 1)
                    this.onGoingPiece.turnPieceRight();   
                this.onGoingPiece.modPos(1,0);
            } else if (this.matrix.verifPos(piece,-2,0)) { //Comme au dessus on mets -2 car la piece à ses coordonnée modifier
                if(deltaRotation == -1)
                    this.onGoingPiece.turnPieceLeft();
                if(deltaRotation == 1)
                    this.onGoingPiece.turnPieceRight();   
                this.onGoingPiece.modPos(-1,0);
            }
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
        ////this.matrix.matrix[4][18] = "FFFFFF";
        this.varLoop=setInterval(() => this.loop(Date.now()),16)
    }

    /**
     * Mets en pause le jeu
     */
    pauseGame() {
        this.pause = !this.pause;
    }

    /**
     * Génère la prochaine pièce
     */
    pushNextPiece() {
        this.onGoingPiece = this.nextPiece;
        this.nextPiece = this.rng.generate(this.id);
        this.canExchange = true;
        
    }

    /**
     * Pour des testes n'est pas à utilisé dans le produit fini
     */
    shortUnPause() {
        this.pause = false;
        this.pause = true;
    }

    /**
     * Permet de d'avoir la classe avec le format de l'interface. Celà permet l'envoie par le canal IPC
     * @returns Retourne la class sous format de l'interface GameData
     */
    toGameData():GameData {
        return {
            matrix: this.matrix,
            onGoingPiece:this.onGoingPiece,
            nextPiece: this.nextPiece,
            reservePiece: this.reservePiece,
            lastUpdate: this.lastUpdate,
            continue: this.continue,
            pause: this.pause,
            nbRow:this.nbRow,
            canExchange: this.canExchange,
            gravity: this.gravity,
            blockedMaxTime: this.blockedMaxTime
        }
    }

}

//Permet de communiqué avec la fenêtre
interface GameData {
    matrix: Matrix;
    onGoingPiece: Piece;
    nextPiece: Piece;
    reservePiece: Piece;
    lastUpdate: number;
    continue: Boolean;
    pause: Boolean;
    nbRow:number;
    canExchange: boolean;
    gravity: number;
    blockedMaxTime: number;
}

export {Game, GameData};