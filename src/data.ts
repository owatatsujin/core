import { Note } from "./note";

export class Data {
    private map: { [key: string]: string | number } = {};

    constructor(str: string) {
        str.replace(/\r?\n/g, '').split('&').forEach(tmp => {
            const i = tmp.indexOf('=');
            const key = tmp.slice(0, i);
            const val = tmp.slice(i + 1);

            // 数値判定
            if (/^[+,-]?([1-9]\d*|0)(\.\d+)?$/.test(val.trim())) {
                this.map[key] = parseFloat(val);
            } else {
                this.map[key] = val;
            }
        });
        if(this.map.BPM != undefined) {
            this.setBpm(this.map.BPM as number);
        }
    }

    private setBpm(bpm: number): number[] {
        this.map.BPM = bpm;
        const measure = 240 / bpm;
        for(let x = 8; x <= 64; x += 8) {
            this.map['u' + x] = measure / x;
        }
        return [
            this.map.unit_time = this.map.u16 as number,
            this.map.scroll_time = this.map.u16 as number * 3.4
        ];
    }

    public getNotes(difficulty: number): Note[] {
        const seq = this.map['seq' + difficulty] as string;
        if(seq == undefined) {
            return null;
        }
        const data: Note[] = [];
        let time = this.map.start_time as number;
        let unitTime = this.map.unit_time as number;
        let scrollTime = this.map.scroll_time as number;
        const chars = seq.split('');
        const getArg = () => {
            let tmp = '';
            for (chars.shift(); chars[0] != ')'; tmp += chars.shift());
            chars.shift();
            const num = parseFloat(tmp);
            return isFinite(num) ? num : this.map[tmp] as number;
        };
        let c: string;
        while(c = chars.shift()) {
            switch(c) {
                case ',': time += unitTime; break;
                case '[': unitTime /= 1.5; break;
                case ']': unitTime *= 1.5; break;
                case '1':
                case '2':
                case '3':
                case '4': data.push(new Note(time, scrollTime, parseInt(c))); break;
                case 'm': [unitTime, scrollTime] = this.setBpm(getArg()); break;
                case 'x': scrollTime /= getArg(); break;
            }
        }
        return data;
    }
}