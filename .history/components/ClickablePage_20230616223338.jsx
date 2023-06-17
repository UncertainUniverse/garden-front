import React, { useEffect, useRef, useState, useMemo } from 'react'
import SurroundingNodes from './SurroundingNodes'
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

	const radius = 0.35
	const numCircles = availableNodes
	const childNodes = useMemo(() => {
		const angle = (2 * Math.PI) / numCircles
		const points = []

		for (let i = 0; i < numCircles; i++) {
			const size = Math.abs(Math.random() * 0.05 - 0.025) + 0.01
			const r = Math.sqrt(Math.random()) * radius
			const angle = Math.random() * 2 * Math.PI
			const x = radius * Math.cos(i * angle)
			const y = r * Math.sin(i * angle)
			points.push([x, y, size])
		}

		return points
	}, [numCircles, radius])

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
			<SurroundingNodes
				hoverState={hovered}
				position={[position[0], position[1], -0.75]}
				availableNodes={5}
			/>
		</>
	)
}

export default ClickablePage
