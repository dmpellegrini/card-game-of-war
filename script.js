// Card Game Of War

class Game {
	constructor(){
		this.newDeck = new Deck()
		this.player1 = new Player()
		this.player2 = new Player()
		// this.shuffleDeck()
		// this.dealCards()
	}
	// Randomly feeds positive and negative values to the sort method
	shuffleDeck(){
		this.newDeck.deck.sort(() => Math.random() - .5)
	}
	sortDeckAscending(){
		this.newDeck.deck.sort((a,b) => a.score - b.score)
	}
	// Deals cards one at a time off the top of the deck
	dealCards(){
		for (let i = this.newDeck.deck.length; i > 0; i--){
			const cardDealt = this.newDeck.deck.pop()
			if(i % 2 === 0){
				this.player1.cards.push(cardDealt)
			}
			else if(i % 2 === 1){
				this.player2.cards.push(cardDealt)
			}
		}
	}
	// This is for the purposes of testing the end game
	dealCardsUnfair(){
		for (let i = this.newDeck.deck.length; i > 0; i--){
			const cardDealt = this.newDeck.deck.pop()
			if(cardDealt.score > 7){
				this.player1.cards.push(cardDealt)
			}
			else if(cardDealt.score <= 7){
				this.player2.cards.push(cardDealt)
			}
		}
	}
	
	playTurn (){
		const drawCard1 = this.player1.cards.pop()
		const drawCard2 = this.player2.cards.pop()
		
		if (drawCard1.score > drawCard2.score) {
			this.player1.cards.unshift(drawCard2)
			this.player1.cards.unshift(drawCard1)
			console.log(`Player 1's ${drawCard1.rank} of ${drawCard1.suit} beats Player 2's ${drawCard2.rank} of ${drawCard2.suit}`)
		}
		else if (drawCard1.score < drawCard2.score) {
			this.player2.cards.unshift(drawCard2)
			this.player2.cards.unshift(drawCard1)
			console.log(`Player 2's ${drawCard2.rank} of ${drawCard2.suit} beats Player 1's ${drawCard1.rank} of ${drawCard1.suit}`)
		}
		else if (drawCard1.score === drawCard2.score) {
			this.tieBreaker(drawCard1,drawCard2)
		}

		if (this.player1.cards.length === 0){
			console.log("Player 2 has won the game")
			this.restartGame()
		}
		else if(this.player2.cards.length === 0){
			console.log("Player 1 has won the game")
			this.restartGame()
		}
	}
	tieBreaker (card1,card2) {
		let tieHolder1 = [card1]
		let tieHolder2 = [card2]
	for (let i = 0; i < 3; i++){
		tieHolder1.push(this.player1.cards.pop())
		tieHolder2.push(this.player2.cards.pop())
	}
	if (tieHolder1[3].score > tieHolder2[3].score) {
			for (let i = 0; i < 4; i++){
				this.player1.cards.unshift(tieHolder1[i])
				this.player1.cards.unshift(tieHolder2[i])
			}
		}
		else if (tieHolder1[3].score < tieHolder2[3].score) {
			for (let i = 0; i < 4; i++){
				this.player2.cards.unshift(tieHolder1[i])
				this.player2.cards.unshift(tieHolder2[i])
			}
		}
		else if (tieHolder1[3].score === tieHolder2[3].score) {
			console.log(tieHolder1, tieHolder2)
			for (let i = 0; i < 4; i++){
				this.player2.cards.unshift(tieHolder1[i])
				this.player2.cards.unshift(tieHolder2[i])
			}
			console.log("Stopping function for now")
		}
	}
	restartGame (){
		console.log("Restarting Game ...")
		this.player1.cards = []
		this.player2.cards = []
		this.newDeck.makeDeck()
		this.dealCards()
	}
}

class Player {
	constructor(){
		this.cards = []
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
		this.deck = []
		this.makeDeck()
	}
	makeDeck() {
		const suits = ['hearts','spades','clubs','diamonds']
		const scores = [14,2,3,4,5,6,7,8,9,10,11,12,13]
		for (const suit of suits) {
			for (const score of scores) {
				if (score === 14){
					const card = new Card(suit,"Ace",score)
					this.deck.push(card)
				}
				else if (score === 11){
					const card = new Card(suit,"Jack",score)
					this.deck.push(card)
				}
				else if (score === 12){
					const card = new Card(suit,"Queen",score)
					this.deck.push(card)
				}
				else if (score === 13){
					const card = new Card(suit,"King",score)
					this.deck.push(card)
				}
				else {
					const card = new Card(suit,`${score}`,score)
					this.deck.push(card)
				}
			}
		}
	}
}

const newGame = new Game
newGame.sortDeckAscending()
// console.log(newGame.newDeck.deck)
newGame.dealCards()
// newGame.shuffleDeck()
// console.log(newGame.newDeck.deck)
// newGame.dealCardsUnfair()
for (let i = 0; i < 4; i++) {
	newGame.playTurn()
}
console.log(newGame.player1.cards, newGame.player2.cards)
