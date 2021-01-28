import Statemachine from "./Statemachine.js"
import Turingmachine from "./Turingmachine.js"

const stm = Statemachine.parse({
	0: [["B/BR", 1]],
	1: [["B/BL", 2], ["a/aR", 1], ["b/cR", 1], ["c/cR", 1]],
	2: [["a/cL", 2], ["c/bL", 2]],
})

const busybeaver = Statemachine.parse({
	A: [["0/1R", "B"], ["1/1L", "C"]],
	B: [["0/1L", "A"], ["1/1R", "B"]],
	C: [["0/1L", "B"], ["1/1R", "HALT"]],
	HALT: [],
}, "A")

const alternating = Statemachine.parse({
	b: [["B/0R", "c"]],
	c: [["B/BR", "e"]],
	e: [["B/1R", "f"]],
	f: [["B/BR", "b"]],
}, "b")

const t = new Turingmachine(stm, "aabca")
console.log(t.toString())
t.run()
console.log(t.toString())
