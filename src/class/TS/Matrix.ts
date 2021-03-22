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
                'diffIntCol':0, //avec la colonne précedante
                'hole':0,
                'holeExploreMax':0,
                'holeExploreMin':0
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

        str += "Desc col </br>";
        str += "┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐</br>";
        str += "|00|01|02|03|04|05|06|07|08|09|</br>";
        str += "├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤</br>|";
        for (let i = 0; i < 10; i++) {
            if(this.descColArray[i].height < 10)
                str += "0"+ this.descColArray[i].height + "|";
            else
                str += this.descColArray[i].height + "|"
        }
        str += "Height</br>├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤</br>|";
        for (let i = 0; i < 10; i++) {
            if(this.descColArray[i].diffIntCol < 10)
                str += "0"+ this.descColArray[i].diffIntCol + "|";
            else
                str += this.descColArray[i].diffIntCol + "|"
        }
        str += "DiffIntCol</br>├──┼──┼──┼──┼──┼──┼──┼──┼──┼──┤</br>|";
        for (let i = 0; i < 10; i++) {
            if(this.descColArray[i].hole < 10)
                str += "0"+ this.descColArray[i].hole + "|";
            else
                str += this.descColArray[i].hole + "|"
        }
        str += "holes</br>└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘</br>|";

        //└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
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
        this.eval(); //Début et fin d'évalution
        return true;
    }

    detect():number {
        let array = this.getCompleteRow();
        console.log(array);
        if(array.length > 0) {
            for (let i = array.length-1; i >= 0; i--) {
                this.deleteRow(array[i]);
            }
        }
        return array.length;
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

    deleteRow(row:number) {
        for (let iRow = row; iRow < this.row; iRow++) {
            if(iRow < this.row-1) {
                for (let iCol = 0; iCol < this.col; iCol++) {
                    this.matrix[iCol][iRow] = this.matrix[iCol][iRow+1];
                }
            } else {
                for (let iCol = 0; iCol < this.col; iCol++) {
                    this.matrix[iCol][iRow] = undefined;
                }
            }
        }
    }

    eval(start:number = 0, end:number = 9):void {
        //TODO Evaluation des colonne changeante.
        for (let i = 0; i < this.col; i++) {
            this.descColArray[i].height = this.getHeight(i);
            this.descColArray[i].diffIntCol = this.getDiffInterCol(i);
        }
        this.getHoles();
    }

    getHeight(col:number):number {
        for (let i = this.row-1; i >= 0; i--) {
            if(this.matrix[col][i] !== undefined)
                return i+1
        }
        return 0
    }

    getDiffInterCol(col:number):number {
        if(col == 0) return 0;
        else {
            return Math.abs(this.descColArray[col].height - this.descColArray[col-1].height);
        }
    }
    //A revoir si le trou est accessible sur les côtes
    //TODO Il faut revoir le définition de trou avec une exploration d'un cavité.
    getHoles() {
        //Init
        this.resetHoleExplore();
        let col = 0;
        let row = 0;
        //Tant que le mur n'est pas entierement balayé.
        while(col < this.col -1 || row < this.descColArray[this.col-1].height) {
            //On regarde si on doit changer de colonne
            if(row >= this.descColArray[col].height) {
                ++col;
                row = 0;
                continue;
            }
            //On regarde si la case n'est pas encore explorer.
            if(row > this.descColArray[col].holeExploreMax || row < this.descColArray[col].holeExploreMin) {
                if(this.matrix[col][row] === undefined) { //Si la case est vide
                    this.cavityExploration(row, col);
                    ++row; continue; //il y a déjà l'inscription des min max donc on passe dans cette situation.
                }
            }
            //Inscription des Min Max
            if(row > this.descColArray[col].holeExploreMax)
                this.descColArray[col].holeExploreMax = row;
            if(row < this.descColArray[col].holeExploreMin)
                this.descColArray[col].holeExploreMin = row;
            ++row;
        }
    }

    cavityExploration(row:number, col:number):void{
        //Init
        let exploreArray = [{'x':col,'y':row}];
        let findArray = [{'x':col,'y':row}];
        let corner = [
            {
                x:1,
                y:0
            },
            {
                x:0,
                y:1
            },
            {
                x:-1,
                y:0
            },
            {
                x:0,
                y:-1
            }];
        let flag = true;

        //Tant qu'il y a des cases à explorer
        while(exploreArray.length > 0) {
            if(exploreArray[0].y >= this.descColArray[exploreArray[0].x].height) //Si la case voit le ciel
                flag = false; 
            else {
                for(let i = 0; i < corner.length; i++) { //Pour tout les coins 
                    let c = {                            //? mettre l'inscription des minx max dans la boucle for puisque même les cases remplis sont déjà observé
                        x: corner[i].x + exploreArray[0].x,
                        y: corner[i].y + exploreArray[0].y
                    };
                    if(c.x >= 0 && c.x < this.col) {    //Si la case est inbound
                        if(c.y >= 0 && c.y < this.row) {
                            if(this.matrix[c.x][c.y] == undefined) { //Si la case est vide
                                if(!this.inExpArray(findArray, c)) { //Si la case n'est pas dans le tableau
                                    exploreArray.push(c);
                                    findArray.push(c);
                                }
                            }
                        }
                    }
                }
            }
            //Inscription des mins et maxs explorer
            if(exploreArray[0].y < this.descColArray[exploreArray[0].x].holeExploreMin) 
                this.descColArray[exploreArray[0].x].holeExploreMin = exploreArray[0].y;
            if(exploreArray[0].y > this.descColArray[exploreArray[0].x].holeExploreMax) 
                this.descColArray[exploreArray[0].x].holeExploreMax = exploreArray[0].y;
            exploreArray.splice(0,1);
        }

        //Inscription des trous
        if(flag) { //Si la cavité est bien un trou
            findArray.forEach(c => {
                ++this.descColArray[c.x].hole;
            });
        }
    }

    inExpArray(array:Array<Position>, c:Position):boolean {
        for (let i = 0; i < array.length; i++) {
            if(array[i].x == c.x && array[i].y == c.y) return true;
        }
        return false;
    }

    resetHoleExplore():void {
        this.descColArray.forEach(col => {
            col.hole = 0;
            col.holeExploreMax = -1;
            col.holeExploreMin = this.row;
        });
    }
    
}

interface DescCol {
    height: number;
    diffIntCol: number;
    hole: number;
    holeExploreMax:number;
    holeExploreMin:number;
}


export {Matrix};
