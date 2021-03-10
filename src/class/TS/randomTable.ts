import {Piece, PieceGenerator, T} from './Pieces'

class RandomTable {
    private arrayPiece:Array<number>;
    gameIds:Array<GameState>;
    
    constructor() {
        this.arrayPiece = []
        this.gameIds = [];
    }

    generate(id:number) {
        let gamestate = this.searchGameState(id);
        if(gamestate != null)
            return this.getPieceFromGameState(gamestate);
        else
            throw 'id inconnu';
    }

    getPieceFromGameState(gamestate:GameState) {
        if(gamestate.state >= this.arrayPiece.length) {
            this.pushPiece(10);
        }
        return this.stringToPiece(this.arrayPiece[gamestate.state++]);
    }

    stringToPiece(int:number) {
        return new PieceGenerator.PieceArray[int]();
    }

    pushPiece(i:number) {
        for (;i > 0; i--) {
            this.arrayPiece.push(PieceGenerator.getRandomInt());
        }
    }

    register(id:number) {
        if(this.searchGameState(id) == null) {
            this.gameIds.push({id:id,state:0})
        }
    }

    searchGameState(id:number):GameState | null {
        for (let i = 0; i < this.gameIds.length; i++) {
            if(id == this.gameIds[i].id) {
                return this.gameIds[i];
            }
        }
        return null
    }

    toJSON() {
        return JSON.stringify(this.arrayPiece);
    }

    fromJSON(json:string) {
        this.arrayPiece = JSON.parse(json);
    }

}

interface GameState {
    id:number;
    state:number;
}

export {RandomTable};