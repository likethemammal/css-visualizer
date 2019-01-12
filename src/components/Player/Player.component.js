import React, { Component } from 'react'

import { GITHUB_LINK, genres } from '../../constants/app'

class Player extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return <div>
            <button onClick={this.props.onFakeTriggered}>Play</button>
            <button onClick={this.props.onFakeTriggered}>Next</button>
            <button onClick={this.props.onFakeTriggered}>Full Screen</button>
            <a href={GITHUB_LINK}>Info</a>

            <div>Volume icon</div>
            <range></range>

            <select>
                {genres.map((genre) => {
                    return <option>{genre}</option>
                })}
            </select>

            <div>color selector</div>

            <div>
                <div>
                    song info
                </div>
                <div>artist name</div>
                <div>album name</div>
                <div>album artwork</div>
                <div>duration</div>
            </div>

        </div>
    }
}

export default Player
