export default class Tape {
    constructor(nTracks = 1, blankElem = "B") {
        this.tracks = [];
        this.blankElem = blankElem;
        this.head = 0;
        for (let i = 0; i < nTracks; i++) {
            this.tracks.push([]);
        }
    }
    get(track = 0) {
        if (!this.tracks[track])
            throw "No such track";
        return this.tracks[track][this.head] ?? this.blankElem;
    }
    getAll() {
        let values = [];
        for (const track of this.tracks) {
            values.push(track[this.head] ?? this.blankElem);
        }
        return values;
    }
    put(value, track = 0) {
        if (!this.tracks[track])
            throw "No such track";
        if (value == undefined || value == this.blankElem) {
            this.tracks[track][this.head] = undefined;
        }
        else {
            this.tracks[track][this.head] = value;
        }
        return true;
    }
    set(input = "") {
        let i = 1;
        for (const char of input) {
            this.tracks[0][i] = char;
            i++;
        }
    }
    goRight() {
        this.head++;
        return true;
    }
    goLeft() {
        if (this.head == 0)
            return false; // Fall off left edge
        this.head--;
        return true;
    }
    go(direction) {
        if (direction == "R")
            return this.goRight();
        if (direction == "L")
            return this.goLeft();
        if (direction == "S")
            return true;
    }
    toString() {
        let length = Math.max(this.head + 1, this.tracks.reduce((a, b) => Math.max(a, b.length), 0));
        let str = "";
        for (const track of this.tracks) {
            for (let i = 0; i < length; i++) {
                if (i == this.head)
                    str += Tape.style_underline;
                str += track[i] ?? " ";
                if (i == this.head)
                    str += Tape.style_reset;
            }
            str += "\n";
        }
        return str.substring(0, str.length - 1);
    }
}
Tape.style_reset = "\x1b[0m";
Tape.style_underline = "\x1b[4m";
//# sourceMappingURL=Tape.js.map