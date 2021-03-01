import {Matrix} from "./Matrix";
import {Piece} from "./Pieces";

class Display {
    canvas: HTMLElement | null;

    constructor(canvas: string) {
        this.canvas = document.getElementById(canvas);
    }

    async update(matrix: Matrix, ogP: Piece | null, nP: Piece, rP: Piece, nbL:number) {
        this.printCMDMatrix(matrix, ogP, nP, rP);
    }

    printCMDMatrix(matrix: Matrix, ogP: Piece | null, nP: Piece, rP: Piece) {
        console.log("MATRIX : ");
        matrix.printCmdMatrix();
        console.log("On going piece : ");
        if(ogP !== null) ogP.printCMD();
        console.log("next piece : ");
        nP.printCMD();
        console.log("Reserve piece : ");
        rP.printCMD();
    }
}

export {Display};