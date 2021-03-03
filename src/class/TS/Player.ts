class Player {
    keys:Keys;
    repeatTimeMax:number;
    repeatTime:number;
    constructor() {
        this.keys = {
            rR:false,
            rL:false,
            dR:false,
            dL:false,
            re:false,
            p:false
        }
        this.repeatTimeMax = 500;
        this.repeatTime = this.repeatTimeMax+1;
    }
    
    keyDown(key:string) {
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
        switch(key) {
            case "rR":
                this.keys.rR = false;
                break;
            case "rL":
                this.keys.rL = false;
                break;
            case "dR":
                this.keys.dR = false;
                this.repeatTime = this.repeatTimeMax;
                break;
            case "dL":
                this.keys.dL = false;
                this.repeatTime = this.repeatTimeMax;
                break;
            case "re":
                this.keys.re = false;
                break;
            case "p":
                this.keys.p = false;
                break;
        }
    }

    isMoving(progress:number):string {
        console.log(this.repeatTime);
        if(this.keys.dL || this.keys.dR) {
            this.repeatTime += progress;
            if(this.repeatTime>this.repeatTimeMax) {
                this.repeatTime = 0;
                if(this.keys.dL)
                    return "L";
                if(this.keys.dR)
                    return "R";
            }
        }
        return "None";
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