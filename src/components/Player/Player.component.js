import React, { Component } from 'react'

import { GITHUB_LINK, genres } from '../../constants/app'

import _Audio from '../Audio'
import Metadata from "./Metadata.component"

import colors from '../../constants/colors'

const localColors = {
}

const styles = {

}

class Player extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {
            volume,
            audio,
            percentComplete,
            duration,
            currentTime,
        } = this.props

        return <div>
            <_Audio />
            <button onClick={this.props.onPlayFaked}>Play</button>

            <div>Volume icon</div>
            <input
                type="range"
                value={volume}
                onChange={this.props.onVolumeChange}
                min={0}
                max={1}
                step={0.01}
            />

            <a href={GITHUB_LINK}>Info</a>

            {/*<button onClick={this.props.onPlayFaked}>Next</button>*/}
            <button onClick={this.props.onPlayFaked}>Full Screen</button>

            <select>
                {genres.map((genre, i) => {
                    return <option key={i}>{genre}</option>
                })}
            </select>

            <div>color selector</div>

            <Metadata
                percentComplete={percentComplete}
            />

        </div>
    }
}

export default Player
