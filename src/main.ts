/// <reference path="../phaser.d.ts"/>
import "phaser";
import { Data } from "./data";

export class MainScene extends Phaser.Scene {
    private data: Data;
    private notes: NoteData[];
    private bgm: Phaser.Sound.BaseSound;

    preload(): void {
        this.load.text("data", "data.txt");
        this.load.audio("bgm", "bgm.mp3", null, null);
        this.load.audio("dong", "dong.mp3", null, null);
        this.load.audio("ka", "ka.mp3", null, null);
    }

    create(): void {
        this.data = new Data(this.cache.text.get("data"));
        this.notes = this.data.getNotes(4);
        this.bgm = this.sound.add("bgm");
        this.bgm.play();
    }

    update(): void {
        console.log(this.bgm.seek);
        if(this.notes[0].time <= this.bgm.seek + 0.22) {
            this.sound.play(this.notes[0].type == 1 ? 'dong' : 'ka');
            this.notes.shift();
        }
    }
}
