/// <reference path="../phaser.d.ts"/>

import "phaser";
import { MainScene } from "./main";

var game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.WEBGL
} as GameConfig);

game.scene.add("main", MainScene, true);