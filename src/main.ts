/// <reference path="../phaser.d.ts"/>
import "phaser";
import { Data, NoteData } from "./data";

import notesPath from "./assets/notes.png";
import dataPath from "./assets/data.txt";
import bgmPath from "./assets/bgm.mp3";
import dongPath from "./assets/dong.mp3";
import kaPath from "./assets/ka.mp3";

export class MainScene extends Phaser.Scene {
    private data_: Data;
    private notes: Note[];
    private bgm: Phaser.Sound.BaseSound;

    preload(): void {
        this.load.image("notes", notesPath);
        this.load.text("data", dataPath);
        this.load.audio("bgm", bgmPath, null);
        this.load.audio("dong", dongPath, null);
        this.load.audio("ka", kaPath, null);
    }

    create(): void {
        var tex = this.textures.get("notes");
        for (var i = 1; i <= 4; i++) {
            tex.add(i, 0, 48 * i, 0, 48, 48);
        }

        this.data_ = new Data(this.cache.text.get("data"));
        this.notes = this.data_.getNotes(4).map(data => new Note(this, data));
        this.bgm = this.sound.add("bgm");
        this.bgm.play();
    }

    update(): void {
        var time = this.bgm.seek + 0.22;
        this.notes.forEach(note => note.update(time));
    }
}

class Note {
    public isActive = true;
    public sprite: Phaser.GameObjects.Sprite;

    constructor(private scene: Phaser.Scene, public data: NoteData) {
        this.sprite = scene.add.sprite(0, 30, "notes", data.type);
    }

    public update(time: number): void {
        if (!this.isActive) {
            return;
        }
        var diff = this.data.time - time;
        this.sprite.x = 30 + diff * 500;
        if (diff <= 0) {
            this.isActive = false;
            this.sprite.x = -100;
            this.scene.sound.play(this.data.type % 2 == 1 ? 'dong' : 'ka');
        }
    }
}
