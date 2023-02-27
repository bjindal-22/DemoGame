import { GameEvents } from "../common/GameEvents";
import { ServerModel } from "../model/ServerModel";
import { GameView } from "../view/GameView";

export class GameController {
    private view: GameView;
    private serverModel: ServerModel;
    //@ts-ignore
    private timer: any;

    constructor(view: GameView, serverModel: ServerModel) {
        this.view = view;
        this.serverModel = serverModel;
        document.addEventListener("spin", this.onSpin.bind(this));
        document.addEventListener("placebetparsed", this.OnResponse.bind(this));
        document.addEventListener("shownewsymbols", this.OnShowNewSymbols.bind(this));
    }

    private onSpin() {
        this.view.getReelsContainer().spin();
        document.dispatchEvent(GameEvents.PLACE_BET);
    }

    private OnResponse(): void {
        this.checkWins();
        this.view.getReelsContainer().setReelStodIndex(this.serverModel.getStops());
        this.view.getReelsContainer().stop(this.serverModel.getReelGrid());

    }

    private OnShowNewSymbols(): void {
        this.view.hideWinText();
        let pos: number[][] = this.serverModel.getPosToReplace();
        this.view.getReelsContainer().replacePos(pos, this.serverModel.getReelGrid());
        this.checkWins();
    }

    private checkWins() {
        if (this.serverModel.getHasWin()) {
            this.timer = setTimeout(() => {
                this.showWins();
            }, 3000);
        } else {
            this.view.SetSpinEnable(true);
        }
    }

    private showWins() {
        this.view.showWinText(this.serverModel.getTotalWin());
        this.timer = setTimeout(() => {
            // this.view.SetSpinEnable(true);
            document.dispatchEvent(GameEvents.GENERATE_NEW_SYMBOLS);
        }, 2000);
        let wins: number[][] = this.serverModel.getAllWinPos();
        this.view.getReelsContainer().showWins(wins);
    }

}