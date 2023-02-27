import { GameEvents } from "./common/GameEvents";
import { IWinData } from "./model/IWinData";
import { ServerModel } from "./model/ServerModel";

export class Parser {
    private serverModel: ServerModel;

    private stops: number[];
    private grid: number[][];
    private winningsData: IWinData[];
    private allWinPos: string[] = [];

    constructor(serverModel: ServerModel) {
        this.serverModel = serverModel;
        document.addEventListener("placebet", this.onPlaceBet.bind(this));
        document.addEventListener("generatenewsymbols", this.generateNewWins.bind(this));
    }

    private onPlaceBet() {
        this.serverModel.resetData();
        this.stops = [];
        this.allWinPos = [];
        for (let i = 0; i < this.serverModel.getReelSets().length; i++) {
            this.stops.push(Math.floor(Math.random() * this.serverModel.getReelSets()[i].length));
        }
        //this.stops= [0,0,0,0,0];
        this.serverModel.setStops(this.stops);
        console.log("stops " + this.stops);
        this.grid = [];
        for (let i = 0; i < this.stops.length; i++) {
            let grd: number[] = [];
            let stop = this.stops[i];
            for (let j = 0; j < this.serverModel.getRows(); j++) {
                stop = stop < this.serverModel.getReelSets()[i].length ? stop : 0;
                let symbolId = this.serverModel.getSymbolMapping().indexOf(this.serverModel.getReelSets()[i][stop]);
                (symbolId >= 0) ? grd.push(symbolId) : grd.push(0);
                stop++;
            }
            this.grid.push(grd);
        }
        this.checkWins();
        document.dispatchEvent(GameEvents.PLACE_BET_PARSED);

    }

    private checkWins() {
        this.serverModel.setReelGrid(this.grid);
        this.winningsData = this.calculateWinning();
        let pos: number[][] = [];
        for (let i = 0; i < this.allWinPos.length; i++) {
            let r = Math.floor(Number(this.allWinPos[i]) / this.serverModel.getCols());
            let c = Number(this.allWinPos[i]) % this.serverModel.getCols();
            pos.push([r, c]);
        }
        this.serverModel.setAllWinPos(pos);
        this.serverModel.setWinData(this.winningsData);
        if (this.winningsData.length > 0) {
            this.serverModel.setHasWin(true);
        }
    }

    private calculateWinning() {
        let symbolList = [];
        let totalWin: number = 0;
        for (var i = 0; i < this.grid.length; i++) {
            for (var j in this.grid[i]) {
                const symbol = Number(this.grid[i][j]);
                symbolList.push(symbol);
            }
        }
        symbolList = symbolList.filter((v, i, a) => a.indexOf(v) === i);
        let winnings: IWinData[] = [];
        for (var s in symbolList) {
            const symbol = symbolList[s];
            let winSymbolOffsets: any = [];
            let currentSymbolOffsets = [];
            let flag = false;
            for (var col = 0; col < this.grid.length; col++) {
                for (var row = 0; row < this.grid[col].length; row++) {
                    let currentSymbol = Number(this.grid[col][row]);
                    if (currentSymbol == symbol) {
                        if (col == 0) {
                            currentSymbolOffsets.push('n,' + ((row * this.grid.length) + col));
                        } else {
                            for (var o in winSymbolOffsets) {
                                let offset = winSymbolOffsets[o];

                                offset = offset + ',' + ((row * this.grid.length) + col);
                                currentSymbolOffsets.push(offset);
                            }
                        }
                        flag = true;
                    }
                }
                if (flag) {
                    winSymbolOffsets = [];
                    winSymbolOffsets = winSymbolOffsets.concat(currentSymbolOffsets);
                    currentSymbolOffsets = [];
                    flag = false;
                }
                else {
                    break;
                }
            }
            const symbolWinning = this.detectWaysWins(symbol, winSymbolOffsets);
            if (symbolWinning.length > 0) {
                winnings = winnings.concat(symbolWinning);
                let win: number = 0;
                symbolWinning.forEach(sw => {
                    win = win + sw.payout;
                    sw.offsets.forEach(offset => {
                        this.allWinPos = this.allWinPos.concat(
                            offset.filter((item: string) =>
                                this.allWinPos.indexOf(item) < 0
                            ));
                    })
                });
                totalWin += win;
            }
        }
        this.serverModel.setTotalWin(totalWin);
        return winnings;
    }

    private detectWaysWins(symbol: any, winSymbolOffsets: any[]): IWinData[] {
        let symbolWinnings: any[] = [];
        let symbolOffset = [];
        let symbolWin = 0;

        for (var o in winSymbolOffsets) {
            const offset = winSymbolOffsets[o];

            let offsetList = offset.split(",").splice(1, offset.split(",").length);
            const payout = this.serverModel.getPaytable()[symbol][offsetList.length];
            if (payout > 0) {

                symbolOffset.push(offsetList);
                symbolWin += payout;

            }
        }
        if (symbolWin > 0) {
            symbolWin = symbolWin;
            symbolWinnings.push(
                {
                    'symbol': symbol,
                    'payline': -1,
                    'count': 0,
                    'offsets': symbolOffset,
                    'payout': symbolWin
                });
        }

        return symbolWinnings;
    }

    private generateNewWins() {
        this.replaceSymbols();
    }

    private replaceSymbols() {
        this.serverModel.setPosToReplace(this.serverModel.getAllWinPos().concat());
        for (let i = 0; i < this.serverModel.getAllWinPos().length; i++) {
            this.grid[this.serverModel.getAllWinPos()[i][1]][this.serverModel.getAllWinPos()[i][0]] = Math.floor(Math.random() * this.serverModel.getSymbolMapping().length);
        }
        this.serverModel.resetData();
        this.allWinPos = [];
        this.checkWins();
        document.dispatchEvent(GameEvents.SHOW_NEW_SYMBOLS);
    }
}
