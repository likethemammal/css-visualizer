import React, {Component, createRef, useEffect, useRef, useState} from 'react'
import { Styled } from 'styled-jss'

import anime from 'animejs'

import Duration from "./Duration.component"

import colors from '../../constants/colors'

const localColors = {
    TEXT: colors.WHITE,
    CONTAINER_SHADOW: colors.BLACK,
}

const metadataHeight = 82
const metadataColumnGap = 15
const containerWidth = 300

const circleSize = 13
const paddingSize = 23

const translateYEnd = metadataHeight - circleSize - paddingSize

const startY = paddingSize
const endY = translateYEnd

const startBackground = `hsl(0, 0%, 50%)`
const endBackground = `hsl(0, 0%, 80%)`

const words = {
    fontFamily: `"Helvetica Neue", sans-serif`,
    color: localColors.TEXT,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textDecoration: "none",
    '&:hover': {
        textDecoration: 'underline'
    }
}
const styles = {
    container: {
        maxWidth: containerWidth,
        // width: '100%',
        height: metadataHeight,
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        marginLeft: 30,
        marginBottom: 30,
        display: 'grid',
        gridTemplateColumns: `${metadataHeight}px auto`,
        gridColumnGap: metadataColumnGap,
        boxShadow: `0px 3px 5px ${localColors.CONTAINER_SHADOW}`,
        borderRadius: 2,
        overflow: 'hidden'
    },
    album: {
        width: metadataHeight,
        height: metadataHeight,
        borderRadius: '2px 0 0 2px',
        overflow: 'hidden'
    },
    albumImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    metadata: {
        paddingTop: 15,
        paddingRight: 15,
        width: containerWidth - (metadataHeight + metadataColumnGap),
    },
    title: {
        display: 'block',
        ...words,
        opacity: 0.8,
    },
    artist: {
        ...words,
        textTransform: 'uppercase',
        paddingBottom: 5,
    },
    circle: {
        transform: `translateY(${startY}px)`,
        width: circleSize,
        height: circleSize,
        background: startBackground,
        borderRadius: `50%`,
    },
    loadingContainer: {
        display: 'grid',
        gridTemplateColumns: `repeat(3, 1fr)`,
        paddingLeft: 10,
        paddingRight: 10,
        justifyItems: 'center',
    },
    circleContainer: {
    }
}

const EXAMPLE_ALBUM = 'https://via.placeholder.com/150'

const localStyled = Styled(styles)

const div = localStyled('div')

const Circle = div({
    composes: '$circle',
})

const LoadingContainer = div({
    composes: '$loadingContainer'
})

const CircleContainer = div({
    composes: '$circleContainer'
})


const Loading = () => {

    const length = 3
    const refs = [...Array(length)].map(createRef)

    useEffect(() => {

        const duration = 1000
        const targets = refs.map(({ current }) => current)

        const shineDuration = 700
        const offset = 200

        const tl = anime.timeline({
            easing: 'easeOutQuad',
            duration,
            loop: true,
        })

        tl.add({
            targets,
            translateY: endY,
            delay: anime.stagger(100)
        })

        tl.add({
            targets,
            translateY: startY,
            delay: anime.stagger(100)
        })

        const tl2 = anime.timeline({
            easing: 'easeOutQuad',
            duration: shineDuration,
            endDelay: offset + duration - shineDuration,
            loop: true,
            delay: 0,
        })

        tl2.add({
            targets,
            keyframes: [
                {background: startBackground},
                {background: endBackground},
                {background: startBackground},
            ],
            delay: anime.stagger(100)
        }, `-=${offset}`)

        tl2.add({
            targets,
            keyframes: [
                {background: startBackground},
                {background: endBackground},
                {background: startBackground},
            ],
            delay: anime.stagger(100)
        }, `-=${offset}`)

    })

    return <LoadingContainer>
        {[...Array(length)].map((_, i) => {
            return <CircleContainer
                key={i}
            >
                <div
                    ref={refs[i]}
                    style={
                        styles.circle
                    }
                />
            </CircleContainer>
        })}
    </LoadingContainer>
}

class Metadata extends Component {

    render() {

        const {
            timeLeft,
            paused,
            ratioComplete,
            currentSongFormatted,
        } = this.props

        const {
            streamUrl,
            titleName,
            artistName,
            albumSrc,
            titleUrl,
        } = currentSongFormatted || {}

        const album = <img
            style={styles.albumImg}
            src={albumSrc}
        />

        return <div
                style={styles.container}
                onMouseOut={this.props.setHoverInactive}
                onMouseOver={this.props.setHoverActive}
            >
                <Duration
                    paused={paused}
                    timeLeft={timeLeft}
                    ratioComplete={ratioComplete}
                />

                <div
                    style={styles.album}
                >
                    {albumSrc ? album : <Loading/>}
                </div>

                <div
                    style={styles.metadata}
                >
                    <div
                        style={styles.artist}
                    >
                        {artistName}
                    </div>
                    <a
                        style={styles.title}
                        href={titleUrl}
                    >
                        {titleName}
                    </a>
                </div>
            </div>
    }
}

export default Metadata
