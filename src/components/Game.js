import React, { Component } from 'react';
import Card from './Card'
import Player from './Player'
import { Button } from 'react-materialize'

import { cards } from '../cards'

function shuffle(cards) {
    for (let i = cards.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]];
    }
    for (let i = 0; i < cards.length; i++) {
        cards[i].isFlipped = false
    }
    return cards
}

class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: shuffle(cards),
            bluePlayer: {
                name: 'Blue Player',
                activeTurn: true,
                matches: 0,
                guessesValues: [],
                img: './blue.png'
            },
            redPlayer: {
                name: 'Red Player',
                activeTurn: false,
                matches: 0,
                guessesValues: [],
                img: './red.png'
            },
            flippedCards: []
        }
    }

    announceWinner = (winner) => {
        let that = this
        setTimeout(function () {
            let answer = window.confirm('Congratulations ' + winner.name + ' !!! Play again?');
            if (answer === true) {
                that.toggleGame();
            }
        }, 500)

    }

    checkWin = (blue, red) => {
        if (red.matches + blue.matches === this.state.cards.length / 2) {
            let res = Math.max(blue.matches, red.matches)
            let winner = [this.state.bluePlayer, this.state.redPlayer].find(player => player.matches === res)
            this.announceWinner(winner);
        }
    }

    cardFlipDelay = () => {
        let that = this
        setTimeout(function () {
            let cards = that.state.cards
            for (let i = 0; i < that.state.flippedCards.length; i++) {
                let indy = that.state.flippedCards[i]
                cards[indy].isFlipped = !cards[indy].isFlipped
            }
            that.setState({ cards, flippedCards: [] })
        }, 500)

    }


    setAlert = (param) => {
        setTimeout(function () {
            alert(param)
        }, 500)

    }

    checkMatch(value, id) {
        let bluePlayer = this.state.bluePlayer
        let redPlayer = this.state.redPlayer

        if (bluePlayer.activeTurn) {

            bluePlayer.guessesValues.push(value)
            this.setState({ bluePlayer })

            if (bluePlayer.guessesValues.length === 2) {

                if (bluePlayer.guessesValues[0] === bluePlayer.guessesValues[1]) {

                    bluePlayer.matches++
                    this.setAlert("Blue player matched, red player's turn")
                    this.setState({ bluePlayer, flippedCards: [] })
                    this.checkWin(bluePlayer, redPlayer)
                } else {
                    this.setAlert("Blue player didn't match, red player's turn")
                    this.cardFlipDelay()
                }
                bluePlayer.activeTurn = false
                redPlayer.activeTurn = true
                bluePlayer.guessesValues = []
                this.setState({ bluePlayer, redPlayer });
            }


        } else if (redPlayer.activeTurn) {

            redPlayer.guessesValues.push(value)
            this.setState({ redPlayer })

            if (redPlayer.guessesValues.length === 2) {

                if (redPlayer.guessesValues[0] === redPlayer.guessesValues[1]) {
                    redPlayer.matches++
                    this.setAlert("red player matched, blue player's turn")
                    this.setState({ redPlayer, flippedCards: [] })
                    this.checkWin(bluePlayer, redPlayer)

                } else {
                    this.setAlert("Red player didn't match, Blue player's turn")
                    this.cardFlipDelay()
                }
                redPlayer.activeTurn = false
                bluePlayer.activeTurn = true
                redPlayer.guessesValues = []
                this.setState({ bluePlayer, redPlayer });
            }
        }


    }

    handleFlip = (id, value) => {
        let cards = this.state.cards
        cards[id].isFlipped = !cards[id].isFlipped;
        let flippedCards = this.state.flippedCards;
        flippedCards.push(id)
        this.setState({ cards, flippedCards })
        this.checkMatch(value, id)
    }

    renderCards = (cards) => {
        return cards.map((card, index) => {
            return (
                <Card
                    key={card.id}
                    id={index}
                    value={card.value}
                    isFlipped={card.isFlipped}
                    img={card.img}
                    handleFlip={this.handleFlip} />
            )
        })
    }

    toggleGame = () => {
        this.setState({
            cards: shuffle(cards),
            bluePlayer: {
                activeTurn: true,
                matches: 0,
                guessesValues: []
            },
            redPlayer: {
                activeTurn: false,
                matches: 0,
                guessesValues: []
            },
            flippedCards: []
        })
        this.props.toggleGame()
    }

    renderPlayerIcons = (...players) => {
        
        return players.map((player, index) => {
            return (
                <Player key={index}
                    img={player.img}
                    matches={player.matches}
                    name={player.name}

                />

            )
        })
    }

    render() {

        return (
            <div className="container">
                <Button waves='purple' onClick={this.toggleGame} className="margy blue lighten-2"> Quit Game </Button>
                {this.renderPlayerIcons(this.state.bluePlayer, this.state.redPlayer)}
                <div className="row card paddy">
                    {this.renderCards(this.state.cards)}
                </div>
            </div>
        );
    }
}

export default Game;
