import React, { Component } from 'react'

import colors from '../../constants/colors'

import { Icon } from 'react-icons-kit'
import { ic_play_arrow } from 'react-icons-kit/md/ic_play_arrow'
import { ic_skip_next } from 'react-icons-kit/md/ic_skip_next'
import { ic_volume_up } from 'react-icons-kit/md/ic_volume_up'
import { ic_volume_off } from 'react-icons-kit/md/ic_volume_off'
import { ic_volume_down } from 'react-icons-kit/md/ic_volume_down'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_pause } from 'react-icons-kit/md/ic_pause'

const localColors = {
    ICON: colors.WHITE,
    BACKGROUND: colors.DARK_GREY,
    ICON_HOVER_BACKGROUND: colors.DARK_GREY,
}

const iconHeight = 39
const iconPadding = 5
const iconPaddingVertical = iconPadding + 1
const iconCalculatedSize = iconHeight + (iconPadding * 2)

const styles = {
    container: {
        color: localColors.ICON,
        background: localColors.BACKGROUND,
    },
    iconContainer: {
        padding: iconPadding,
        paddingTop: iconPaddingVertical,
        paddingBottom: iconPaddingVertical,
        cursor: 'pointer',
        height: iconHeight,
        width: iconHeight,
        background: localColors.BACKGROUND,
        '&:hover': {
            background: localColors.ICON_HOVER_BACKGROUND,
        }
    },
    row: {
        display: 'grid',
        gridTemplateColumns: `repeat(3, ${iconCalculatedSize}px) auto`,
        gridColumnGap: 0,
    },
    slider: {
        marginRight: 15,
    }
}

const SimpleIcon = ({ icon, onClick}) => {
    return <div onClick={() => onClick()} style={styles.iconContainer}>
        <Icon icon={icon} size={iconHeight}/>
    </div>
}

class Controls extends Component {

    render() {

        const {
            volume,
            audio,
            percentComplete,
            duration,
            currentTime,
            playing,
            paused,
        } = this.props

        return <div
                style={styles.container}
            >
            <div style={styles.row}>
                <SimpleIcon icon={paused ? ic_play_arrow : ic_pause} onClick={this.props.onPlay}/>
                <SimpleIcon icon={ic_skip_next} onClick={this.props.onPlay}/>
                <SimpleIcon icon={ic_volume_up} onClick={this.props.onPlay}/>
                <input
                    type="range"
                    value={volume}
                    onChange={this.props.onVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    style={styles.slider}
                />
            </div>
            <SimpleIcon icon={ic_refresh} onClick={this.props.resetColors}/>
        </div>
    }
}

export default Controls


