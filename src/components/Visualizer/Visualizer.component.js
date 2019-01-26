import React, { Component } from 'react'

import Bars from './Bars'
import Hexagons from './Hexagons'

class Visualizer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <Hexagons />
    }
}

export default Visualizer
