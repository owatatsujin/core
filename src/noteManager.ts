/// <reference path='../phaser.d.ts'/>

import { Note } from "./note";
import { InputManager } from './inputManager';

export class NoteManager {
    private inputManager: InputManager;
    private displayNotes: Note[] = [];
    private judgeTimes: number[] = [0.16, 0.035, -0.035, -0.12, -0.2];

    constructor(private scene: Phaser.Scene, private waitingNotes: Note[]) {
        this.inputManager = new InputManager(scene.input);
        for(let i = waitingNotes.length - 1; i >= 0; i--) {
            waitingNotes[i].createSprite(scene);
        }
        waitingNotes.sort((a, b) => a.showTime - b.showTime);
    }

    public update(time: number): void {
        while(this.waitingNotes.length > 0 && time > this.waitingNotes[0].showTime) {
            const note = this.waitingNotes.shift();
            note.sprite.visible = true;
            this.displayNotes.push(note);
            this.displayNotes.sort((a, b) => a.time - b.time);
        }
        
        const inputs = this.inputManager.get();
        for(let i = 0; i < 4; i++) {
            if(inputs[i]) {
                this.scene.sound.play(['dong', 'ka'][i % 2]);
            }
        }

        for(let i = 0; i < this.displayNotes.length; ) {
            this.displayNotes[i].update(time);
            if(this.displayNotes[i].time + this.judgeTimes[0] < time) {
                this.displayNotes.splice(i, 1)[0].sprite.destroy();
            } else {
                i++;
            }
        }
    }
}

