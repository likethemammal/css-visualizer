import React, { Component } from 'react'

import Bars from './Bars'

class Visualizer extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <Bars color1={'rgb(255,0,0)'} color2={'rgb(255,255,0)'}/>
    }
}

export default Visualizer
