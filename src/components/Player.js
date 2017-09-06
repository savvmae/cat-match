import React, { Component } from 'react';
import { Chip } from 'react-materialize'


class Player extends Component {
    render() {

        return (
            <div className="chippy white backdropp">
                <img src={this.props.img} alt='Blue Player' />
                {this.props.name} : {this.props.matches} matches
		    </div>
        );
    }
}

export default Player;
