/// <reference path='../phaser.d.ts'/>
import 'phaser';

export class InputManager {
    private prev: boolean[] = new Array(4);
    private now: boolean[] = new Array(4);
    private keys: Phaser.Input.Keyboard.Key[] = [];

    constructor(private input: Phaser.Input.InputPlugin) {
        const KeyCode = Phaser.Input.Keyboard.KeyCodes;
        [KeyCode.F, KeyCode.D, KeyCode.J, KeyCode.K].forEach(c => {
            this.keys.push(input.keyboard.addKey(c));
        });
    }

    public get(): boolean[] {
        for(let i = 0; i < 4; i++) {
            this.now[i] = !this.prev[i] && this.keys[i].isDown;
            this.prev[i] = this.keys[i].isDown;
        }
        const pointer = this.input.activePointer;
        if(pointer.justDown) {
            const x = pointer.x - 568;
            const y = pointer.y - 590;
            const leftOrRight = x < 0 ? 0 : 2;
            const donOrKa = x * x + y * y < 250 * 250 ? 0 : 1;
            this.now[leftOrRight + donOrKa] = true;
        }
        return this.now;
    }
}
