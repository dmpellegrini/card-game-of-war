// Card Game Of War

class Game {
	constructor(){
		this.deck = new Deck()
		
	}
}

class Player {
	constructor(){
	}
}

class Card {
	constructor (suit,rank,score){
		this.suit = suit
		this.rank = rank
		this.score = score
	}
}

class Deck {
	constructor (){
		this.suits = ['hearts','spades','clubs','diamonds']
		this.scores = [1,2,3,4,5,6,7,8,9,10,11,12,13]
		this.cards = []
		this.makeDeck()
	}
	makeDeck() {
		for (const suit of this.suits) {
			for (const score of this.scores) {
				if (score === 1){
					const card = new Card(suit,"Ace",score)
					this.cards.push(card)
				}
				else if (score === 11){
					const card = new Card(suit,"Jack",score)
					this.cards.push(card)
				}
				else if (score === 12){
					const card = new Card(suit,"Queen",score)
					this.cards.push(card)
				}
				else if (score === 13){
					const card = new Card(suit,"King",score)
					this.cards.push(card)
				}
				else {
					const card = new Card(suit,`${score}`,score)
					this.cards.push(card)
				}
			}
		}
	}
	drawCard = function (){
		let cardDrawn = Math.floor(Math.random()*51)
		console.log(this.cards[cardDrawn])
	}
}
