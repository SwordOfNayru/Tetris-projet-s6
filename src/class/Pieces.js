class Piece {
    partern = [];
    pos = {'x':0.0, 'y':0.0 };
    constructor() {

    }
}


class O extends Piece {
    constructor() {
        super();
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

class PieceGenerator {
    static PieceArray = [I,O,T,S,Z,L,J];

    static generatePiece() {
        return new this.PieceArray[this.getRandomInt()]();
    }

    static getRandomInt() {
        return Math.floor(Math.random()*7);
    }
}