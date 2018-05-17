/// <reference path='./.d.ts'/>
/// <reference path='../phaser.d.ts'/>
import 'phaser';
import Music from './music';
import { Data } from './data';
import { NoteManager } from './noteManager';

import bgPath from './assets/bg.jpg';
import notesPath from './assets/notes.png';
import dongPath from './assets/dong.mp3';
import kaPath from './assets/ka.mp3';

export class MainScene extends Phaser.Scene {
    private dataObj: Data;
    private bgm: Phaser.Sound.BaseSound;
    private noteManager: NoteManager;

    private music: Music;

    init(music: Music): void {
        this.music = music;
    }

    preload(): void {
        this.load.crossOrigin = 'anonymous';
        this.load.image('bg', bgPath);
        this.load.image('notes', notesPath);
        this.load.text('data', this.music.data);
        this.load.audio('bgm', this.music.bgm, null);
        this.load.audio('dong', dongPath, null);
        this.load.audio('ka', kaPath, null);
    }

    create(): void {
        this.add.image(568, 320, 'bg');
        const tex = this.textures.get('notes');
        for(let i = 1; i <= 4; i++) {
            tex.add(i, 0, 48 * i, 0, 48, 48);
        }

        this.dataObj = new Data(this.cache.text.get('data'));
        const notes = this.dataObj.getNotes(4);
        this.noteManager = new NoteManager(this, notes);
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
        this.noteManager.update(time);
    }
}