export default class Statemachine {
	constructor(states = []){
		this.states = states
		this.state = 0
	}
	
	next(input){
		const c = this.states[this.state]?.[input]
		if(c == undefined) return []
		this.state = c.state
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
	
	static parse(...states){
		const stm = []
		for(const state of states){
			stm.push(Statemachine.parseState(...state))
		}
		return new Statemachine(stm)
	}
	
}
