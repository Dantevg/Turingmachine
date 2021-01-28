export default class Statemachine {
	constructor(states = {}, initial = "0"){
		this.states = states
		this.state = initial
	}
	
	next(input){
		const c = this.states[this.state]?.[input]
		if(c == undefined) return []
		this.state = c.state.toString()
		return [c.replace, c.direction]
	}
	
	static parseState(...transitions){
		let state = {}
		for(const transition of transitions){
			const [_, read, replace, direction] = transition[0].match(/(.)\/(.)(.)/)
			state[read] = {state: transition[1], replace: replace, direction: direction}
		}
		return state
	}
	
	static parse(states, initial){
		const stm = {}
		for(const state in states){
			stm[state] = Statemachine.parseState(...states[state])
		}
		return new Statemachine(stm, initial)
	}
	
}
