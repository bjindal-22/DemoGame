import { IWinData } from "./IWinData";

export class ServerModel {

    private rowsNum: number = 3;
    private reelsCount: number = 5;

    private reelSets: string[][] = [
        ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
        ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
        ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
        ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
        ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"]
    ];
    private symbolMapping: string[] = ["hv1", "hv2", "hv3", "hv4", "lv1", "lv2", "lv3", "lv4"];

    private paylines: number[][] = [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [2, 2, 2, 2, 2], [0, 0, 1, 2, 2], [2, 2, 1, 0, 0], [0, 1, 2, 1, 0], [2, 1, 0, 1, 2]];

    private paytable: number[][] = [[0, 0, 0, 10, 20, 50], [0, 0, 0, 5, 10, 20], [0, 0, 0, 5, 10, 15], [0, 0, 0, 5, 10, 15], [0, 0, 0, 2, 5, 10], [0, 0, 0, 1, 2, 5], [0, 0, 0, 1, 2, 3], [0, 0, 0, 1, 2, 3]];

    private stops: number[];
    private grid: number[][];
    private hasWin: boolean = false;
    private winningsData: IWinData[];
    private totalWin: number = 0;
    private allWinPos: number[][];
    private replacePos: number[][];
    private reelSymSets: number[][][] = [];

    constructor() {
        this.reelSymSets[0] = [];
        for (let i = 0; i < this.reelSets.length; i++) {
            this.reelSymSets[0][i] = [];
            for (let j = 0; j < this.reelSets[i].length; j++) {
                let idx = this.symbolMapping.indexOf(this.reelSets[i][j]);
                if (idx > -1) {
                    this.reelSymSets[0][i][j] = idx;
                }
            }
        }

    }

    public getHasWin(): boolean {
        return this.hasWin;
    }

    public setHasWin(val: boolean): void {
        this.hasWin = val
    }

    public setReelGrid(grid: number[][]) {
        this.grid = grid;
    }

    public getReelGrid(): number[][] {
        return this.grid;
    }

    public getPaytable() {
        return this.paytable;
    }

    public getPaylines() {
        return this.paylines;
    }

    public getSymbolMapping() {
        return this.symbolMapping;
    }
    public getReelSets() {
        return this.reelSets;
    }

    public setStops(stops: number[]) {
        this.stops = stops;
    }

    public getStops(): number[] {
        return this.stops;
    }

    public setWinData(winData: IWinData[]) {
        this.winningsData = winData;
    }

    public getWinData(): IWinData[] {
        return this.winningsData;
    }

    public getRows(): number {
        return this.rowsNum;
    }

    public getCols(): number {
        return this.reelsCount;
    }

    public setTotalWin(val: number) {
        this.totalWin = val;
    }

    public getTotalWin(): number {
        return this.totalWin;
    }

    public resetData() {
        this.hasWin = false;
        this.winningsData = [];
        this.stops = [];
        this.totalWin = 0;
        this.stops = [];
    }

    public setAllWinPos(val: number[][]) {
        this.allWinPos = val;
    }

    public getAllWinPos(): number[][] {
        return this.allWinPos;
    }

    public getReelSymSet(): number[][][] {
        return this.reelSymSets;
    }

    public setPosToReplace(val: number[][]) {
        this.replacePos = val;
    }

    public getPosToReplace(): number[][] {
        return this.replacePos;
    }

}