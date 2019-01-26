import React, { Component } from 'react'

import { GITHUB_LINK, genres } from '../../constants/app'

import _Audio from '../Audio'
import Metadata from "./Metadata.component"
import Controls from './Controls'

import IdleTimer from 'react-idle-timer'

import colors from '../../constants/colors'

const localColors = {
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transition: `opacity 125ms ease-in`,
    },
}

class Player extends Component {

    constructor(props) {
        super(props)

        this.idleTimer = React.createRef()
    }

    render() {

        const {
            volume,
            audio,
            percentComplete,
            duration,
            currentTime,
            idle,
            hovered,
        } = this.props

        //hasNextSong,
        //hasGenreSelect
        //hasVisualizerSelect
        //hasMetaData

        return <div
            style={{
                ...styles.container,
                opacity: idle ? 0 :
                    hovered ? 1 : 0.6,
                cursor: !hovered && idle ? 'none' : 'auto',
            }}
        >

            <IdleTimer
                ref={this.idleTimer}
                element={document}
                onActive={this.props.setIdleInactive}
                onIdle={!hovered ? this.props.setIdleActive : () => {}}
                debounce={1000}
                timeout={1000 * 2}
            />

            <_Audio/>

            <Controls/>

            <Metadata
                percentComplete={percentComplete}
            />

        </div>
    }
}

export default Player
