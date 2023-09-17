export const delay = (duration, callback) => {
    setTimeout(() => {
        callback()
    }, duration)
}