class Piece {
    partern: Array<Array<Array<boolean>>>; //L'ensemble des paternes d'une piece ==> this.partern[rotation][ligne][colonne]
    pos:Position = {x:3.0, y:23.0 }; //Soit le coin superieur haut gauche
                               // on définis 2 position la position réel soit la position analogique de la pièce
                               // et la position absolue celle d'une case de la matrice.
                               // pour définir l'emplacement d'affichage : 
                               //    Absolue ==> Réel ==> Affichage
    rotation:number = 0; //La rotation va de 0 a 3. 0 est la position initial 3 celle après 3 rotation vers la droite
    color: string = "FFFFFF"; //Couleur de la piece
    blocked:number = 0;
    id:string;
    constructor() {
        this.partern =[];
        this.id = "P" + Date.now().toString() + Math.floor(Math.random()*10000);
    }
    //TODO Corriger les paternes des pièce S et Z
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

    /**
     * @returns Renvoie la postion individuel des blocs en position réèl
     */
    getPosBlock():Array<Position> {
        let bloc = [];
        for (let iRow = 0; iRow < 4; iRow++) {
            for (let iCol = 0; iCol < 4; iCol++) {
                if(this.partern[this.rotation][iRow][iCol]) {
                    bloc.push({
                        x: (this.pos.x + iCol),
                        y: (this.pos.y - iRow),
                    });
                }  
            }
        }
        return bloc;
    }

    modPos(x:number,y:number) {
        this.pos.x += x;
        this.pos.y += y;
    }

    print():string {
        var str = "id : "+this.id+"</br>Pos  = x : " + this.pos.x + " y : " + this.pos.y + "</br>";
        str += "blocked : " + this.blocked + "</br>";
        this.partern[this.rotation].forEach(row => {
            row.forEach(col => {
                if(col) {
                    str += "[x] ";
                }
                else {
                    str += "[ ] ";
                }
            });
            str += "</br>";
        });
        return str;
    }

    copy():Piece {
        var piece = new Piece();
        piece.id = this.id;
        piece.partern = this.partern;
        piece.color = this.color;
        piece.pos = {x:this.pos.x, y:this.pos.y};
        piece.rotation = this.rotation;
        piece.blocked = this.blocked;

        return piece;
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
                [false,true,false,false],
                [true,true,false,false],
                [true,false,false,false],
                [false,false,false,false]
            ],
            [
                [false,false,false,false],
                [true,true,false,false],
                [false,true,false,false],
                [false,false,false,false]
            ],
            [
                [false,true,false,false],
                [true,true,false,false],
                [true,false,false,false],
                [false,false,false,false]
            ]
        ];
    }
}

//Class pour encapsuler la génération de piece pour eviter les problèmes de dépendance.
//TODO génération seeder ou par tableau de piece
class PieceGenerator {
    static PieceArray = [I,O,T,S,Z,L,J]; //On y stock les descriptions de class

    static generatePiece() {
        return new this.PieceArray[this.getRandomInt()]();
    }

    static getRandomInt() {
        return Math.floor(Math.random()*7);
    }
}

interface Position {
    x:number;
    y:number;
}

export {Piece,O,I,L,J,Z,S,T};
export {Position};
export {PieceGenerator};