class Display {
    canvas: HTMLElement;

    constructor(canvas) {
        this.canvas = document.getElementById(canvas);
    }

    async update(matrix, ogP, nP, rP, nbL) {
        this.printCMDMatrix(matrix, ogP, nP, rP);
    }

    printCMDMatrix(matrix, ogP, nP, rP) {
        console.log("MATRIX : ");
        matrix.printCmdMatrix();
        console.log("On going piece : ");
        ogP.printCMD();
        console.log("next piece : ");
        nP.printCMD();
        console.log("Reserve piece : ");
        rP.printCMD();
    }
}

export {Display};