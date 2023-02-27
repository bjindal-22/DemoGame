import { Container } from "pixi.js";
import { ISymbolData } from "./ISymbolData";
import { StaticSymbol } from "./StaticSymbol";

export class SymbolBase {
    public json: ISymbolData;
    /** Symbol ID */
    public symNum: number;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public name: string;
    public parent: Container | null;
    protected staticSym: StaticSymbol;
    protected frame: string;

    constructor(json: ISymbolData, id?: number) {
        this.symNum = typeof id === "number" ? id : json.symNum;
        this.json = json;
        this.init(json);
    }

    protected init(json: ISymbolData): void {
        this.x = json.x ? json.x : 0;
        this.y = json.y ? json.y : 0;
        json.width && (json.width);
        json.height && (this.height = json.height);
        this.name = (json.symName) ? json.symName : this.name = `Symbol_${this.symNum}`;
        this.parent = null;
        this.frame = json.frame as string;
        this.createStatic(json);
    }

    protected createStatic(json: ISymbolData): void {
        this.staticSym = new StaticSymbol(this.symNum, json, this.frame, this.name);
    }

    public getStatic(): StaticSymbol {
        return this.staticSym;
    }

    public returnToPool() {
        this.parent = null;
        this.staticSym && this.staticSym.parent && this.staticSym.parent.removeChild(this.staticSym);
    }
}
