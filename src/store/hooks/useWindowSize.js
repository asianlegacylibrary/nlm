import { useEffect, useState } from 'react'

const debounce = (func, delay) => {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

export function useWindowSize(delay = 200) {
    const isClient = typeof window === 'object'

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        }
    }

    const [windowSize, setWindowSize] = useState(getSize)

    useEffect(() => {
        if (!isClient) {
            return false
        }

        function handleResize() {
            setWindowSize(getSize())
        }

        window.addEventListener('resize', debounce(handleResize, delay))
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        // eslint-disable-next-line
    }, []) // Empty array ensures that effect is only run on mount and unmount

    return windowSize
}
