import React, { Component } from 'react'
import Duration from "./Duration.component"

import colors from '../../constants/colors'

const localColors = {
    TEXT: colors.WHITE,
    CONTAINER_SHADOW: colors.BLACK,
}

const metadataHeight = 82
const metadataColumnGap = 15
const containerWidth = 300

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
    }
}

const EXAMPLE_ALBUM = 'https://via.placeholder.com/150'

class Metadata extends Component {

    render() {

        const {
            percentComplete,
            currentSongFormatted,
        } = this.props

        const {
            streamUrl,
            titleName,
            artistName,
            albumSrc,
            titleUrl,
        } = currentSongFormatted || {}

        return <div
                style={styles.container}
                onMouseOut={this.props.setHoverInactive}
                onMouseOver={this.props.setHoverActive}
            >
                <Duration percentComplete={percentComplete}/>

                <div
                    style={styles.album}
                >
                    <img
                        style={styles.albumImg}
                        src={albumSrc || EXAMPLE_ALBUM}
                    />
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
