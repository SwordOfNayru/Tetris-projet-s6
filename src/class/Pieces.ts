

class Piece {
    partern = []; //L'ensemble des paternes d'une piece ==> this.partern[rotation][ligne][colonne]
    pos = {'x':0.0, 'y':0.0 }; //Soit le coin superieur haut gauche
                               // on définis 2 position la position réel soit la position analogique de la pièce
                               // et la position absolue celle d'une case de la matrice.
                               // pour définir l'emplacement d'affichage : 
                               //    Absolue ==> Réel ==> Affichage
    rotation = 0; //La rotation va de 0 a 3. 0 est la position initial 3 celle après 3 rotation vers la droite
    color = "FFFFFF"; //Couleur de la piece
    
    constructor() {

    }

    //Les fonction turn permet de changer le parterne de rotation il ne verifie par si la rotation est possible.
    turnPieceRight() {
        if(this.rotation == 3) {
            this.rotation = 0;
        }
        else {
            this.rotation++;
        }
        return this.rotation;
    }
    turnPieceLeft() {
        if(this.rotation == 0) {
            this.rotation = 3;
        }
        else {
            this.rotation--;
        }
        return this.rotation;
    }

    getPosBlock() { //Renvoie la postion individuel des blocs en position réèl
        let bloc = [];
        for (let iRow = 0; iRow < 4; iRow++) {
            for (let iCol = 0; iCol < 4; iCol++) {
                if(this.partern[this.rotation][iRow][iCol]) {
                    bloc.push({
                        'x': (this.pos['x'] + iCol),
                        'y': (this.pos['y'] + iRow),
                    });
                }  
            }
        }
        return bloc;
    }

    modPos(x,y) {
        this.pos["x"] = x;
        this.pos["y"] = y;
    }

    printCMD(){
        console.log("Pos  = x : " + this.pos['x'] + " y : " + this.pos['y']);
        var str = "";
        this.partern[this.rotation].forEach(row => {
            row.forEach(col => {
                if(col) {
                    str += "[x] ";
                }
                else {
                    str += "[ ] ";
                }
            });
            var str = "\n";
        });
        console.log(str);
    }

}


class O extends Piece {
    constructor() {
        super();
        this.color = "FFEC00";
        this.partern = [
            [
                [false,false,false,false],
                [false,true,true,false],
                [false,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,true,true,false],
                [false,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,true,true,false],
                [false,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,true,true,false],
                [false,true,true,false],
                [false,false,false,false]
            ]
        ];

    }
}

class I extends Piece {
    constructor() {
        super();
        this.color = "009EE2";
        this.partern = [
            [
                [false,false,false,false],
                [false,false,false,false],
                [true,true,true,true],
                [false,false,false,false]
            ],
            [
                [false,false,true,false],
                [false,false,true,false],
                [false,false,true,false],
                [false,false,true,false]
            ],
            [
                [false,false,false,false],
                [false,false,false,false],
                [true,true,true,true],
                [false,false,false,false]
            ],
            [
                [false,false,true,false],
                [false,false,true,false],
                [false,false,true,false],
                [false,false,true,false]
            ]
        ];
    }
}

class T extends Piece {
    constructor() {
        super();
        this.color ="662482";
        this.partern = [
            [
                [false,false,false,false],
                [true,true,true,false],
                [false,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,true,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,true,false,false],
                [true,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,true,false,false],
                [false,true,true,false],
                [false,true,false,false],
                [false,false,false,false]
            ]
        ];
    }
}

class L extends Piece {
    constructor() {
        super();
        this.color = "F29100";
        this.partern = [
            [
                [false,false,false,false],
                [true,true,true,false],
                [true,false,false,false],
                [false,false,false,false]
            ],
            [
                [true,true,false,false],
                [false,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,false,true,false],
                [true,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,true,false,false],
                [false,true,false,false],
                [false,true,true,false],
                [false,false,false,false]
            ]
        ];
    }
}

class J extends Piece {
    constructor() {
        super();
        this.color = "312782";
        this.partern = [
            [
                [false,false,false,false],
                [true,true,true,false],
                [false,false,true,false],
                [false,false,false,false]
            ],
            [
                [false,true,false,false],
                [false,true,false,false],
                [true,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [true,false,false,false],
                [true,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,true,true,false],
                [false,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ]
        ];
    }
}

class S extends Piece {
    constructor() {
        super();
        this.color = "009540";
        this.partern = [
            [
                [false,false,false,false],
                [false,true,true,false],
                [true,true,false,false],
                [false,false,false,false]
            ],
            [
                [true,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,true,true,false],
                [true,true,false,false],
                [false,false,false,false]
            ],
            [
                [true,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ]
        ];
    }
}

class Z extends Piece {
    constructor() {
        super();
        this.color = "E20613"
        this.partern = [
            [
                [false,false,false,false],
                [true,true,false,false],
                [false,true,true,false],
                [false,false,false,false]
            ],
            [
                [false,false,true,false],
                [false,true,true,false],
                [false,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [false,true,true,false],
                [true,true,false,false],
                [false,false,false,false]
            ],
            [
                [true,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ]
        ];
    }
}

//Class pour encapsuler la génération de piece pour eviter les problèmes de dépendance.
class PieceGenerator {
    static PieceArray = [I,O,T,S,Z,L,J]; //On y stock les descriptions de class

    static generatePiece() {
        return new this.PieceArray[this.getRandomInt()]();
    }

    static getRandomInt() {
        return Math.floor(Math.random()*7);
    }
}

export {Piece};
export {PieceGenerator};