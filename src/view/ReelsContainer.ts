import { Container, Graphics } from "pixi.js";
import { ReelModel } from "../model/ReelModel";
import { Reel } from "./Reel";
import { SymbolFactory } from "./SymbolFactory";

export class ReelsContainer extends Container {

    private reels: Reel[];
    private model: ReelModel;
    //@ts-ignore
    private json: any;

    constructor(model: ReelModel) {
        super();
        this.model = model;
        this.json = model.json;
        this.reels = [];
        this.createReels();
        this.x = this.model.json.x;
        this.y = this.model.json.y;
    }

    private createReels() {
        const symbolPool: SymbolFactory = new SymbolFactory(this.model);
        for (let i = 0; i < this.model.numReels; i++) {
            this.reels.push(new Reel(i, this.model.numDisplaySymbols(i), this.model, symbolPool));
            this.reels[i].y = 0;
            this.reels[i].x = (i) * (this.model.getSymbolWidth() + (2));
            this.addChild(this.reels[i]);
        }
        const mask = this.createMaskWithPadding(1010, 610, 1);
        this.mask = mask;
        this.addChild(mask);
    }

    private createMaskWithPadding(
        width: number,
        height: number,
        padding: number,
    ): Graphics {
        const mask = new Graphics();
        mask.beginFill(0xFFFFFF);
        mask.drawRect(
            padding,
            padding,
            width - padding * 2,
            height - padding * 2,
        );
        mask.endFill();
        return mask;
    }

    public init(stopPos: any) {
        let reelLen = this.reels.length;
        for (let i = 0; i < reelLen; i++) {
            this.reels[i].init(stopPos[i]);
        }
    }

    public stop(stops: any) {
        this.model.reelStops = stops;
        for (let i = 0; i < this.reels.length; i++) {
            setTimeout(() => {
                this.reels[i].setStops(stops[i]);
            }, 300 * (i + 1));
        }
    }

    public setReelStodIndex(indexes: number[]) {
        this.model.reelStopIndex = indexes;
    }

    public getReels(): Reel[] {
        return this.reels;
    }

    public spin() {
        for (let i = 0; i < this.reels.length; i++) {
            this.reels[i].spin();
        }
    }

    public showWins(wins: number[][]) {
        for (let i = 0; i < wins.length; i++) {
            this.reels[wins[i][1]].animate(wins[i][0]);
        }
    }

    public replacePos(pos: number[][], grid: number[][]) {
        for (let i = 0; i < pos.length; i++) {
            this.reels[pos[i][1]].replace(pos[i][0], grid[pos[i][1]][pos[i][0]]);
        }
    }
}
