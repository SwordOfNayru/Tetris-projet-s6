import { TouchBarOtherItemsProxy } from "electron";
import { Matrix } from "./Matrix";
import { Piece, Position } from "./Pieces";
import { Player } from "./Player";

class AI extends Player {
    genes:Genes;
    bplay:Play;
    lastNP:string;
    matrix:Matrix;
    OgP:Piece;
    NP:Piece;
    RP:Piece;
    //peut être amélioré
    constructor(genes:Genes, genes_shifting:Genes = {p_dic:0,p_hole:0,p_maxHeight:0}) {
        super();
        this.genes = {
            p_dic:genes.p_dic + genes_shifting.p_dic,
            p_hole:genes.p_hole + genes_shifting.p_hole,
            p_maxHeight:genes.p_maxHeight + genes_shifting.p_maxHeight
        };
        this.bplay = {
            pieceID:"none", 
            destination:{x:0,y:0}, 
            rotation:0, 
            type:0,
            p_score:0
        };
        this.lastNP = "None"
        let tmp_piece = new Piece();
        this.OgP = tmp_piece;
        this.NP = tmp_piece;
        this.RP = tmp_piece;

        this.matrix = new Matrix(0,0);
    }

    update(matrix:Matrix, OgP:Piece, NP:Piece, RP:Piece) {
        this.matrix = matrix;
        this.OgP = OgP; //il ne s'update pas ?
        this.NP = NP;
        this.RP = RP;
        //console.log("update", OgP, this.OgP);
        this.needBestPlay();
    }
    //Fonction qui définis si on cherche un meilleurs play
    needBestPlay() {
        //console.log("nbp fnc", this.lastNP, this.NP.id);
        if(this.lastNP != this.NP.id) {
            this.lastNP = this.NP.id;
            this.bestPlay(this.matrix, this.OgP, this.NP, this.RP);
        }
    }


    //Les réécriture des fonction de player définis comment l'ia va posé la pièce
    isExchange():boolean {
        //console.log("exch", this.OgP.id, this.bplay.pieceID);
        if(this.OgP.id != this.bplay.pieceID) return true;
        else return false;
    }

    isRotate(progress:number):string {
        
        let diffRotation = this.OgP.rotation - this.bplay.rotation;
        //console.log("rota", this.OgP.rotation, this.bplay.rotation);
        switch (diffRotation) { //Il y a 7 cas c'est le moyen le plus simple c'est peut être un peu brut force
            case 0: //Je laisse le cas car c'est le plus usuel
                return "None";
            case 1:
                return "L";
            case 2:
                return "R";
            case 3:
                return "R";
            case -1:
                return "R"
            case -2:
                return "R";
            case -3:
                return "L";
            default:
                return "None";
        }
    }
    
    isMoving(progress:number):string {
        //console.log("move", this.OgP.pos.x, this.bplay.destination.x);
        if(this.OgP.pos.x > this.bplay.destination.x) return "L";
        else if (this.OgP.pos.x < this.bplay.destination.x) return "R";
        else return "None";
    }

    isFastFall():boolean {
        //console.log("FF", this.OgP.pos.x, this.bplay.destination.x);
        return this.OgP.pos.x == this.bplay.destination.x;
    }

    //OG = OnGoing (piece en cours), R = Reserver (piece en réserve), N = next (piece suivante)
    //Il faut prendre en compte n 0 et n+1 pour economisé du temps de calcul
    //Avec un autre langage on pourrais faire du multi threading sauf quand Node c'est imposible
    bestPlay(matrix:Matrix, OgP:Piece, NP:Piece, RP:Piece) { //Surement une complexité quadratique :/ 
        //console.log("Début recherche", Date.now());
        //console.log("OG ", this.OgP, "\nR ", this.RP, "\nN ", this.NP);
        let OG_possible_play:Array<MatPlay> = [];                        
        let R_possible_play:Array<MatPlay> = [];

        let clone_array = [OgP.copy(), RP.copy(), NP.copy()];
        
        //Les move de OG possible
        this.findEveryPosMatPlay(matrix, clone_array[0], OG_possible_play);

        //Les move de R possible
        this.findEveryPosMatPlay(matrix, clone_array[0], R_possible_play, 1);
        

        //Pour trouver la meilleurs combinaison avec OG
        let BestOGPlay = this.findBestPlay(OG_possible_play, clone_array[1], clone_array[2]);
        let BestRPlay = this.findBestPlay(OG_possible_play, clone_array[0], clone_array[2]);
        
        if(BestOGPlay.p_score >= BestRPlay.p_score) {
            this.bplay = OG_possible_play[BestOGPlay.i].play;
        } else {
            this.bplay = R_possible_play[BestRPlay.i].play;
        }
        console.log("BestPlay : ", this.bplay, "\n Date : ", Date.now());
    }

    findBestPlay(matplay_array:Array<MatPlay>, p1:Piece, p2:Piece):IPscore {
        let BestPlay = {i:0, p_score:0}
        for (let i = 0; i < matplay_array.length; i++) { //ça prend N6
            let N1_possible_play:Array<MatPlay> = [] //signifie OG N+1
            this.findEveryPosMatPlay(matplay_array[i].matrix, p1, N1_possible_play);
            this.findEveryPosMatPlay(matplay_array[i].matrix, p2, N1_possible_play);
            for (let j = 0; j < N1_possible_play.length; j++) {
                if(BestPlay.p_score < N1_possible_play[j].play.p_score) {
                    BestPlay.i = i;
                    BestPlay.p_score = N1_possible_play[j].play.p_score;
                }
            }
        }
        return BestPlay;
    }

    findEveryPosMatPlay(matrix:Matrix, p:Piece, Array:Array<MatPlay>, type:number = 0) { //Attention complexité de mémoire.
        for(let rota = 0; rota < 4; rota++) {
            for(let posCol = -2; posCol < matrix.col - 2; posCol++) { //Toute les position de la pièce
                p.rotation = rota;
                p.pos.x = posCol;
                let y = matrix.findYmat(p);
                if(y > -1) { //Exclus les mouvements qui font perdre le jeu
                    p.pos.y = y;
                    let tmp_mat = this.genMatrix(matrix,p)
                    Array.push( {
                            matrix:tmp_mat,
                            play: {
                                pieceID:p.id,
                                destination:p.pos,
                                rotation:p.rotation,
                                type:type,
                                p_score:this.wallEval(tmp_mat)
                            }
                        }
                        );
                }
            }
        }
    }


    /**
     * Genère une matrix m avec la piece p inscrite dedans.
     * @param m 
     * @param p 
     */
    genMatrix(m:Matrix, p:Piece):Matrix {
        let tmp_mat = new Matrix(m.col, m.row);
        tmp_mat.matrix = JSON.parse(JSON.stringify(m.matrix)); //Json parse et stringify pour cloner le tableau
        tmp_mat.register(p);
        return tmp_mat;
    }

    wallEval(matrix:Matrix):number {

        //Init les valeurs d'évaluation
        let max_height = matrix.descColArray[0].height;
        let dic = matrix.descColArray[0].diffIntCol; //dic = différence inter colonne c'est l'indicateur de crénelage
        let holes = matrix.descColArray[0].hole; 
        
        //Calcule des totaux
        for(let i = 1; i<matrix.descColArray.length; i++) {
            if (max_height < matrix.descColArray[i].height) max_height = matrix.descColArray[i].height;
            dic += matrix.descColArray[i].diffIntCol;
            holes += matrix.descColArray[i].hole;
        }

        let Pscore = max_height * this.genes.p_maxHeight + dic * this.genes.p_dic + holes * this.genes.p_hole;

        return Pscore;
    }
}



interface IPscore {
    i:number,
    p_score:number
}

interface MatPlay {
    matrix:Matrix,
    play:Play
}

/**
 * Type peut prendre les valeurs 0 1 2 respectivement :
 *  0 : OgP
 *  1 : RP
 *  2 : NP n'est pas censé apparaitre
 */
interface Play {
    pieceID:String, 
    destination:Position, 
    rotation:number, 
    type:number,
    p_score:number
}

interface Genes {
    p_dic:number,
    p_hole:number,
    p_maxHeight:number
}

export {AI, Genes};