import React, {Component, Fragment} from 'react'

class DurationChecker extends Component {

    timer = false

    componentDidMount() {
        this.timer = setInterval(() => {
            this.props.onAudioUpdate(this.props.audio)
        }, 50)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return <Fragment />
    }
}

export default DurationChecker
