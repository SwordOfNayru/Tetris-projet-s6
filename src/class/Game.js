
//Equivalent de la class système. 
//
//Avoir le jeu encapsuler dans une class permet d'en lancé plusieurs.
//TODO : Doit pouvoir fonctionner sans interface graphique.
class Game {
    constructor() {

        //Data toutes les variables lié aux données
        this.matrix = new Matrix();
        this.pieceOnGoing = PieceGenerator.generatePiece();
        this.lastUpdate = Date.now //Permet d'avoir le temps de la dernière update
        

        //Physique toute les variable lié à la physique du jeu
        this.gravity = 0 //Valeurs de distance parcouru par la pièces après une seconde.
    }

    update() {

    }

    start() {
        while(true) {
            this.update();
        }
    }

}