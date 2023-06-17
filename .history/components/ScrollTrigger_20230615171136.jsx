import React, { useEffect, useRef } from 'react'

export function ScrollTrigger(callback) {
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			callback(event)
		}
	})

	window.addEventListener('wheel', handleWheel, { passive: false })
	return () => {
		window.removeEventListener('wheel', handleWheel)
	}
}
