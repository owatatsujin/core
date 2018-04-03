export class Data {
    private map: { [key: string]: string | number } = {};
    private notes: NoteData[][] = [];

    constructor(str: string) {
        str.replace(/\r?\n/g, '').split('&').forEach(tmp => {
            var i = tmp.indexOf('=');
            var key = tmp.slice(0, i);
            var val = tmp.slice(i + 1);
            if (val != '' && isFinite(val)) {
                this.map[key] = parseFloat(val);
            } else {
                this.map[key] = val;
            }
        });
        if (this.map.BPM != undefined) {
            this.setBpm(this.map.BPM as number);
        }
        for (var i = 0; i < 4; i++) {
            var seq = this.map['seq' + (i + 1)] as string;
            if (seq != undefined) {
                this.notes[i] = this.parseSeq(seq);
            }
        }
        console.log(this.notes)
    }

    private setBpm(bpm: number): number {
        this.map.BPM = bpm;
        var measure = 240 / bpm;
        for (var x = 8; x <= 64; x += 8) {
            this.map['u' + x] = measure / x;
        }
        return this.map.unit_time = this.map.u16 as number;
    }

    private parseSeq(seq: string): NoteData[] {
        var data: NoteData[] = [];
        var time = this.map.start_time as number;
        var unitTime = this.map.unit_time as number;
        var chars = seq.split('');
        var getArg = () => {
            var tmp = '';
            for (chars.shift(); chars[0] != ')'; tmp += chars.shift());
            chars.shift();
            return isFinite(tmp) ? parseFloat(tmp) : this.map[tmp] as number;
        };
        var c: string;
        while (c = chars.shift()) {
            switch (c) {
                case ',': time += unitTime; break;
                case '[': unitTime /= 1.5; break;
                case ']': unitTime *= 1.5; break;
                case '1': case "3": data.push(new NoteData(time, 1)); break;
                case '2': case "4": data.push(new NoteData(time, 2)); break;
                case 'm': unitTime = this.setBpm(getArg()); break;
                case 'x': /*TODO*/ getArg(); break;
            }
        }
        return data;
    }
}

class NoteData {
    constructor(public time: number, public type: number) { }
}