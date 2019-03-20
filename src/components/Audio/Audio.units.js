export const audio = ({ audio }) => audio
export const volume = ({ volume }) => volume
export const paused = ({ paused }) => {
    return paused
}
export const duration = ({ duration }) => {
    return duration
}
export const currentTime = ({ currentTime }) => currentTime
export const fakeTriggered = ({ fakeTriggered }) => fakeTriggered
export const vm = ({ vm }) => vm
export const visualizerLoaded = ({ visualizerLoaded }) => visualizerLoaded
export const timestamp = ({ timestamp }) => timestamp
export const playing = (paused)  => !paused
export const muted = ({ muted })  => muted

export const volumeFormatted = (volume, muted) => {
    return volume
}


export const _Audio = ({ _Audio }) => _Audio || {}

export const ratioComplete = (duration, currentTime) => {
    return (currentTime / duration).toFixed(4)
}

export const percentComplete = (ratioComplete) => {
    return ratioComplete * 100
}

export const timeLeft = (duration, currentTime) => {
    return (duration - currentTime).toFixed(4)
}
