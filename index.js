import Statemachine from "./Statemachine.js"
import Turingmachine from "./Turingmachine.js"

const stm = Statemachine.parse({
	0: [[1, "B/BR"]],
	1: [[2, "B/BL"], [1, "a/aR"], [1, "b/cR"], [1, "c/cR"]],
	2: [[2, "a/cL"], [2, "c/bL"]],
})

const busybeaver = Statemachine.parse({
	A: [["B", "0/1R"], ["C", "1/1L"]],
	B: [["A", "0/1L"], ["B", "1/1R"]],
	C: [["B", "0/1L"], ["HALT", "1/1R"]],
	HALT: [],
}, "A")

const alternating = Statemachine.parse({
	b: [["c", "B/0R"]],
	c: [["e", "B/BR"]],
	e: [["f", "B/1R"]],
	f: [["b", "B/BR"]],
}, "b")

const stm2 = Statemachine.parse({
	0: [[1, "B/BR"]],
	1: [[1, "B/BR"], [1, "a/aR"], [1, "b/bR"], [2, "c/cL"]],
	2: [[2, "a/bL"], [2, "b/aL"]],
})

const palindromes = Statemachine.parse({
	0: [[1, "B/BR", "B/#R"]],
	1: [[2, "a/aR", "B/BR"], [2, "b/bR", "B/BR"], [3, "B/BL", "B/BL"]],
	2: [[1, "a/aR", "B/BS"], [1, "b/bR", "B/BS"], [5, "B/BL", "B/BL"]],
	3: [[3, "a/aL", "B/aL"], [3, "b/bL", "B/bL"], [4, "a/aS", "#/#R"], [4, "b/bS", "#/#R"]],
	4: [[4, "a/aL", "a/aR"], [4, "b/bL", "b/bR"]],
	5: [[5, "a/aL", "B/aL"], [5, "b/bL", "B/bL"], [6, "a/aS", "#/#R"], [6, "b/bS", "#/#R"]],
	6: [[4, "a/aL", "a/aR"], [4, "a/aL", "b/bR"], [4, "b/bL", "a/aR"], [4, "b/bL", "b/bR"], ],
})

const t = new Turingmachine(palindromes, "abba", "B", 2)
t.run(true)
console.log(t.tapes[0].head == 0)
