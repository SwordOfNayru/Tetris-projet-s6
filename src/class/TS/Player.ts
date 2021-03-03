class Player {
    keys:Keys;
    constructor() {
        this.keys = {
            rR:false,
            rL:false,
            dR:false,
            dL:false,
            re:false,
            p:false
        }
    }
    
    keyDown(key:string) {
        console.log(this.keys);
        switch(key) {
            case "rR":
                this.keys.rR = true;
                break;
            case "rL":
                this.keys.rL = true;
                break;
            case "dR":
                this.keys.dR = true;
                break;
            case "dL":
                this.keys.dL = true;
                break;
            case "re":
                this.keys.re = true;
                break;
            case "p":
                this.keys.p = true;
                break;
        }
    }

    keyUp(key:string) {
        console.log(this.keys);
        switch(key) {
            case "rR":
                this.keys.rR = false;
                break;
            case "rL":
                this.keys.rL = false;
                break;
            case "dR":
                this.keys.dR = false;
                break;
            case "dL":
                this.keys.dL = false;
                break;
            case "re":
                this.keys.re = false;
                break;
            case "p":
                this.keys.p = false;
                break;
        }
    }
}

//?fast fall
interface Keys {
    rR:boolean,
    rL:boolean,
    dR:boolean,
    dL:boolean,
    re:boolean,
    p:boolean
}

interface KeyConfig {
    rR:string,
    rL:string,
    dR:string,
    dL:string,
    re:string,
    p:string
}

export {Player, KeyConfig};