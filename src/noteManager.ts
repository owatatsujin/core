/// <reference path='../phaser.d.ts'/>

import { Note } from "./note";
import { InputManager } from './inputManager';

export class NoteManager {
    private inputManager: InputManager;
    private displayNotes: Note[] = [];
    private judgeTimes: number[] = [0.16, 0.035, -0.035, -0.12, -0.2];

    private combo: number = 0;
    private comboText: Phaser.GameObjects.Text;
    private zureText: Phaser.GameObjects.Text;

    constructor(private scene: Phaser.Scene, private waitingNotes: Note[]) {
        this.inputManager = new InputManager(scene.input);
        for(let i = waitingNotes.length - 1; i >= 0; i--) {
            waitingNotes[i].createSprite(scene);
        }
        waitingNotes.sort((a, b) => a.showTime - b.showTime);

        this.comboText = scene.add.text(259, 214, "", {
            color: 'black'
        });
        this.zureText = scene.add.text(380, 290, "", {
            color: 'black'
        })
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
                this.judge(i, time);
            }
        }

        for(let i = 0; i < this.displayNotes.length; ) {
            this.displayNotes[i].update(time);
            if(this.displayNotes[i].time + this.judgeTimes[0] < time) {
                this.displayNotes.splice(i, 1)[0].sprite.destroy();
                this.combo = 0;
                this.comboText.setText("");
            } else {
                i++;
            }
        }
    }

    private judge(type: number, time: number): void {
        if(this.displayNotes.length == 0) {
            return;
        }
        const note = this.displayNotes[0];
        if(note.time + this.judgeTimes[4] > time) {
            return;
        }
        if((note.type - type) % 2 == 0) {
            return;
        }
        this.displayNotes.shift().sprite.destroy();
        this.combo++;
        this.comboText.setText(this.combo.toString());

        const zure = Math.floor((note.time - time) * 1000);
        this.zureText.style.color = zure >= 0 ? 'red' : 'blue';
        this.zureText.setText((zure > 0 ? '+' : '') + zure);
    }
}

