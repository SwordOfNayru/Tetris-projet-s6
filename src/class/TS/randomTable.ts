import {Piece, PieceGenerator, T} from './Pieces'

class RandomTable {
    private arrayPiece:Array<number>;
    gameIds:Array<GameState>;
    
    constructor() { //? Rajout d'une zone critique à la génération des pièces ?
        this.arrayPiece = []
        this.gameIds = [];
    }

    /**
     * Génère une piece pour le jeux désirer
     * @param id id de l'objet jeu
     * @returns retourne une pièce
     */
    generate(id:number):Piece {
        let gamestate = this.searchGameState(id);
        if(gamestate != null)
            return this.getPieceFromGameState(gamestate);
        else
            throw 'id inconnu';
    }

    /**
     * Récupère une piece à partir d'un état de jeu
     * @param gamestate Etat de jeux d'un jeu
     * @returns Un Piece
     */
    getPieceFromGameState(gamestate:GameState):Piece {
        while(gamestate.state >= this.arrayPiece.length) {
            this.pushPiece(10);
        }
        return this.intToPiece(this.arrayPiece[gamestate.state++]);
    }

    /**
     * Converti un int à une piece
     * @param int entier de 0 à 6 qui permet de donner une piece
     * @returns une nouvelle piece générer
     */
    intToPiece(int:number):Piece {
        return new PieceGenerator.PieceArray[int]();
    }

    /**
     * Rajout un nombre i de pièce dans le tableau
     * @param i nombre d'itération
     */
    pushPiece(i:number):void {
        for (;i > 0; i--) {
            this.arrayPiece.push(PieceGenerator.getRandomInt());
        }
    }

    /**
     * rajoute un jeu dans la table des jeux
     * @param id id d'un jeu
     */
    register(id:number):void {
        if(this.searchGameState(id) == null) {
            this.gameIds.push({id:id,state:0})
        }
    }

    /**
     * Recherche l'état d'un jeu dans la table des états
     */
    searchGameState(id:number):GameState | null {
        for (let i = 0; i < this.gameIds.length; i++) {
            if(id == this.gameIds[i].id) {
                return this.gameIds[i];
            }
        }
        return null
    }

    /**
     * Remet la table des pièces à zéro ainsi que les états
     */
    renew():void {
        this.arrayPiece=[];
        this.gameIds.forEach(gamestate => {
            gamestate.state = 0;
        });
    }

    /**
     * 
     * @returns retourne la table des pièces sous forme de chaine de caractère.
     */
    toJSON():string {
        return JSON.stringify(this.arrayPiece);
    }

    fromJSON(json:string):void {
        this.renew();
        this.arrayPiece = JSON.parse(json);
    }

}

interface GameState {
    id:number;
    state:number;
}

export {RandomTable};