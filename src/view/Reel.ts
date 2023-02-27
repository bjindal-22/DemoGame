import gsap from "gsap";
import { Container } from "pixi.js";
import { ReelModel } from "../model/ReelModel";
import { StaticSymbol } from "./StaticSymbol";
import { SymbolBase } from "./SymbolBase";
import { SymbolFactory } from "./SymbolFactory";

export class Reel extends Container {
    /** for reel set data  */
    protected reelSet: Array<number>;
    /** for reel Id and row*/
    public reelId: number;
    public rows: number;
    protected indx: number;
    protected stops: Array<number | number[]>;
    /** for get the model data */
    protected model: ReelModel;
    protected symCollection: SymbolBase[];
    protected iconsPool: SymbolFactory;
    private symCounter: number = 0;

    constructor(reelId: number, rows: number, model: ReelModel, pool?: SymbolFactory) {
        super();
        this.name = "reel_" + reelId;
        this.reelId = reelId;
        this.rows = rows;
        this.model = model;
        this.iconsPool = pool || new SymbolFactory(model);
        this.symCollection = [];
    }

    public init(stopPos: number[]) {
        let newStopPos: number[];
        this.reelSet = this.model.getCurrentReelset()[this.reelId];

        this.indx = this.getStopIndex(stopPos[0]);
        this.indx = this.indx < 1 ? this.reelSet.length - 1 : this.indx;
        newStopPos = stopPos.concat(); //clon
        newStopPos.unshift(this.reelSet[this.indx - 1]);
        newStopPos.push(this.reelSet[this.indx - 1])
        this.setStaticReel(newStopPos as number[]);

    }

    protected getStopIndex(symbolId: number): number {
        if (!isNaN(this.model.reelStopIndex[this.reelId])) {
            return this.model.reelStopIndex[this.reelId];
        }
        return this.reelSet.indexOf(symbolId);
    }

    protected setStaticReel(reelGrid: Array<number>): void {
        let sym: SymbolBase;
        let icon: StaticSymbol;
        const numChildren: number = this.children.length;
        const stopLength: number = reelGrid.length;
        if (numChildren) {
            for (let i = 0; i < this.symCollection.length; i++) {
                this.symCollection[i].returnToPool();
            }
            this.removeChildren();
            this.symCollection.length = 0;
        }
        for (let i = 0; i < stopLength; i++) {
            this.symCollection[i] = sym = this.getSymbol(reelGrid[i]);
            sym.parent = this;
            icon = this.symCollection[i].getStatic();
            sym.y = icon.y = (i - 1) * (this.model.getSymbolHeight() + (this.model.getSymbolSpacingY() || 0));
            icon.visible = true;
            this.addChild(icon);
        }


    }

    public getSymbol(id: number) {
        return this.iconsPool.getSymbol(id);
    }

    public setStops(stopsArray: number[]) {
        let newStops: Array<number>;
        this.indx = this.model.reelStopIndex[this.reelId];
        this.indx = this.indx < 1 ? this.reelSet.length - 1 : this.indx;
        this.reelSet = this.model.getCurrentReelset()[this.reelId];
        if (Array.isArray(stopsArray)) {
            newStops = stopsArray.concat();
            // newStops.unshift(this.reelSet[this.indx-1]);
            // newStops.push(this.reelSet[this.indx-1])
            this.stops = newStops;
            this.model.setReelGrid(this.reelId, stopsArray);
            // this.setStaticReel(newStops as number[]);
            this.dropSymbols(newStops as number[]);
        }
        //this.animate();

    }

    public animate(idx: number) {
        (this.children[idx] as StaticSymbol).animate();
    }

    private resetSymbolAnims() {
        for (let i = 0; i < this.children.length; i++) {
            (this.children[i] as StaticSymbol).stopAnim();
        }
    }

    public replace(idx: number, symId: number) {
        gsap.to(this.children[idx], {
            alpha: 0, duration: 0.2, onComplete: () => {
                let old = this.children[idx];
                this.removeChild(old);
                old.alpha = 1;
                this.symCollection[idx].returnToPool();

                let sym: SymbolBase;
                this.symCollection[idx] = sym = this.getSymbol(symId);
                sym.parent = this;
                let icon = this.symCollection[idx].getStatic();
                sym.y = icon.y = old.y;
                icon.alpha = 0;
                icon.visible = true
                this.addChildAt(icon, idx);
                gsap.to(icon, { alpha: 1, duration: 0.2 });
            }
        });
    }

    public spin() {
        for (let i = 0; i < this.symCollection.length; i++) {
            this.symCollection[i].returnToPool();
        }
        this.resetSymbolAnims();
        this.removeChildren();
        this.symCollection.length = 0;
    }

    private dropSymbols(reelGrid: Array<number>): void {
        let sym: SymbolBase;
        let icon: StaticSymbol;
        const numChildren: number = this.children.length;
        const stopLength: number = reelGrid.length;
        if (numChildren) {
            for (let i = 0; i < this.symCollection.length; i++) {
                this.symCollection[i].returnToPool();
            }
            this.removeChildren();
            this.symCollection.length = 0;
        }
        for (let i = 0; i < stopLength; i++) {
            this.symCollection[i] = sym = this.getSymbol(reelGrid[i]);
            sym.parent = this;
            icon = this.symCollection[i].getStatic();
            sym.y = icon.y = (-1) * (this.model.getSymbolHeight() + (this.model.getSymbolSpacingY() || 0));
            icon.visible = false;
            this.addChild(icon);
        }

        this.symCounter = this.children.length - 1;
        this.dropAnim();
    }

    private dropAnim() {
        let targY = (this.symCounter) * (this.model.getSymbolHeight() + (this.model.getSymbolSpacingY() || 0));
        this.children[this.symCounter].visible = true;
        gsap.to(this.children[this.symCounter], { y: targY, duration: 0.2, onComplete: this.checkNext.bind(this), ease: "bounce.out" });
    }

    private checkNext() {
        this.symCounter--;
        if (this.symCounter >= 0) {
            this.dropAnim();
        }
    }

}
