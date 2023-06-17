import React, { useEffect, useRef, useState, useMemo } from 'react'
import SurroundingNodes from './SurroundingNodes'
import Meteor from './Meteor'
import { Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { useRouter } from 'next/router'

const ClickablePage = ({
	position,
	onClick,
	clicked,
	exited,
	indexPos,
	availableNodes,
	navData,
}) => {
	const m = useRef()
	const groupRef = useRef()
	const transit = useRef()
	const router = useRouter()
	// const exited = useState(false)
	const [hovered, setHovered] = useState(false)
	const handleHoverIn = () => {
		if (!exited && !clicked) {
			setHovered(true)
		}
	}
	const handleHoverOut = () => {
		if (!exited) {
			setHovered(false)
		}
	}

	useEffect(() => {
		if (clicked) {
			gsap.to(m.current.position, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1.5,
			})
			gsap.to(transit.current.scale, {
				x: 3.5,
				y: 3.5,
				z: 3.5,
				ease: 'Power4.easeIn',
				duration: 1.75,
				delay: 2,
				onComplete: () => router.push(`/${navLink}`),
			})
		}
		if (exited) {
			gsap.to(m.current.material, {
				opacity: 0,
				duration: 1.5,
				ease: 'sine.inOut',
				delay: indexPos * 0.5,
			})
			gsap.to('.pageNames', {
				opacity: 0,
				duration: 1.5,
				ease: 'sine.inOut',
				delay: indexPos * 1.5,
			})
		}
	}, [clicked, exited])

	const navLink = Object.keys(navData)
	const navTitle = navData[`${navLink[0]}`]
	return (
		<>
			<group ref={groupRef} opacity={0}>
				<mesh
					ref={m}
					position={[position[0], position[1], -0.75]}
					onClick={onClick}
					onPointerOver={handleHoverIn}
					onPointerLeave={handleHoverOut}
				>
					<Html
						style={{
							pointerEvents: 'none',
							width: '200px',
							textAlign: 'center',
						}}
						center
						position={[0, 0, 0.55]}
					>
						<div ref={test} className='pageNames'>
							{navTitle}
						</div>
					</Html>
					<sphereBufferGeometry args={[0.1, 16, 32]} />
					<meshBasicMaterial color={'#4751c5'} transparent />
				</mesh>
			</group>
			<Meteor ref={transit} />
			<SurroundingNodes
				hoverState={hovered}
				position={[position[0], position[1], -0.75]}
				availableNodes={5}
			/>
		</>
	)
}

export default ClickablePage
