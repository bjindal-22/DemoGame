import { Application, Container, Sprite, Text, TextStyle } from "pixi.js";
import { GameEvents } from "../common/GameEvents";
import { ReelModel } from "../model/ReelModel";
import { ReelsContainer } from "./ReelsContainer";

export class GameView extends Container {
    private reelContainer: ReelsContainer;
    private model: ReelModel;
    private spin: Sprite;
    private winText: Text;
    private timer: ReturnType<typeof setTimeout>;

    constructor(game: Application, reelSet: number[][][]) {
        super();
        this.model = new ReelModel();
        this.model.setReelsets(reelSet);
        this.reelContainer = new ReelsContainer(this.model);
        this.reelContainer.init([[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]])
        this.addChild(this.reelContainer);
        this.createSpinButton();
        this.CreateWinText();
        game.stage.addChild(this);
    }

    public resize(e: any) {
        var _a = e, scale = _a.scale, gameWidth = _a.gameWidth, gameHeight = _a.gameHeight, availWidth = _a.availWidth, availHeight = _a.availHeight;
        this.pivot.set(gameWidth * 0.5, gameHeight * 0.5);
        this.x = availWidth * 0.5;
        this.y = availHeight * 0.5;
        this.scale.set(scale);
    }

    private createSpinButton() {
        //this can be created by a button class which takes configs from json
        this.spin = Sprite.from('spin_button.png');
        this.spin.y = 795;
        this.spin.x = 832;
        this.spin.scale.set(0.7, 0.7);
        this.SetSpinEnable(true);
        this.spin.on('pointerdown', this.OnSpin.bind(this));
        this.addChild(this.spin);
    }

    public SetSpinEnable(val: boolean) {
        this.spin.interactive = val;
        this.spin.buttonMode = val;
    }

    private OnSpin() {
        clearInterval(this.timer);
        this.hideWinText();
        this.SetSpinEnable(false);
        console.log("spin");
        document.dispatchEvent(GameEvents.SPIN);
    }

    private CreateWinText() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 35,
            fill: '#000000',
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
            align: 'center'
        });

        this.winText = new Text('', style);
        this.winText.x = 830;
        this.winText.y = 980;
        this.addChild(this.winText);
    }

    public showWinText(val: number) {
        this.winText.text = "Total Wins: " + val;
    }

    public hideWinText() {
        this.winText.text = "";
    }

    public getReelsContainer(): ReelsContainer {
        return this.reelContainer;
    }

}
