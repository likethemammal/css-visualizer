import React, {Component, Fragment} from 'react'

class DurationChecker extends Component {

    timer = false

    setTimer = () => {
        this.timer = setInterval(() => {
            this.props.onAudioUpdate(this.props.audio)
        }, 50)
    }

    clearTimer = () => {
        clearInterval(this.timer)
    }

    componentDidMount() {
        if (this.props.playing) {
            this.setTimer()
        }
    }

    componentWillUnmount(prevProps) {
        if (this.props.playing && prevProps.paused) {
            this.clearTimer()
        }
    }

    render() {
        return <Fragment />
    }
}

export default DurationChecker
