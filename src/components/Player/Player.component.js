import React, { Component } from 'react'

import { GITHUB_LINK, genres } from '../../constants/app'

import _Audio from '../Audio'
import Metadata from "./Metadata.component"
import Controls from './Controls'

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

            <Controls/>

            <a href={GITHUB_LINK}>Info</a>

            <button onClick={this.props.onPlayFaked}>Full Screen</button>

            <div>genre selector</div>
            <select>
                {genres.map((genre, i) => {
                    return <option key={i}>{genre}</option>
                })}
            </select>

            <div>color selector</div>
            <div>visualizer selector</div>

            <Metadata
                percentComplete={percentComplete}
            />

        </div>
    }
}

export default Player
