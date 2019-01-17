import React, {Component, Fragment} from 'react'

class DurationChecker extends Component {
    componentDidMount() {
        setInterval(() => {
            this.props.onAudioUpdate(this.props.audio)
        }, 1000)
    }

    render() {
        return <Fragment />
    }
}

export default DurationChecker
