import React, { Component } from 'react';
import { Button } from 'react-materialize'
import '../App.css';
import Game from './Game';



class App extends Component {
  constructor() {
    super()

    this.state = {
      isGameStarted: false
    }
  }
  toggleGame = () => {
    this.setState({ isGameStarted: !this.state.isGameStarted })
  }


  render() {
    return (
      <div>
        {this.state.isGameStarted
          ?
          <div>

            <Game isGameStarted={this.state.isGameStarted} toggleGame={this.toggleGame} />
          </div>
          :
          <div className="container margy">
            <Button waves='light' onClick={this.toggleGame}> Start Game </Button>
          </div>}
      </div>
    );
  }
}

export default App;
