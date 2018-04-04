/// <reference path='../phaser.d.ts'/>

import 'phaser';
import { MainScene } from './main';

const game = new Phaser.Game({
    width: 1136,
    height: 640,
    type: Phaser.WEBGL
} as GameConfig);

game.scene.add('main', MainScene, true);