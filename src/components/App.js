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
    const style = {
      backgroundImage : "url('./bg.jpeg')",
      backgroundSize : 'cover',
      backgroundRepeat: 'no-repeat'
    }
    return (
      <div className="parallax-container hundo" style={style}>
        {this.state.isGameStarted
          ?
          <div>

            <Game isGameStarted={this.state.isGameStarted} toggleGame={this.toggleGame} />
          </div>
          :
          <div className="container margy">
            <Button waves='purple' className="blue lighten-2" onClick={this.toggleGame}> Start Game </Button>
          </div>}
      </div>
    );
  }
}

export default App;
