export const audio = ({ audio }) => audio
export const volume = ({ volume }) => volume
export const paused = ({ paused }) => paused
export const playing = (paused)  => !paused
export const duration = ({ duration }) => duration
export const currentTime = ({ currentTime }) => currentTime
export const fakeTriggered = ({ fakeTriggered }) => fakeTriggered
export const vm = ({ vm }) => vm
export const visualizerLoaded = ({ visualizerLoaded }) => visualizerLoaded
export const timestamp = ({ timestamp }) => timestamp

export const _Audio = ({ _Audio }) => _Audio || {}

export const ratioComplete = (duration, currentTime) => {
    return (currentTime / duration).toFixed(4)
}

export const percentComplete = (ratioComplete) => {
    return ratioComplete * 100
}
