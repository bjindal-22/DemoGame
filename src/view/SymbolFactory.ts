import { ReelModel } from "../model/ReelModel";
import { ISymbolData } from "./ISymbolData";
import { SymbolBase } from "./SymbolBase";

export class SymbolFactory {
    private iconPos: Array<number>;
    private iconArray: Array<Array<SymbolBase>>;
    private model: ReelModel;
    private noInitPool: boolean = false;
    private poolMultiplier: number = 2;
    private noPool: boolean = false;

    constructor(model: ReelModel) {
        this.model = model;
        this.iconArray = [];
        this.iconPos = [];
        !this.noInitPool && this.createIcons(model);
    }

    private createIcons(model: ReelModel): void {
        let i: number;
        let j: number;
        const col: number = this.model.numReels * this.poolMultiplier;
        for (i = 0; i < this.model.totalSymbols; i++) {
            let symArray: Array<SymbolBase> = [];

            if (Array.isArray(model.json.symbolData)) {
                let symData: ISymbolData = model.json.symbolData[i];
                for (j = 0; j < col; j++) {
                    symArray.push(new SymbolBase(symData, i));
                }
            } else {
                for (j = 0; j < col; j++) {
                    symArray.push(new SymbolBase(model.json.symbolData, i));
                }
            }
            this.iconPos[i] = 0;
            this.iconArray[i] = symArray;
        }
    }

    public getSymbol(id: number): SymbolBase {
        this.model.json.startId && (id -= this.model.json.startId);
        this.iconPos[id] = 0;
        let icon: SymbolBase | undefined;
        if (!this.noInitPool) {
            let staticParent: boolean;
            do {
                icon = this.iconArray[id][this.iconPos[id]];
                if (icon) {
                    staticParent = !!icon.getStatic().parent;
                    this.iconPos[id]++;
                } else {
                    staticParent = false;
                }
            } while (staticParent);
        }
        if (typeof icon === "undefined") {
            if (Array.isArray(this.model.json.symbolData)) {
                icon = new SymbolBase(this.model.json.symbolData[id], id);
            } else {
                icon = new SymbolBase(this.model.json.symbolData, id);
            }
            if (!this.noPool) {
                this.iconArray[id].push(icon);
                this.iconPos[id]++;
            }
        }
        return icon;
    }
}
