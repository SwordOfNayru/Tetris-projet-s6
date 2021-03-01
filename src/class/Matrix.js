var Matrix = /** @class */ (function () {
    //C'est à dire la hauteur de la colonne, la différence inter colonne gauche, nombre de trou dans la colonne.
    function Matrix(col, row) {
        this.matrix = []; //Le point d'origine de la matrice est le [0][20] Les données sont stocké comme si la matrice était "couché"
        this.descColArray = []; //Associe à chaque index de colonne une description 
        this.initMatrix(col, row);
    }
    Matrix.prototype.initMatrix = function (col, row) {
        for (var index = 0; index < col; index++) {
            this.matrix.push(Array(row));
            this.descColArray.push({
                'height': 0,
                'diffIntCol': 0,
                'hole': 0
            });
        }
    };
    Matrix.prototype.printCmdMatrix = function () {
        var str = "Matrix : \n";
        for (var iRow = this.matrix[0].length - 1; iRow >= 0; iRow--) {
            str += "| ";
            for (var iCol = 0; iCol < this.matrix.length; iCol++) {
                if (this.matrix[iCol][iRow] === undefined) {
                    str += "[ ] ";
                }
                else {
                    str += "[x] ";
                }
            }
            str += "|\n";
        }
        console.log(str);
    };
    return Matrix;
}());
