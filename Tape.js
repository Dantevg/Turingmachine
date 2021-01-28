export default class Tape {
	constructor(nTracks = 1, blankElem = "B"){
		this.tracks = []
		this.blankElem = blankElem
		this.head = 0
		for(let i = 0; i < nTracks; i++){
			this.tracks.push([])
		}
	}
	
	get(track = 0){
		if(!this.tracks[track]) return null // TODO: return proper error
		return this.tracks[track][this.head] ?? this.blankElem
	}
	
	getAll(){
		let values = []
		for(const track of this.tracks){
			values.push(track[this.head])
		}
		return values
	}
	
	put(value, track = 0){
		if(track > this.tracks.length) return false // TODO: return proper error
		if(value == undefined || value == this.blankElem){
			this.tracks[track][this.head] = undefined
		}else{
			this.tracks[track][this.head] = value
		}
		return true
	}
	
	set(input = ""){
		let i = 1
		for(const char of input){
			this.tracks[0][i] = char
			i++
		}
	}
	
	goRight = () => ++this.head
	goLeft(){
		if(this.head == 0) return null // TODO: return proper error
		return --this.head
	}
	go(direction){
		if(direction == "R") this.goRight()
		if(direction == "L") this.goLeft()
	}
	
	toString(){
		let length = this.tracks.reduce((a,b) => Math.max(a,b.length), 0)
		let str = ""
		for(const track of this.tracks){
			for(const value of track){
				str += value ?? " "
			}
			str += "\n"
		}
		return str.substring(0, str.length-1)
	}
	
}
