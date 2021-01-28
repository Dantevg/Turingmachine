export default class Statemachine {
	constructor(states = []){
		this.states = states
		this.state = 0
	}
	
	next(input){
		const c = this.states[this.state][input]
		if(c == undefined) return []
		this.state = c.state
		// console.log("replace", input, "by", c.replace, ", go to state", c.state, "and move", c.direction)
		return [c.replace, c.direction]
	}
	
}
