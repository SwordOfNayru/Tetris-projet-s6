import {Matrix} from "./Matrix";
import {Piece} from "./Pieces";
import { BrowserWindow } from 'electron';
import {Game} from "./Game";

class Display {
    //canvas: HTMLElement | null;
    frame:BrowserWindow | null;
    constructor() {
        this.frame = null;
        //this.canvas = document.getElementById(canvas);
    }

    async update(matrix: Matrix, ogP: Piece | null, nP: Piece, rP: Piece, nbL:number) {
        this.printCMDMatrix(matrix, ogP, nP, rP);
    }

    printCMDMatrix(matrix: Matrix, ogP: Piece | null, nP: Piece, rP: Piece) {
        console.log(this.genSTRPrint(matrix, ogP, nP, rP));
    }


    genSTRPrint(matrix: Matrix, ogP: Piece | null, nP: Piece, rP: Piece) {
        var str = "";
        str += "______MATRIX______</br>";
        str += matrix.print();
        if(ogP != null) {
            str += "______OG P______</br>";
            str += ogP.print();
        }
        str += "______N P______</br>";
        str += nP.print();
        str += "______R P______</br>";
        str += rP.print();
        return str;
    }

    genGameSTRPrint(game:Game) {
        var str = "";
        str += "______MATRIX______</br>";
        str += game.matrix.print();
        str += "LIGNES : " + game.nbRow + "</br>";
        if(game.onGoingPiece != null) {
            str += "______OG P______</br>";
            str += game.onGoingPiece.print();
        }
        str += "______N P______</br>";
        str += game.nextPiece.print();
        str += "______R P______</br>";
        str += game.reservePiece.print();
        str += "______Continu_______</br>Continue: "+game.continue+"</br>";
        return str;
    }

    sendSTR(matrix: Matrix, ogP: Piece | null, nP: Piece, rP: Piece) {
        if(this.frame != null)
            this.frame.webContents.send("content", this.genSTRPrint(matrix, ogP, nP, rP));
    }

    sendGameSTR(game:Game) {
        if(this.frame !=null)
            this.frame.webContents.send("content", this.genGameSTRPrint(game));
    }

    jsConsoleLog(object:any) {
        if(this.frame != null)
            this.frame.webContents.send("log", object);
    }
}

export {Display};