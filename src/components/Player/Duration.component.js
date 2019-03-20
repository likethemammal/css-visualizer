import React, {createRef, useEffect} from 'react'

import colors from '../../constants/colors'
import anime from "animejs"

const localColors = {
    OVERLAY_BACKGROUND: colors.WHITE,
    BACKGROUND: colors.DARK_GREY,
}

const Duration = ({ timeLeft, ratioComplete, paused }) => {

    const ref = createRef()
    const percentLeft = 1 - ratioComplete
    const startLeft = `-${100 * percentLeft}%`

    // useEffect(() => {
    //     const animation = anime({
    //         targets: ref.current,
    //         left: `0%`,
    //         duration: timeLeft,
    //         easing: 'linear',
    //     })
    // })

    return <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: localColors.BACKGROUND,
        top: 0,
        zIndex: -1
    }}>
        <div
            ref={ref}
            style={{
                width: `100%`,
                position: 'relative',
                left: startLeft,
                background: localColors.OVERLAY_BACKGROUND,
                opacity: 0.25,
                height: '100%'
            }}
        />
    </div>
}

export default Duration
