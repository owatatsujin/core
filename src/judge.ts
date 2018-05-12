import Phaser from 'phaser';

enum JudgeType {
    Ryo,
    Ka,
    Fuka
};

class Judge {
    public type: JudgeType;
    public name: string;
    public time: number;
    constructor(type: JudgeType, name: string, time: number) {
        this.type = type;
        this.name = name;
        this.time = time;
    }
}

const judges: Judge[] = [
    new Judge(JudgeType.Ryo, '良', 0.035),
    new Judge(JudgeType.Ka, '可', 0.12),
    new Judge(JudgeType.Fuka, '不可', 0.16)
];

export { judges, JudgeType };