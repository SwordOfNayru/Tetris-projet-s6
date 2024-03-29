var keyArray = {
    rR:"KeyE",
    rL:"KeyQ",
    dR:"ArrowRight",
    dL:"ArrowLeft",
    re:"KeyR",
    p:"ArrowDown",
}; //?Voir un fichier de configuration voir une class plus complex pour gérer les touches
/**
 * Precision sur la gestion des touches:
 * Signaux de touche
 * rR = rotation a droite
 * rL = rotation a gauche
 * dR = decalage a droite
 * dL = decalage a gauche
 * re = reserve
 * p = pause Sert maintenance pour le fastFall pour facilité l'implémentation
 * 
 * 
 * dD = decalage vers le bas
 * dF = Fast Fall
 * 
 */

//Ajout des pressages de touche
document.addEventListener("keydown", event => {
    switch(event.code) {
        case keyArray.rR:
            ipcRenderer.send("KeyDown","rR");
            break;
        case keyArray.rL:
            ipcRenderer.send("KeyDown","rL");
            break;
        case keyArray.dR:
            ipcRenderer.send("KeyDown","dR");
            break;
        case keyArray.dL:
            ipcRenderer.send("KeyDown","dL");
            break;
        case keyArray.re:
            ipcRenderer.send("KeyDown","re");
            break;
        case keyArray.p:
            ipcRenderer.send("KeyDown","p");
            break;
    }
});

document.addEventListener("keyup", event => {
    switch(event.code) {
        case keyArray.rR:
            ipcRenderer.send("KeyUp","rR");
            break;
        case keyArray.rL:
            ipcRenderer.send("KeyUp","rL");
            break;
        case keyArray.dR:
            ipcRenderer.send("KeyUp","dR");
            break;
        case keyArray.dL:
            ipcRenderer.send("KeyUp","dL");
            break;
        case keyArray.re:
            ipcRenderer.send("KeyUp","re");
            break;
        case keyArray.p:
            ipcRenderer.send("KeyUp","p");
            break;
    }
});
