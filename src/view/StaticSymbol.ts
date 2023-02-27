import gsap from "gsap";
import { Sprite, Texture } from "pixi.js";
import { ISymbolData } from "./ISymbolData";

export class StaticSymbol extends Sprite {
    protected json: ISymbolData;
    protected num: number;
    private tl: any;

    constructor(id: number, json: ISymbolData, frame?: string, name?: string) {
        super(Texture.from(frame as string));
        this.json = json;
        this.init(json, name);
        //this.setPosterFrame(json);
        this.num = id;

    }

    protected init(json: ISymbolData, name?: string): void {
        if (name) {
            this.name = name;
        }
        json.scale && this.scale.set(json.scale);
        json.scaleX && json.scaleY && this.scale.set(json.scaleX, json.scaleY);
        this.anchor.set(json.anchorX || 0, json.anchorY || 0);
        (json.regX || json.regY) && this.pivot.set(json.regX || 0, json.regY || 0);
    }

    public animate(delay: number = 0) {
        this.anchor.set(0.5, 0.5);
        this.position.x = this.position.x + 100;
        this.position.y = this.position.y + 100;
        this.tl = gsap.timeline({ onComplete: this.stopAnim.bind(this) })
            .to(this.scale, 0.5, {
                x: 1.3,
                y: 1.3,
                delay
            })
            .to(this, 0.25, {
                rotation: Math.PI / 6,
                delay
            }, 0)
            .to(this, 0.25, {
                rotation: -Math.PI / 6,
                delay
            }, 0.25)
            .to(this, 0.25, {
                rotation: 0,
                delay
            }, 0.5)
            .to(this.scale, 0.5, {
                x: 1,
                y: 1,
            }, 0.5)


    }

    public stopAnim() {
        this.tl && this.tl.kill();
        this.anchor.set(0, 0);
        this.position.x = this.position.x - this.width / 2;
        this.position.y = this.position.y - this.height / 2;
    }

}