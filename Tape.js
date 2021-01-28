export default class Tape {
	constructor(nTracks = 1){
		this.tracks = []
		this.head = 0
		for(let i = 0; i < nTracks; i++){
			this.tracks.push([])
		}
	}
	
	get(track = 0){
		if(track > this.tracks.length) return null // TODO: return proper error
		return this.tracks[track][this.head] ?? false
	}
	
	getAll(){
		let values = []
		for(let i = 0; i < this.tracks.length; i++){
			values.push(this.tracks[i][this.head])
		}
		return values
	}
	
	put(value, track = 0){
		if(track > this.tracks.length) return false // TODO: return proper error
		this.tracks[track][this.head] = value
		return true
	}
	
	set(input = ""){
		let i = 0
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
	
	toString(){
		let length = this.tracks.reduce((a,b) => Math.max(a,b.length), 0)
		let str = ""
		for(let track of this.tracks){
			for(let i = 0; i < length; i++){
				str += track[i] ?? " "
			}
			str += "\n"
		}
		return str.substring(0, str.length-1)
	}
	
}
