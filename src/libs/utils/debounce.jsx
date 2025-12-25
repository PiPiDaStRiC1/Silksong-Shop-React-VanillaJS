export const debounce = (func, delay) => {
    let prevTimer = null;

    return (...args) => {
        clearTimeout(prevTimer);

        prevTimer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}