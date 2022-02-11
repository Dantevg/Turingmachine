type direction = "R" | "L" | "S"
type inputTransition = [string | number, ...string[]]
type transition = { state: string | number, replace: string[], direction: direction[] }
type stateMap = Record<string, Record<string, transition>>

export default class Statemachine {
	states: stateMap
	state: string | number

	constructor(states: stateMap = {}, initial = "0") {
		this.states = states
		this.state = initial
	}

	next(input): [string[]?, direction[]?] {
		const c = this.states[this.state]?.[input.toString()]
		if (c == undefined) return []
		this.state = c.state.toString()
		return [c.replace, c.direction]
	}

	static parseState(...transitions: inputTransition[]): Record<string, transition> {
		let state = {}
		for (const transition of transitions) {
			const [newstate, ...transitioni] = transition
			const [read, replace, direction] = [[], [], []]
			for (let i = 0; i < transitioni.length; i++) {
				const [_, readi, replacei, directioni] = transitioni[i].match(/(.)\/(.)(.)/)
				read.push(readi)
				replace.push(replacei)
				direction.push(directioni)
			}
			state[read.toString()] = { state: newstate, replace: replace, direction: direction }
		}
		return state
	}

	static parse(states: Record<string, inputTransition[]>, initial?: string): Statemachine {
		const stm: stateMap = {}
		for (const state in states) {
			stm[state] = Statemachine.parseState(...states[state])
		}
		return new Statemachine(stm, initial)
	}

}
