import React, { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
const ClickablePage = ({
	position,
	onClick,
	clicked,
	exited,
	indexPos,
	availableNodes,
}) => {
	const m = useRef()
	const [hovered, setHovered] = useState(false)
	const handleHoverIn = () => {
		setHovered(true)
	}
	const handleHoverOut = () => {
		setHovered(false)
	}
	const radius = 2
	const surroundingPositions = useMemo(() => {
		const pos = []
		for (let i = 0; i < availableNodes; i++) {
			const angle = (i / availableNodes) * Math.PI * 2
			const x = Math.sin(angle) * radius
			const z = Math.cos(angle) * radius
			pos.push([x, 3.4, z])
		}

		return pos
	}, [count, radius])

	useEffect(() => {
		if (clicked) {
			gsap.to(m.current.position, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1.5,
			})
		}
		if (exited) {
			gsap.to(m.current.material, {
				opacity: 0,
				duration: 1.5,
				ease: 'sine.inOut',
				delay: indexPos * 0.5,
			})
		}
	}, [clicked, exited])
	return (
		<>
			<mesh
				ref={m}
				position={[position[0], position[1], -0.75]}
				onClick={onClick}
				onPointerOver={handleHoverIn}
				onPointerLeave={handleHoverOut}
			>
				<sphereBufferGeometry args={[0.1, 16, 32]} />
				<meshBasicMaterial color={'#4751c5'} transparent />
			</mesh>
		</>
	)
}

export default ClickablePage
