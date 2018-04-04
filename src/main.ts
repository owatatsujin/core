/// <reference path='./.d.ts'/>
/// <reference path='../phaser.d.ts'/>
import 'phaser';
import { Data, NoteData } from './data';
import { Input } from './input';

import bgPath from './assets/bg.jpg';
import notesPath from './assets/notes.png';
import dataPath from './assets/data.txt';
import bgmPath from './assets/bgm.mp3';
import dongPath from './assets/dong.mp3';
import kaPath from './assets/ka.mp3';

export class MainScene extends Phaser.Scene {
    private dataObj: Data;
    private notes: Note[] = [];
    private bgm: Phaser.Sound.BaseSound;
    private inputManager: Input;

    preload(): void {
        this.load.image('bg', bgPath);
        this.load.image('notes', notesPath);
        this.load.text('data', dataPath);
        this.load.audio('bgm', bgmPath, null);
        this.load.audio('dong', dongPath, null);
        this.load.audio('ka', kaPath, null);
        this.inputManager = new Input(this.input);
    }

    create(): void {
        this.add.image(568, 320, 'bg');
        const tex = this.textures.get('notes');
        for(let i = 1; i <= 4; i++) {
            tex.add(i, 0, 48 * i, 0, 48, 48);
        }

        this.dataObj = new Data(this.cache.text.get('data'));
        const noteDatas = this.dataObj.getNotes(4);
        for(let i = noteDatas.length - 1; i >= 0; i--) {
            this.notes.push(new Note(this, noteDatas[i]));
        }
        this.bgm = this.sound.add('bgm');
    }

    update(): void {
        if(!this.bgm.isPlaying) {
            if(this.input.activePointer.isDown) {
                this.bgm.play();
            } else {
                return;
            }
        }
        const time = this.bgm.seek + 0.22;
        this.notes.forEach(note => note.update(time));
        const inputs = this.inputManager.get();
        for(let i = 0; i < 4; i++) {
            if(inputs[i]) {
                this.sound.play(['dong', 'ka'][i % 2]);
            }
        }
    }
}

class Note {
    public isActive = true;
    public sprite: Phaser.GameObjects.Sprite;

    constructor(private scene: Phaser.Scene, public data: NoteData) {
        this.sprite = scene.add.sprite(0, 222, 'notes', data.type);
        this.sprite.setScale(2);
    }

    public update(time: number): void {
        if(!this.isActive) {
            return;
        }
        const diff = this.data.time - time;
        this.sprite.x = 394 + diff * 700;
        if(diff <= 0) {
            this.isActive = false;
            this.sprite.x = -100;
        }
    }
}
