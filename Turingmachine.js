import Tape from "./Tape.js"

export default class Turingmachine {
	constructor(stm, input, blankElem, nTapes = 1, nTracks = 1){
		this.stm = stm
		this.tapes = []
		for(let i = 0; i < nTapes; i++){
			this.tapes.push(new Tape(nTracks, blankElem))
		}
		this.tapes[0].set(input)
		this.active = true
	}
	
	step(){
		if(!this.active) return false
		const [replace, direction] = this.stm.next(this.tapes[0].get())
		if(replace != undefined){
			this.tapes[0].put(replace)
			if(!this.tapes[0].go(direction)) this.active = false
		}else{
			this.active = false
		}
		return this.active
	}
	
	run(){
		while(this.active) this.step()
	}
	
	toString(){
		let str = ""
		for(let t in this.tapes){
			str += `Tape ${t} @ ${this.tapes[t].head}:` + this.tapes[t].toString()
		}
		return str
	}
	
}
