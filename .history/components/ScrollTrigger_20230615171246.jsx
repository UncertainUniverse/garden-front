import React, { useEffect, useRef } from 'react'

export function ScrollTrigger(callback) {
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					setActive(true)
					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [callback])
}
