import Statemachine from "./Statemachine.js"
import Turingmachine from "./Turingmachine.js"

const stm = Statemachine.parse(
	[["B/BR", 1]],
	[["B/BL", 2], ["a/aR", 1], ["b/cR", 1], ["c/cR", 1]],
	[["a/cL", 2], ["c/bL", 2]]
)

const t = new Turingmachine(stm, "aabca")
console.log(t.toString())
t.run()
console.log(t.toString())
