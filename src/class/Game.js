"use strict";
exports.__esModule = true;
var Pieces_1 = require("./Pieces");
var Display_1 = require("./Display");
var Player_1 = require("./Player");
var Matrix_1 = require("./Matrix");
//Equivalent de la class système. 
//
//Avoir le jeu encapsuler dans une class permet d'en lancé plusieurs.
//TODO : Doit pouvoir fonctionner sans interface graphique.
var Game = /** @class */ (function () {
    function Game(canvas) {
        //Data toutes les variables lié aux données
        this.matrix = new Matrix_1.Matrix(10, 20);
        this.pieceOnGoing = null;
        this.nextPiece = Pieces_1.PieceGenerator.generatePiece();
        this.reservePiece = Pieces_1.PieceGenerator.generatePiece();
        this.lastUpdate = Date.now(); //Permet d'avoir le temps de la dernière update
        this.end = true; //tant que true le jeu continue
        this.pause = true;
        //Physique toute les variable lié à la physique du jeu
        this.gravity = 0.1; //Valeurs de distance parcouru par la pièces après une seconde.
        //Affichage
        this.display = new Display_1.Display(canvas);
        //Recupération des contrôles joueurs
        this.player = new Player_1.Player();
    }
    Game.prototype.loop = function (timestamp) {
        var _this = this;
        var progress = timestamp - this.lastUpdate;
        this.update(progress);
        this.display.printCMDMatrix(this.matrix, this.pieceOnGoing, this.nextPiece, this.reservePiece);
        this.lastUpdate = timestamp;
        window.requestAnimationFrame(function () { return _this.loop(Date.now); });
    };
    Game.prototype.update = function (progress) {
        console.log("update");
        if (!this.pause) {
            console.log(this.pieceOnGoing);
            if (this.pieceOnGoing === null) {
                this.pushNextPiece();
            }
        }
    };
    Game.prototype.start = function () {
        var _this = this;
        window.requestAnimationFrame(function (t) { return _this.loop(t); });
    };
    Game.prototype.pushNextPiece = function () {
        this.pieceOnGoing = this.reservePiece;
        this.reservePiece = Pieces_1.PieceGenerator.generatePiece();
        this.pieceOnGoing.modPos(4.0, 0.0);
    };
    Game.prototype.shortUnPause = function () {
        this.pause = false;
        this.pause = true;
    };
    return Game;
}());
