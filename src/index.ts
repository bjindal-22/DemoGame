import { Application } from "pixi.js";
import { GameController } from "./controller/GameController";
import { AssetLoader } from "./Loader";
import { ServerModel } from "./model/ServerModel";
import { Parser } from "./Parser";
import { GameView } from "./view/GameView";

let isPaused: boolean = false;
let view: GameView;

var filesToLoad = [
    { name: "symbols", url: "symbols.json" },
];

let gameWidth: number = 1920;
let gameHeight: number = 1080;
let availHeight: number = Number(window.innerHeight);
let availWidth: number = Number(window.innerWidth);
let scale: number;

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    width: gameWidth, height: gameHeight, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
    autoDensity: true
});
let cont: any = document.getElementById("pixi-content");
cont.appendChild(app.view);

new AssetLoader(filesToLoad, app);
document.addEventListener("assetsloaded", onLoaded);

function resize() {
    const canvas = app.renderer.view;
    const w = cont.clientWidth;
    const h = cont.clientHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;
    view.resize(update());
    app.renderer.resize(w, h);
}
window.onresize = function () {
    resize();
};

function onLoaded() {
    let sm = new ServerModel();
    new Parser(sm);
    view = new GameView(app, sm.getReelSymSet());
    new GameController(view, sm);
    view.resize(update());
    app.stage.interactive = true;
    app.stage.hitArea = app.renderer.screen;

    app.ticker.add(function () {
        if (!isPaused) {
            app.renderer.render(app.stage);
        }
    });

}

function update() {
    availHeight = Number(window.innerHeight);
    availWidth = Number(window.innerWidth);
    return {
        availHeight: availHeight,
        availWidth: availWidth,
        width: Number(window.outerWidth),
        height: Number(window.outerHeight),
        gameWidth: gameWidth,
        gameHeight: gameHeight,
        devicePixelRatio: devicePixelRatio,
        scale: getScale() || 1
    };
}

function getScale() {
    if (!gameHeight || !gameWidth) {
        return 1;
    }
    availHeight = Number(window.innerHeight);
    availWidth = Number(window.innerWidth);
    scale = Math.min((availHeight / gameHeight), (availWidth / gameWidth));
    return scale;
}






