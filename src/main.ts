/// <reference path="../phaser.d.ts"/>
import "phaser";
import { Data } from "./data";

export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;
    private data: Data;

    preload(): void {
      this.load.text("data", "data.txt");
      this.load.image("logo", "https://avatars1.githubusercontent.com/u/38001038?s=400&u=3d2b8655cdb52443b6ecefca664c83863d4336c8&v=4");
    }

    create(): void {
      this.phaserSprite = this.add.sprite(400, 300, "logo");
      this.data = new Data(this.cache.text.get("data"));
    }

    update(): void {
        this.phaserSprite.x++;
    }
}
