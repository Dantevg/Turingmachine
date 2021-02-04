export default class Statemachine {
	constructor(states = {}, initial = "0"){
		this.states = states
		this.state = initial
	}
	
	next(input){
		const c = this.states[this.state]?.[input.toString()]
		if(c == undefined) return []
		this.state = c.state.toString()
		return [c.replace, c.direction]
	}
	
	static parseState(...transitions){
		let state = {}
		for(const transition of transitions){
			const [read, replace, direction] = [[], [], []]
			for(let i = 1; i < transition.length; i++){
				const [_, readi, replacei, directioni] = transition[i].match(/(.)\/(.)(.)/)
				read.push(readi)
				replace.push(replacei)
				direction.push(directioni)
			}
			state[read.toString()] = {state: transition[0], replace: replace, direction: direction}
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
