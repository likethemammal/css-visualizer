import React from 'react'
import DurationChecker from "./DurationChecker"

import colors from '../../constants/colors'

const localColors = {
    OVERLAY_BACKGROUND: colors.WHITE,
    BACKGROUND: colors.DARK_GREY,
}

const Duration = ({ percentComplete }) => {
    return <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: localColors.BACKGROUND,
        top: 0,
        zIndex: -1
    }}>
        <div style={{
            width: `${percentComplete}%`,
            background: localColors.OVERLAY_BACKGROUND,
            opacity: 0.25,
            height: '100%'
        }}/>
        <DurationChecker/>
    </div>
}

export default Duration
