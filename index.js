import Statemachine from "./Statemachine.js"
import Turingmachine from "./Turingmachine.js"

const stm = new Statemachine([
	{
		B: {state: 1, replace: "B", direction: "R"},
	}, {
		B: {state: 2, replace: "B", direction: "L"},
		a: {state: 1, replace: "a", direction: "R"},
		b: {state: 1, replace: "c", direction: "R"},
		c: {state: 1, replace: "c", direction: "R"},
	}, {
		a: {state: 2, replace: "c", direction: "L"},
		c: {state: 2, replace: "b", direction: "L"},
	}
])

const t = new Turingmachine(stm, "aabca")
console.log(t.toString())
t.run()
console.log(t.toString())
