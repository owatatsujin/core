export class Note {
    public showTime: number;
    public isActive = true;
    public sprite: Phaser.GameObjects.Sprite;

    constructor(
        public time: number,
        public scrollTime: number,
        public type: NoteType
    ) {
        this.showTime = time - scrollTime * 4;
    }

    public createSprite(scene: Phaser.Scene): void {
        this.sprite = scene.add.sprite(0, 222, 'notes', this.type);
        this.sprite.setScale(2);
        this.sprite.visible = false;
    }

    public update(time: number): void {
        const diff = this.time - time;
        this.sprite.x = 394 + diff * 180 / this.scrollTime;
    }
}

enum NoteType {
    Don = 1,
    Ka = 2,
    BigDon = 3,
    BigKa = 4,
    Renda = 5,
    BigRenda = 6,
    Baloon = 7,
}