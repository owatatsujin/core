/// <reference path='../phaser.d.ts'/>

import 'phaser';
import queryString from 'query-string';
import urlJoin from 'url-join';
import Music from './music';
import { MainScene } from './main';
import DebugScene from './debug';

class Owatatsujin {

    private game: Phaser.Game;

    constructor(music: Music) {

        this.game = new Phaser.Game({
            width: 1136,
            height: 640,
            type: Phaser.WEBGL
        } as GameConfig);


        this.game.scene.add('main', MainScene, false);
        this.game.scene.add('debug', DebugScene, true);
        this.game.scene.start("main", Object.assign({
            bgm: "./bgm.mp3",
            data: "./data.mp3"
        }, music));
    }
}


// テスト用譜面データ
let bgm = "https://cdn.rawgit.com/owatatsujin/core/5c38d90c/docs/bgm.a10a4f6f.mp3";
let data = "https://cdn.rawgit.com/owatatsujin/core/5c38d90c/docs/data.c237335e.txt";

// クエリパラメータに src があったら読み込み先を変える
const { src } = queryString.parse(location.search);
if (src) {
    bgm = urlJoin(src, 'bgm.mp3');
    data = urlJoin(src, 'data.txt');
}

new Owatatsujin({ bgm, data });