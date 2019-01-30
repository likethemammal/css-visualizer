import React, { Component } from 'react'

import colors from '../../constants/colors'
import { genres, GITHUB_LINK, } from '../../constants/app'
import { visualizerLabelsOrdered, } from '../../constants/visualizerComponents'

import { toggleFullscreen } from '../../units/utils/general'

import { Icon } from 'react-icons-kit'
import { ic_play_arrow } from 'react-icons-kit/md/ic_play_arrow'
import { ic_skip_next } from 'react-icons-kit/md/ic_skip_next'
import { ic_volume_up } from 'react-icons-kit/md/ic_volume_up'
import { ic_volume_off } from 'react-icons-kit/md/ic_volume_off'
import { ic_volume_down } from 'react-icons-kit/md/ic_volume_down'
import { ic_refresh } from 'react-icons-kit/md/ic_refresh'
import { ic_pause } from 'react-icons-kit/md/ic_pause'
import { ic_fullscreen } from 'react-icons-kit/md/ic_fullscreen'
import { github } from 'react-icons-kit/entypo/github'

import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { withStyles } from '@material-ui/core/styles'

export const localColors = {
    ICON: colors.WHITE,
    BACKGROUND: colors.DARK_GREY,
    ICON_HOVER_BACKGROUND: colors.DARK_GREY,
    CONTAINER_SHADOW: colors.BLACK,
}

const iconHeight = 34
const iconPadding = 5
const iconPaddingVertical = iconPadding + 1
const iconCalculatedSize = iconHeight + (iconPadding * 2)

const swatchWidth = 26
const swatchHeight = swatchWidth * (33/30)
const swatchPadding = 5
const swatchCalculatedSize = swatchWidth + (swatchPadding * 2)

const iconContainer = {
    padding: iconPadding,
    paddingTop: iconPaddingVertical,
    paddingBottom: iconPaddingVertical,
    cursor: 'pointer',
    height: iconHeight,
    width: iconHeight,
    background: localColors.BACKGROUND,
    '&:hover': {
        background: localColors.ICON_HOVER_BACKGROUND,
    },
}

export const styles = {
    container: {
        color: localColors.ICON,
        background: localColors.BACKGROUND,
        maxWidth: 300,
        marginLeft: 30,
        marginTop: 30,
        boxShadow: `0px 3px 5px ${localColors.CONTAINER_SHADOW}`,
        borderRadius: 2,
        overflow: 'hidden'
    },
    iconContainer,
    linkContainer: {
        ...iconContainer,
        position: 'relative',
        // top: 3,
        '&:visited': {
            color: 'inherit',
        }
    },
    row: {
        display: 'grid',
        gridTemplateColumns: `repeat(3, ${iconCalculatedSize}px) auto`,
        gridColumnGap: 0,
    },
    colorRow: {
        display: 'grid',
        gridColumnGap: 0,
        paddingLeft: 8,
        paddingBottom: 10,
    },
    iconRow: {
        display: 'grid',
        paddingLeft: 5,
        paddingBottom: 10,
    },
    slider: {
        marginRight: 15,
        paddingRight: 5,
        paddingLeft: 5,
    },
    swatch: {
        width: swatchWidth,
        height: swatchHeight,
        border: 'none',
        margin: 0,
        padding: swatchPadding,
        background: 'none',
        transition: '5000ms linear'
    },
    swatchContainer: {
        paddingTop: 5,
    },
}

const selectStyles = {
    select_root: {
        colors: colors.WHITE,
        display: 'flex',
        flexWrap: 'wrap',
    },
    select: {
        color: colors.WHITE,
        paddingLeft: 15,
    },
    label_root: {
        color: colors.WHITE,
        paddingLeft: 20,
    },
    label_focused: {
        color: `${colors.WHITE} !important`,
    },
    icon: {
        color: colors.WHITE,
    },
}

const SimpleIcon = ({ icon, onClick, href, size }) => {

    const iconComponent = <Icon icon={icon} size={size || iconHeight}/>

    return href ? <a
        href={href}
        target={'_blank'}
        style={styles.linkContainer}
    >
        {iconComponent}
    </a> : <div
        onClick={() => onClick()}
        style={styles.iconContainer}
    >
        {iconComponent}
    </div>
}

const ColorSwatch = ({value, onChange, index}) => {
    return <div style={styles.swatchContainer}><input
        style={styles.swatch}
        type={'color'}
        value={value}
        onChange={(ev) => onChange(ev.target.value, index)}
    /></div>
}

const SelectComponent = withStyles(selectStyles)(({
    classes, label, items, value, onChange, name,
}) => {
    return <FormControl className={classes.formControl}>

        <InputLabel
            classes={{
                root: classes.label_root,
                focused: classes.label_focused,
            }}
            htmlFor="select-item">{label}</InputLabel>
        <Select
            value={value}
            onChange={ev => onChange(ev.target.value)}
            inputProps={{
                name,
                id: 'select-item'
            }}
            classes={{
                select: classes.select,
                root: classes.select_root,
                icon: classes.icon,
            }}
        >
            {items.map((item, i) => {
                return <MenuItem key={i} value={i}>
                    {item}
                </MenuItem>
            })}
        </Select>
    </FormControl>
})

class Controls extends Component {

    render() {

        const {
            volume,
            volumeFormatted,
            muted,
            audio,
            percentComplete,
            duration,
            currentTime,
            playing,
            numColors,
            genreIndex,
            visualizerIndex,
            paused,
            colors = [],
            classes,
        } = this.props

        return <div
                style={styles.container}
                onMouseOut={this.props.setHoverInactive}
                onMouseOver={this.props.setHoverActive}
            >
            <div style={styles.row}>
                <SimpleIcon icon={paused ? ic_play_arrow : ic_pause} onClick={this.props.onPlay}/>
                <SimpleIcon icon={ic_skip_next} onClick={this.props.onNext}/>
                <SimpleIcon icon={muted ? ic_volume_off : ic_volume_up} onClick={this.props.onVolumeMuteToggle}/>
                <input
                    type="range"
                    value={volumeFormatted}
                    onChange={this.props.onVolumeChange}
                    min={0}
                    max={1}
                    step={0.01}
                    style={styles.slider}
                />
            </div>
            <div style={{
                ...styles.colorRow,
                gridTemplateColumns: `repeat(${numColors}, ${swatchCalculatedSize}px) repeat(3, ${iconCalculatedSize}px) auto`,
            }}>
                {colors.map((color, i) => {
                    return <ColorSwatch
                        key={i}
                        index={i}
                        value={color}
                        onChange={this.props.setColor}
                    />
                })}
                <SimpleIcon icon={ic_refresh} onClick={this.props.resetColors}/>
                <SimpleIcon icon={ic_fullscreen} onClick={toggleFullscreen}/>
                <SimpleIcon icon={github} href={GITHUB_LINK} size={34}/>
            </div>

            <SelectComponent
                label={'Genre'}
                value={genreIndex}
                name={'genreIndex'}
                items={genres}
                onChange={this.props.setGenre}
            />

            <SelectComponent
                label={'Visualizer'}
                value={visualizerIndex}
                name={'visualizerIndex'}
                items={visualizerLabelsOrdered}
                onChange={this.props.setVisualizer}
            />

        </div>
    }
}

export default withStyles(styles)(Controls)


