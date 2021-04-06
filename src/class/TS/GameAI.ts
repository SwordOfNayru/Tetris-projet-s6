import { RandomTable } from "./randomTable";
import { AI, Genes } from "./AI";
import { Game } from "./Game";

class GameAI extends Game {
    player:AI
    constructor(id:number, rng:RandomTable, genes:Genes, genes_shifting:Genes = {p_dic:0,p_hole:0,p_maxHeight:0}) {
        super(id,rng)
        this.player = new AI(genes, genes_shifting);
    }


    /**
     * 
     * @param timestamp Temps à l'appel de la boucle
     */
    loop(timestamp: number) {
        this.player.update(this.matrix, this.onGoingPiece, this.reservePiece, this.nextPiece);
        super.loop(timestamp);
    }
}

export { GameAI };