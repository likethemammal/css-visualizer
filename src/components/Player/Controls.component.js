import React, { Component } from 'react'

import colors from '../../constants/colors'

import { Icon } from 'react-icons-kit'
import { ic_play_arrow } from 'react-icons-kit/md/ic_play_arrow'

const localColors = {
}

const styles = {
    container: {
        color: 'red'
    },

}

class Controls extends Component {

    render() {

        const {

        } = this.props

        return <div
                style={styles.container}
            >
            <Icon icon={ic_play_arrow} size={50}/>
        </div>
    }
}

export default Controls


