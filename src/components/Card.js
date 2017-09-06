import React, { Component } from 'react';

class Card extends Component {

    handleClick = () => {
      this.props.handleFlip(this.props.id, this.props.value)   
    }

    render() {
        const flippedStyle = {
            backgroundImage: this.props.img,
        }
        const unflippedStyle = {
            backgroundImage: 'url("./card-back.jpg")',
            backgroundSize: 'contain'
        }
        return (
            <div className="margy">
                {this.props.isFlipped ?
                    <div className="col s4 kard paddy b-marg" style={flippedStyle}>
                    </div> :
                    <div onClick={this.handleClick} className="col s4 kard paddy b-marg" style={unflippedStyle}>
                    </div>}
            </div>
        );
    }
}

export default Card;
