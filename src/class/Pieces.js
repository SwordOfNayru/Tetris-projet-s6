"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PieceGenerator = exports.Piece = void 0;
var Piece = /** @class */ (function () {
    function Piece() {
        this.partern = []; //L'ensemble des paternes d'une piece ==> this.partern[rotation][ligne][colonne]
        this.pos = { 'x': 0.0, 'y': 0.0 }; //Soit le coin superieur haut gauche
        // on définis 2 position la position réel soit la position analogique de la pièce
        // et la position absolue celle d'une case de la matrice.
        // pour définir l'emplacement d'affichage : 
        //    Absolue ==> Réel ==> Affichage
        this.rotation = 0; //La rotation va de 0 a 3. 0 est la position initial 3 celle après 3 rotation vers la droite
        this.color = "FFFFFF"; //Couleur de la piece
    }
    //Les fonction turn permet de changer le parterne de rotation il ne verifie par si la rotation est possible.
    Piece.prototype.turnPieceRight = function () {
        if (this.rotation == 3) {
            this.rotation = 0;
        }
        else {
            this.rotation++;
        }
        return this.rotation;
    };
    Piece.prototype.turnPieceLeft = function () {
        if (this.rotation == 0) {
            this.rotation = 3;
        }
        else {
            this.rotation--;
        }
        return this.rotation;
    };
    Piece.prototype.getPosBlock = function () {
        var bloc = [];
        for (var iRow = 0; iRow < 4; iRow++) {
            for (var iCol = 0; iCol < 4; iCol++) {
                if (this.partern[this.rotation][iRow][iCol]) {
                    bloc.push({
                        'x': (this.pos['x'] + iCol),
                        'y': (this.pos['y'] + iRow)
                    });
                }
            }
        }
        return bloc;
    };
    Piece.prototype.modPos = function (x, y) {
        this.pos["x"] = x;
        this.pos["y"] = y;
    };
    Piece.prototype.printCMD = function () {
        console.log("Pos  = x : " + this.pos['x'] + " y : " + this.pos['y']);
        var str = "";
        this.partern[this.rotation].forEach(function (row) {
            row.forEach(function (col) {
                if (col) {
                    str += "[x] ";
                }
                else {
                    str += "[ ] ";
                }
            });
            var str = "\n";
        });
        console.log(str);
    };
    return Piece;
}());
exports.Piece = Piece;
var O = /** @class */ (function (_super) {
    __extends(O, _super);
    function O() {
        var _this = _super.call(this) || this;
        _this.color = "FFEC00";
        _this.partern = [
            [
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, true, true, false],
                [false, true, true, false],
                [false, false, false, false]
            ]
        ];
        return _this;
    }
    return O;
}(Piece));
var I = /** @class */ (function (_super) {
    __extends(I, _super);
    function I() {
        var _this = _super.call(this) || this;
        _this.color = "009EE2";
        _this.partern = [
            [
                [false, false, false, false],
                [false, false, false, false],
                [true, true, true, true],
                [false, false, false, false]
            ],
            [
                [false, false, true, false],
                [false, false, true, false],
                [false, false, true, false],
                [false, false, true, false]
            ],
            [
                [false, false, false, false],
                [false, false, false, false],
                [true, true, true, true],
                [false, false, false, false]
            ],
            [
                [false, false, true, false],
                [false, false, true, false],
                [false, false, true, false],
                [false, false, true, false]
            ]
        ];
        return _this;
    }
    return I;
}(Piece));
var T = /** @class */ (function (_super) {
    __extends(T, _super);
    function T() {
        var _this = _super.call(this) || this;
        _this.color = "662482";
        _this.partern = [
            [
                [false, false, false, false],
                [true, true, true, false],
                [false, true, false, false],
                [false, false, false, false]
            ],
            [
                [false, true, false, false],
                [true, true, false, false],
                [false, true, false, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, true, false, false],
                [true, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, true, false, false],
                [false, true, true, false],
                [false, true, false, false],
                [false, false, false, false]
            ]
        ];
        return _this;
    }
    return T;
}(Piece));
var L = /** @class */ (function (_super) {
    __extends(L, _super);
    function L() {
        var _this = _super.call(this) || this;
        _this.color = "F29100";
        _this.partern = [
            [
                [false, false, false, false],
                [true, true, true, false],
                [true, false, false, false],
                [false, false, false, false]
            ],
            [
                [true, true, false, false],
                [false, true, false, false],
                [false, true, false, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, false, true, false],
                [true, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, true, false, false],
                [false, true, false, false],
                [false, true, true, false],
                [false, false, false, false]
            ]
        ];
        return _this;
    }
    return L;
}(Piece));
var J = /** @class */ (function (_super) {
    __extends(J, _super);
    function J() {
        var _this = _super.call(this) || this;
        _this.color = "312782";
        _this.partern = [
            [
                [false, false, false, false],
                [true, true, true, false],
                [false, false, true, false],
                [false, false, false, false]
            ],
            [
                [false, true, false, false],
                [false, true, false, false],
                [true, true, false, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [true, false, false, false],
                [true, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, true, true, false],
                [false, true, false, false],
                [false, true, false, false],
                [false, false, false, false]
            ]
        ];
        return _this;
    }
    return J;
}(Piece));
var S = /** @class */ (function (_super) {
    __extends(S, _super);
    function S() {
        var _this = _super.call(this) || this;
        _this.color = "009540";
        _this.partern = [
            [
                [false, false, false, false],
                [false, true, true, false],
                [true, true, false, false],
                [false, false, false, false]
            ],
            [
                [true, false, false, false],
                [true, true, false, false],
                [false, true, false, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, true, true, false],
                [true, true, false, false],
                [false, false, false, false]
            ],
            [
                [true, false, false, false],
                [true, true, false, false],
                [false, true, false, false],
                [false, false, false, false]
            ]
        ];
        return _this;
    }
    return S;
}(Piece));
var Z = /** @class */ (function (_super) {
    __extends(Z, _super);
    function Z() {
        var _this = _super.call(this) || this;
        _this.color = "E20613";
        _this.partern = [
            [
                [false, false, false, false],
                [true, true, false, false],
                [false, true, true, false],
                [false, false, false, false]
            ],
            [
                [false, false, true, false],
                [false, true, true, false],
                [false, true, false, false],
                [false, false, false, false]
            ],
            [
                [false, false, false, false],
                [false, true, true, false],
                [true, true, false, false],
                [false, false, false, false]
            ],
            [
                [true, false, false, false],
                [true, true, false, false],
                [false, true, false, false],
                [false, false, false, false]
            ]
        ];
        return _this;
    }
    return Z;
}(Piece));
//Class pour encapsuler la génération de piece pour eviter les problèmes de dépendance.
var PieceGenerator = /** @class */ (function () {
    function PieceGenerator() {
    }
    PieceGenerator.generatePiece = function () {
        return new this.PieceArray[this.getRandomInt()]();
    };
    PieceGenerator.getRandomInt = function () {
        return Math.floor(Math.random() * 7);
    };
    PieceGenerator.PieceArray = [I, O, T, S, Z, L, J]; //On y stock les descriptions de class
    return PieceGenerator;
}());
exports.PieceGenerator = PieceGenerator;
