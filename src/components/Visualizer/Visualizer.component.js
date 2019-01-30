import React, { Component } from 'react'

import _ from 'lodash'

import { visualizersOrdered } from '../../constants/visualizerComponents'


class Visualizer extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.onLoad()
    }

    render() {

        const {
            visualizerIndex,
        } = this.props

        const Current = visualizersOrdered[visualizerIndex]

        return <Current />
    }
}

export default Visualizer
