export class ReelModel {
    public json: any = {
        "x": 420,
        "y": 100,
        "w": 1280,
        "h": 768,
        "symbolSpacingY": 3,
        "symPerReel": 3,
        "spacing": 5,
        "symbolCount": 8,
        "symWidth": 200,
        "symHeight": 200,
        "offsetX": 0,
        "offsetY": 0,
        "symbolData": [{
            "width": 256,
            "height": 256,
            "symName": "hv1",
            "symNum": 0,
            "frame": "H1.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "hv2",
            "symNum": 1,
            "frame": "H2.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "hv3",
            "symNum": 2,
            "frame": "H4.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "hv4",
            "symNum": 3,
            "frame": "H5.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "lv1",
            "symNum": 4,
            "frame": "K.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "lv2",
            "symNum": 5,
            "frame": "Q.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "lv3",
            "symNum": 6,
            "frame": "J.png",
            "image": "symbols",
        },
        {
            "width": 256,
            "height": 256,
            "symName": "lv4",
            "symNum": 7,
            "frame": "10.png",
            "image": "symbols",
        }
        ]
    };

    public numReels: number = 5;
    public totalSymbols: number = 8;
    protected reelIndx: number[] = [];
    protected reelsets: number[][][];
    protected reelset: number[][];
    protected stopPosition: Array<any>;
    protected reelGrd: Array<Array<number>> = [];

    public getSymbolHeight(): number {
        return this.json.symHeight;
    }

    public getSymbolWidth(): number {
        return this.json.symWidth;
    }

    public getSymbolSpacingY(): number {
        return this.json.symbolSpacingY;
    }

    public set reelStopIndex(value: number[]) {
        this.reelIndx = value;
    }

    public get reelStopIndex(): number[] {
        return this.reelIndx;
    }

    public getCurrentReelset(): number[][] {
        return this.reelset;
    }

    public numDisplaySymbols(i: number): number {
        if (Array.isArray(this.json.symPerReel)) {
            return this.json.symPerReel[i];
        }
        return this.json.symPerReel;
    }

    public set reelStops(value: Array<any>) {
        this.stopPosition = value;
    }

    public setReelGrid(id: number, value: Array<number>) {
        this.reelGrd[id] = value;
    }

    public setReelsets(value: number[][][], startSet?: number) {
        this.reelsets = value;
        this.reelset = value[startSet || 0];
    }

    public setReelset(set: number) {
        this.reelset = this.reelsets[set];
    }

    public getReelset(set: number): number[][] {
        if (set) {
            return this.reelsets[set];
        } else {
            return this.getCurrentReelset();
        }
    }

}
