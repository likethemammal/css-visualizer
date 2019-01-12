import React, { Component } from 'react'
import randomColor from 'randomcolor'

import Bars from './Bars'

const color1 = randomColor()
const color2 = randomColor()

class Visualizer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <Bars color1={color1} color2={color2}/>
    }
}

export default Visualizer
