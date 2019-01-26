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

        //hasNextSong,
        //hasGenreSelect
        //hasVisualizerSelect
        //hasMetaData

        return <div>
            <_Audio />

            <Controls/>

            <Metadata
                percentComplete={percentComplete}
            />

        </div>
    }
}

export default Player
