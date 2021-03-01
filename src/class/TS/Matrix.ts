class Matrix {
    matrix: Array<Array<Color | null>>; //Le point d'origine de la matrice est le [0][20] Les données sont stocké comme si la matrice était "couché"
    descColArray: Array<DescCol>; //Associe à chaque index de colonne une description 
                       //C'est à dire la hauteur de la colonne, la différence inter colonne gauche, nombre de trou dans la colonne.
    constructor(col: number, row: number) {
        this.matrix = [];
        this.descColArray = [];
        this.initMatrix(col, row);
    }

    initMatrix(col: number, row: number) {
        for (let index = 0; index < col; index++) {
            this.matrix.push(Array(row));
            this.descColArray.push({
                'height':0,
                'diffIntCol':0,
                'hole':0
            });
        }
    }

    print():string {
        var str = "";
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
            str += "|</br>";
        }
        return str;
    }

    //Nested class DescColonne qui ne sert que pour Matrix
    
}

interface DescCol {
    height: number;
    diffIntCol: number;
    hole: number;
}

interface Color {
    r:number;
    g:number;
    b:number;
}

export {Matrix};