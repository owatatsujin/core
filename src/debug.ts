/// <reference path='./.d.ts'/>
/// <reference path='../phaser.d.ts'/>

import 'phaser';
import queryString from 'query-string';
import debugButonPath from './assets/debug.png';

export class DebugScene extends Phaser.Scene {

    preload(): void {
        this.load.image('debugButon', debugButonPath);
    }

    create(): void {

        const button = this.add.sprite(1136 - 120 / 2 - 20, 90 / 2 + 20, 'debugButon');

        button.setInteractive();
        button.on('pointerdown', () => {

            const src = window.prompt('外部オワタツの URL を入力してください');

            // クエリパラメータに src を追加してリロード
            if (src) {
                location.search = queryString.stringify({ src });
            }
        });
    }
}

export default DebugScene;