class Player {
    keys:Keys;
    //Redondance des touches
    repeatTimeDirectionMax:number;
    repeatTimeDirection:number;
    repeatTimeRotationMax:number;
    repeatTimeRotation:number;

    //Exchange
    
    constructor() {
        this.keys = {
            rR:false,
            rL:false,
            dR:false,
            dL:false,
            re:false,
            p:false
        }
        this.repeatTimeDirectionMax = 500;
        this.repeatTimeDirection = this.repeatTimeDirectionMax;

        this.repeatTimeRotationMax = 500;
        this.repeatTimeRotation = this.repeatTimeDirectionMax;

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
                this.repeatTimeRotation = this.repeatTimeRotationMax;
                break;
            case "rL":
                this.keys.rL = false;
                this.repeatTimeRotation = this.repeatTimeRotationMax;
                break;
            case "dR":
                this.keys.dR = false;
                this.repeatTimeDirection = this.repeatTimeDirectionMax;
                break;
            case "dL":
                this.keys.dL = false;
                this.repeatTimeDirection = this.repeatTimeDirectionMax;
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
        if(this.keys.dL || this.keys.dR) {
            this.repeatTimeDirection += progress;
            if(this.repeatTimeDirection>this.repeatTimeDirectionMax) {
                this.repeatTimeDirection = 0;
                if(this.keys.dL)
                    return "L";
                if(this.keys.dR)
                    return "R";
            }
        }
        return "None";
    }

    isRotate(progress:number):string {
        if(this.keys.rL || this.keys.rR) {
            this.repeatTimeRotation += progress;
            if(this.repeatTimeRotation>this.repeatTimeRotationMax) {
                this.repeatTimeRotation = 0;
                if(this.keys.rL)
                    return "L";
                if(this.keys.rR)
                    return "R";
            }
        }
        return "None";
    }

    isExchange() {
        return this.keys.re;
    }

    isFastFall() {
        return this.keys.p;
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