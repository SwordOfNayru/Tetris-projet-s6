import {Piece} from "./Pieces"
import {Position} from "./Pieces";
class Matrix {
    
    matrix: Array<Array<string | undefined>>; //Le point d'origine de la matrice est le [0][20] Les données sont stocké comme si la matrice était "couché"
    descColArray: Array<DescCol>; //Associe à chaque index de colonne une description 
                       //C'est à dire la hauteur de la colonne, la différence inter colonne gauche, nombre de trou dans la colonne.
    col:number;
    row:number;
    constructor(col: number, row: number) {
        this.col = col;
        this.row = row;
        this.matrix = [];
        this.descColArray = [];
        this.initMatrix(this.col, this.row);
    }

    /**
     * 
     * @param col nombre de colonne
     * @param row nombre de ligne
     */
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

    /**
     * @returns retourne la matrice sous forme de texte
     */
    print():string {
        var str = "\u00a0\u00a0\u00a0\u00a0\u00a00\u00a0\u00a0\u00a01\u00a0\u00a0\u00a02\u00a0\u00a0\u00a03\u00a0\u00a0\u00a04\u00a0\u00a0\u00a05\u00a0\u00a0\u00a06\u00a0\u00a0\u00a07\u00a0\u00a0\u00a08\u00a0\u00a0\u00a09</br>";
        for (let iRow = this.matrix[0].length - 1; iRow >= 0; iRow--) {
            if(iRow < 10) {
                str += "0"+iRow;
            } else {
                str += iRow;
            }
            str += "|\u00a0";
            for (let iCol = 0; iCol < this.matrix.length; iCol++) {
                if(this.matrix[iCol][iRow] === undefined) {
                    str += "[\u00a0]\u00a0";
                }
                else {
                    str += "[x]\u00a0";
                }
            }
            str += "|</br>";
        }
        return str;
    }

    /**
     * Permet de vérifier si une pièce peux être placé à une future position
     * @param piece La pièce à vérifier.
     * @param dX décalage X
     * @param dY décalage Y
     * @param dR décalage en Rotation positif droite negatif gauche
     * TODO il manque le décalage de rotation.
     * @returns Vrai si la pièce peux être emboité. Faux si la pièce ne peux pas être emboité.
     * !La vérification ne marche pas sur des chutes superieur à un bloc de distance.
     * !La Piece doit être un clone via la méthode Piece.copy().
     */
    verifPos(piece:Piece, dX:number, dY:number, dR:number = 0) {
        piece.modPos(dX,dY);
        if(dR == 1) {
            piece.turnPieceRight();
        } else if(dR == -1) {
            piece.turnPieceLeft();
        }
        
        var blocs = this.getAllVerifPos(piece.getPosBlock());
        
        for (let index = 0; index < blocs.length; index++) {
            if(blocs[index].x < 0 || blocs[index].x >= this.col || blocs[index].y < 0) { //Si le bloc est OOB alors on retourne faux
                return false;
            }

            if(blocs[index].y < this.row) { //On verifie que le bloc est inbound au niveau de la hauteur si oui il peux être faux.
                if(this.matrix[blocs[index].x][blocs[index].y] != undefined) {
                    return false;
                }
            }
        }

        return true;
    }

    //TODO implementation de la nouvelle methode avec verification par le dessus
    //Creation d'une interface bloc plus intelligeante ? avec variable audessus ?
    /**
     * 
     * @param blocs Liste des blocs constitutif d'une pièce obtenable par la méthode Piece.getPosBloc()
     * 
     * @returns Retourne un tableau des position à vérifier
     */
    getAllVerifPos(blocs:Array<Position>):Array<Position> {
        //init Array
        var Array:Array<Position>;
        Array = [];
        //Boucle des blocs
        blocs.forEach(bloc => {
            
            Array.push({
                x:Math.floor(bloc.x),
                y:Math.floor(bloc.y)
            });
            if(! (bloc.y - Math.floor(bloc.y) == 0.0) ) { //On test si le bloc est à un position decimal ou non
                Array.push({                              //Si il y a une position décimal alors on rajoute un bloc à vérifier de plus.
                    x:Math.floor(bloc.x),
                    y:Math.ceil(bloc.y)
                }); 
            }
        });
        return Array;
    }

    /**
     * Inscrit une pièce dans la matrice
     * @param piece La pièce a inscrire
     * @returns Vrai si la pièce est incrit. Faux si la pièce ne peux être inscrit.
     */
    register(piece:Piece):boolean {
        let blocs = piece.getPosBlock();
        for (let i = 0; i < blocs.length; i++) {
            if(Math.floor(blocs[i].y)>this.row-1)
                return false;
        }       
        blocs.forEach(bloc => {
            this.matrix[Math.floor(bloc.x)][Math.floor(bloc.y)] = piece.color;
        });
        return true;
    }

    detect() {
        let array = this.getCompleteRow();
        console.log(array);
        // if(array.length > 0) {
        //     for (let i = array.length-1; i >= 0; i--) {
                
        //     }
        // }
    }

    getCompleteRow():Array<number> {
        let array = new Array<number>();
        for (let iRow = 0; iRow < this.row; iRow++) {
            let flag = true;
            for (let iCol = 0; iCol < this.col; iCol++) {
                if(this.matrix[iCol][iRow] == undefined) {
                    flag = false;
                    break;
                }
            }
            if(flag) array.push(iRow);
        }
        return array;
    }
    
}

interface DescCol {
    height: number;
    diffIntCol: number;
    hole: number;
}


export {Matrix};
