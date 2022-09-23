// Card Game Of War

class Game {
	// Constructs Game class with given ojects
	constructor(){
		this.newDeck = new Deck()
		this.player1 = new Player()
		this.player2 = new Player()
		this.tieCount = 0
		this.tieHolder1 = []
		this.tieHolder2 = []
		this.gameOver = true 
	}
	// Randomly feeds positive and negative values to the sort method
	shuffleDeck(){
		this.newDeck.deck.sort(() => Math.random() - .5)
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
	// Initiates the gameplay sequence
	playGame (){
		console.log("WELCOME TO THE GAME OF WAR")
		console.log("Let's Play!")
		console.log("\n")
		this.gameOver = false
		this.shuffleDeck()
		this.dealCards()
		console.log(this.player1.cards, this.player2.cards)
		this.tieHolder1 = []
		this.tieHolder2 = []
		let turncount = 0
		while (this.gameOver === false && turncount <500){
			this.playTurn()
			turncount += 1
		}
		if (turncount >= 500) {
			console.log("It's a tie")
			this.tieCount += 1
		}
		console.log(`Player 1 has won `, this.player1.gamesWon, ` games`)
		console.log(`Player 2 has won `, this.player2.gamesWon, ` games`)
		console.log(`There have been`, this.tieCount, `ties`)
		console.log("\n")
		this.resetGame()
	}
	// This causes both players play the top card in their pile	
	playTurn (){
		console.log(`Player 1 Cards: `, this.player1.cards.length,'Player 2 Cards: ',  this.player2.cards.length)
		if (this.player1.cards.length === 0 && this.player2.cards.length === 0){
			console.log("It's a tie")
			console.log("\n")
			this.gameOver = true
		}
		// If Player1 runs out of cards call Player 2 winner and end game
		else if (this.player1.cards.length === 0){
			console.log("Player 2 has won the game")
			this.player2.gamesWon += 1
			console.log("\n")
			this.gameOver = true
		}
		// If Player2 runs out of cards call Player 1 winner and end game
		else if(this.player2.cards.length === 0){
			console.log("Player 1 has won the game")
			this.player1.gamesWon += 1
			console.log("\n")
			this.gameOver = true
		}
		// If both players still have cards, draw cards compare them and award them
		else{
			const drawCard1 = this.player1.cards.pop()
			const drawCard2 = this.player2.cards.pop()
			this.awardCards(drawCard1,drawCard2)
		}
	}
	// This function compares the cards and awards them to the winner
	awardCards (card1,card2){
		// If card 1 (Player 1's Card) is greater than card2 give the cards to player 1
		if (card1.score > card2.score) {
			this.player1.cards.unshift(card1,card2)
			console.log(`Player 1's ${card1.rank} of ${card1.suit} beats Player 2's ${card2.rank} of ${card2.suit}`)
		}
		// If card 2 (Player 2's Card) is greater than card 1 give cards to player 2
		else if (card1.score < card2.score) {
			this.player2.cards.unshift(card1,card2)
			console.log(`Player 2's ${card2.rank} of ${card2.suit} beats Player 1's ${card1.rank} of ${card1.suit}`)
		}
		// If there is a tie call the "tieBreaker" function
		else if (card1.score === card2.score) {
			console.log(`Player 1's ${card1.rank} of ${card1.suit} ties Player 2's ${card2.rank} of ${card2.suit}`)
			this.tieBreaker(card1,card2)
		}
	}
	// In the event of a tie this function breaks the tie
	tieBreaker (card1,card2) {
		console.log("I declare war!")
		// Tie in the rare event that both players don't have enough cards for gameplay
		if (this.player2.cards.length < 4 && this.player1.cards.length < 4){
			console.log("It's a tie")
			console.log("\n")
			this.gameOver = true
		}
		// If player 2 runs out of enough cards, player 1 wins	
		else if (this.player2.cards.length < 4){
			console.log("Player 2 is out of cards")
			console.log("Player 1 wins")
			this.player1.gamesWon += 1
			console.log("\n")
			this.gameOver = true
		}
		// If player 1 runs out of enough cards, player 2 wins
		else if (this.player1.cards.length < 4){
			console.log("Player 1 is out of cards")
			console.log("Player 2 wins")
			this.player2.gamesWon += 1
			console.log("\n")
			this.gameOver = true
		}
		// If both players can play war, proceed with tie breaker
		else {
			// Pop 4 cards from player 1 and 2 decks and push them to tieHolder Arrays
			for (let i = 0; i < 4; i++){
				this.tieHolder1.push(this.player1.cards.pop())
				this.tieHolder2.push(this.player2.cards.pop())
			}
			console.log(`Player 1: Pile`, this.tieHolder1,`Player 2: Pile`, this.tieHolder2)
			let lastCard1 = this.tieHolder1[this.tieHolder1.length-1]
			let lastCard2 = this.tieHolder2[this.tieHolder1.length-1]

			// If Player 1s 4th drawn card is higher value award it the pile 
			if (lastCard1.score > lastCard2.score) {
				console.log(`Player 1's ${lastCard1.rank} of ${lastCard1.suit} beats Player 2's ${lastCard2.rank} of ${lastCard2.suit}`)
				this.player1.cards.unshift(card1,card2)
				for (let i = 0; i < this.tieHolder1.length; i++){
					this.player1.cards.unshift(this.tieHolder1[i])
					this.player1.cards.unshift(this.tieHolder2[i])
				}
				this.tieHolder1 = []
				this.tieHolder2 = []
			}
			
			// If Player 2s 4th drawn card is higher value award it the pile
			else if (lastCard1.score < lastCard2.score) {
				console.log(`Player 2's ${lastCard2.rank} of ${lastCard2.suit} beats Player 1's ${lastCard1.rank} of ${lastCard1.suit}`)
				this.player2.cards.unshift(card1,card2)
				for (let i = 0; i < this.tieHolder1.length; i++){
					this.player2.cards.unshift(this.tieHolder1[i])
					this.player2.cards.unshift(this.tieHolder2[i])
				}
				this.tieHolder1 = []
				this.tieHolder2 = []
			}
			else if (lastCard1.score === lastCard2.score) {
				this.tieBreaker(card1,card2)
			}
		}
	}
	resetGame (){
		// console.log("Restarting Game ...")
		this.player1.cards = []
		this.player2.cards = []
		this.tieHolder1 = []
		this.tieHolder2 = []
		this.newDeck.deck = []
		this.newDeck.makeDeck()
		console.log(this.newDeck.deck)
		this.gameOver = false
		// this.playGame()
		// console.log(this.player1.cards,this.player1.cards)
		
	}
}

class Player {
	constructor(){
		this.cards = []
		this.gamesWon = 0
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
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
newGame.playGame()
