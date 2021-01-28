import Tape from "./Tape.js"

export default class Turingmachine {
	constructor(stm, input, nTapes = 1, nTracks = 1){
		this.stm = stm
		this.tapes = []
		for(let i = 0; i < nTapes; i++){
			this.tapes.push(new Tape(nTracks))
		}
		this.tapes[0].set(input)
		this.active = true
	}
	
	step(){
		const [replace, direction] = this.stm.next(this.tapes[0].get())
		if(replace == undefined){
			this.active = false
			return false
		}
		this.tapes[0].put(replace)
		if(direction == "R") this.tapes[0].goRight()
		if(direction == "L") this.tapes[0].goLeft()
		return true
	}
	
	run(){
		while(this.active){
			this.step()
			// console.log(this.tapes[0].toString())
			// console.log(this.toString())
		}
	}
	
	toString(){
		let str = ""
		for(let t in this.tapes){
			str += `Tape ${t} @ ${this.tapes[t].head}: ` + this.tapes[t].toString()
		}
		return str
	}
	
}
