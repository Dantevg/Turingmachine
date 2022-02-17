import Tape from "./Tape.js";
export default class Turingmachine {
    constructor(stm, input, blankElem, nTapes = 1, nTracks) {
        this.stm = stm;
        this.tapes = [];
        for (let i = 0; i < nTapes; i++) {
            this.tapes.push(new Tape(nTracks, blankElem));
        }
        this.tapes[0].set(input);
        this.active = true;
    }
    step() {
        if (!this.active)
            return false;
        const contents = this.tapes.reduce((a, b) => { a.push(b.get()); return a; }, []);
        const [replace, direction] = this.stm.next(contents.toString());
        if (replace != undefined) {
            this.tapes.forEach((tape, i) => {
                tape.put(replace[i]);
                if (!tape.go(direction[i]))
                    this.active = false;
            });
        }
        else {
            this.active = false;
        }
        return this.active;
    }
    run(log) {
        while (this.active) {
            if (log)
                console.log(this.stm.state, "\n" + this.toString());
            this.step();
        }
    }
    toString() {
        const strs = [];
        for (let t = this.tapes.length - 1; t >= 0; t--) {
            strs.push(this.tapes[t].toString());
        }
        return strs.join("\n");
    }
}
//# sourceMappingURL=Turingmachine.js.map