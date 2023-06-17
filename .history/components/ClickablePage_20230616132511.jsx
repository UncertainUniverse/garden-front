import React, { useEffect, useRef, useState } from 'react'
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
	useEffect(() => {
		if (clicked) {
			gsap.to(m.current.position, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1,
			})
		}
		if (exited) {
			gsap.to(m.current.material, {
				opacity: 0,
				duration: 1,
				ease: 'sine.inOut',
				delay: indexPos * 0.3,
			})
		}
	}, [clicked, exited])
	return (
		<>
			{/* <mesh
				ref={m}
				position={[position[0], position[1], 0]}
				onClick={onClick}
				onPointerOver={handleHoverIn}
				onPointerLeave={handleHoverOut}
			> */}
			<mesh>
				<sphereBufferGeometry args={[1.5, 16, 32]} />
				<meshBasicMaterial
					color={hovered ? 'blue' : 'red'}
					transparent
				/>
			</mesh>
			{/* </mesh> */}
		</>
	)
}

export default ClickablePage
