import React, { Component } from 'react';
import { Chip } from 'react-materialize'


class Player extends Component {
    render() {

        return (
            <Chip className="grey darken-3">
                <img src={this.props.img} alt='Blue Player' />
                {this.props.name} : {this.props.matches} matches
		    </Chip>
        );
    }
}

export default Player;
