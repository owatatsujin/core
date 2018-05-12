import Phaser from 'phaser';
import { MainScene } from './main';

enum JudgeType {
    Ryo,
    Ka,
    Fuka
};

class Judge {
    public type: JudgeType;
    public name: string;
    public time: number;
    public color: string;
    constructor(type: JudgeType, name: string, time: number, color: string) {
        this.type = type;
        this.name = name;
        this.time = time;
        this.color = color;
    }

    /**
     * 判定結果を表示する
     * @param scene 対象シーン
     */
    public show(scene: Phaser.Scene) {

        const text = scene.add.text(392, 150, this.name, {
            color: this.color,
            fontFamily: 'sans-serif',
            fontSize: 50,
            stroke: '#000',
            strokeThickness: 4
        });

        text.x -= text.width / 2;
        scene.tweens.add({
            targets: text,
            y: '-=30',
            duration: 200,
            completeDelay: 300,
            onComplete() {
                text.destroy();
            }
        });
    }
}

const judges: Judge[] = [
    new Judge(JudgeType.Ryo, '良', 0.035, '#ffcc00'),
    new Judge(JudgeType.Ka, '可', 0.12, '#ffffff'),
    new Judge(JudgeType.Fuka, '不可', 0.16, '#0064a0')
];

export { judges, JudgeType };