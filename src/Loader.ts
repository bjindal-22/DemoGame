import { Application, Text, Loader, TextStyle } from "pixi.js";
import { GameEvents } from "./common/GameEvents";
import { IResource } from "./IResource";

export class AssetLoader {

    private loader: Loader;
    private resources: IResource[];
    private textField: Text;
    private game: Application;

    constructor(res: any[], app: Application) {
        this.resources = res;
        this.loader = app.loader;
        this.game = app;
        this.loader.onProgress.add(this.handleLoadProgress.bind(this));
        this.loader.onError.add(this.handleLoadError.bind(this));
        this.loader.onComplete.add(this.handleLoadComplete.bind(this));
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#ffffff'],
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        this.textField = new Text('', style);
        this.textField.x = 600;
        this.textField.y = 250;

        app.stage.addChild(this.textField);

        this.loadAssets();
    }

    private loadAssets(): void {
        this.resources.forEach(res => {
            this.loader.add(res.name, res.url);
        });
        this.loader.load();
    }

    private handleLoadProgress(loaderInst: Loader) {
        console.log("percentage " + loaderInst.progress);
        this.textField.text = loaderInst.progress.toString() + " %";
    }

    private handleLoadError() { }

    private handleLoadComplete() {
        document.dispatchEvent(GameEvents.ASSETS_LOADED);
        this.textField.text = "";
        this.game.stage.removeChild(this.textField);
    }


}
