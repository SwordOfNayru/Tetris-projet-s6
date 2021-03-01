class Matrix {
    matrix = []; //Le point d'origine de la matrice est le [0][20] Les données sont stocké comme si la matrice était "couché"
    descColArray = []; //Associe à chaque index de colonne une description 
                       //C'est à dire la hauteur de la colonne, la différence inter colonne gauche, nombre de trou dans la colonne.
    constructor(col, row) {
        this.initMatrix(col, row);
    }

    initMatrix(col, row) {
        for (let index = 0; index < col; index++) {
            this.matrix.push(Array(row));
            this.descColArray.push({
                'height':0,
                'diffIntCol':0,
                'hole':0
            });
        }
    }

    printCmdMatrix() {
        let str = "Matrix : \n"
        for (let iRow = this.matrix[0].length - 1; iRow >= 0; iRow--) {
            str += "| ";
            for (let iCol = 0; iCol < this.matrix.length; iCol++) {
                if(this.matrix[iCol][iRow] === undefined) {
                    str += "[ ] ";
                }
                else {
                    str += "[x] ";
                }
            }
            str += "|\n";
        }
        console.log(str);
    }
}

export {Matrix}