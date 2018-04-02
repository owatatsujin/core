/// <reference path="../phaser.d.ts"/>
import "phaser";

export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;
  
    preload(): void {
      this.load.image("logo", "https://avatars1.githubusercontent.com/u/38001038?s=400&u=3d2b8655cdb52443b6ecefca664c83863d4336c8&v=4");
    }
  
    create(): void {
      this.phaserSprite = this.add.sprite(400, 300, "logo");
    }

    update(): void {
        this.phaserSprite.x++;
    }
}