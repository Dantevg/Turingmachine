export default class Tape {
	tracks: string[][]
	blankElem: string
	head: number

	constructor(nTracks = 1, blankElem = "B") {
		this.tracks = []
		this.blankElem = blankElem
		this.head = 0
		for (let i = 0; i < nTracks; i++) {
			this.tracks.push([])
		}
	}

	get(track = 0): string {
		if (!this.tracks[track]) throw "No such track"
		return this.tracks[track][this.head] ?? this.blankElem
	}

	getAll(): string[] {
		let values = []
		for (const track of this.tracks) {
			values.push(track[this.head] ?? this.blankElem)
		}
		return values
	}

	put(value: string, track = 0): true {
		if (!this.tracks[track]) throw "No such track"
		if (value == undefined || value == this.blankElem) {
			this.tracks[track][this.head] = undefined
		} else {
			this.tracks[track][this.head] = value
		}
		return true
	}

	set(input = "") {
		let i = 1
		for (const char of input) {
			this.tracks[0][i] = char
			i++
		}
	}

	goRight(): true {
		this.head++
		return true
	}
	goLeft(): boolean {
		if (this.head == 0) return false // Fall off left edge
		this.head--
		return true
	}
	go(direction: "R" | "L" | "S"): boolean {
		if (direction == "R") return this.goRight()
		if (direction == "L") return this.goLeft()
		if (direction == "S") return true
	}

	toString(): string {
		let length = Math.max(this.head + 1, this.tracks.reduce((a, b) => Math.max(a, b.length), 0))
		let str = ""
		for (const track of this.tracks) {
			for (let i = 0; i < length; i++) {
				if (i == this.head) str += Tape.style_underline
				str += track[i] ?? " "
				if (i == this.head) str += Tape.style_reset
			}
			str += "\n"
		}
		return str.substring(0, str.length - 1)
	}

	static style_reset = "\x1b[0m"
	static style_underline = "\x1b[4m"

}
