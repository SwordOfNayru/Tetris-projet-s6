"use strict";
var ipcRenderer = require('electron').ipcRenderer; //Ouverture de la communication
var keyArray = {
    rR: "KeyQ",
    rL: "KeyE",
    dR: "ArrowRight",
    dL: "ArrowLeft",
    re: "KeyR",
    p: "KeyP",
}; //?Voir un fichier de configuration voir une class plus complex pour gérer les touches
/**
 * Precision sur la gestion des touches:
 * Signaux de touche
 * rR = rotation a droite
 * rL = rotation a gauche
 * dR = decalage a droite
 * dL = decalage a gauche
 * re = reserve
 * p = pause
 *
 * ?implementer le fast fall
 * dD = decalage vers le bas
 * dF = Fast Fall
 *
 */
//Ajout des pressages de touche
document.addEventListener("keydown", function (event) {
    switch (event.code) {
        case keyArray.rR:
            ipcRenderer.send("KeyDown", "rR");
            break;
        case keyArray.rL:
            ipcRenderer.send("KeyDown", "rL");
            break;
        case keyArray.dR:
            ipcRenderer.send("KeyDown", "dR");
            break;
        case keyArray.dL:
            ipcRenderer.send("KeyDown", "dL");
            break;
        case keyArray.re:
            ipcRenderer.send("KeyDown", "re");
            break;
        case keyArray.p:
            ipcRenderer.send("KeyDown", "p");
            break;
    }
});
document.addEventListener("keyup", function (event) {
    switch (event.code) {
        case keyArray.rR:
            ipcRenderer.send("KeyUp", "rR");
            break;
        case keyArray.rL:
            ipcRenderer.send("KeyUp", "rL");
            break;
        case keyArray.dR:
            ipcRenderer.send("KeyUp", "dR");
            break;
        case keyArray.dL:
            ipcRenderer.send("KeyUp", "dL");
            break;
        case keyArray.re:
            ipcRenderer.send("KeyUp", "re");
            break;
        case keyArray.p:
            ipcRenderer.send("KeyUp", "p");
            break;
    }
});
