/// <reference path='../phaser.d.ts'/>

import { Note } from "./note";
import { InputManager } from './inputManager';
import { judges, JudgeType } from './judge';

export class NoteManager {
    private inputManager: InputManager;
    private displayNotes: Note[] = [];

    private combo: number = 0;
    private comboText: Phaser.GameObjects.Text;
    private zureText: Phaser.GameObjects.Text;

    // 判定結果
    private judgeResults: JudgeType[] = [];

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

    /**
     * 判定結果を受け取り関連処理を行う
     * @param type 判定結果
     */
    private judgeResult(type: JudgeType) {

        this.judgeResults.push(type);

        console.log(judges[type].name);

        if (type === JudgeType.Fuka) {
            this.combo = 0;
            this.comboText.setText('');
        }
        else {
            this.combo++;
            this.comboText.setText(this.combo.toString());
        }
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
            // ノーツが押されなかった場合 ( 不可判定 )
            if(this.displayNotes[i].time + judges[JudgeType.Ka].time < time) {
                this.displayNotes.splice(i, 1)[0].sprite.destroy();
                this.judgeResult(JudgeType.Fuka);
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

        // 判定外
        if(time + judges[JudgeType.Fuka].time < note.time) {
            return;
        }
        if((note.type - type) % 2 == 0) {
            return;
        }
        // 判定結果
        var judge = judges.find(judge => Math.abs(note.time - time) <= judge.time);
        this.displayNotes.shift().sprite.destroy();
        this.judgeResult(judge.type);

        const zure = Math.floor((note.time - time) * 1000);
        this.zureText.style.color = zure >= 0 ? 'red' : 'blue';
        this.zureText.setText((zure > 0 ? '+' : '') + zure);
    }
}

