import React, { useEffect, useRef, useState, useMemo } from 'react'
import SurroundingNodes from './SurroundingNodes'
import Meteor from './Meteor'
import Meteor2 from './Meteor2'
import { Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { useRouter } from 'next/router'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useFrame } from '@react-three/fiber'

const ClickablePage = ({
	position,
	onClick,
	clicked,
	exited,
	indexPos,
	availableNodes,
	navData,
}) => {
	const colorMap = useLoader(TextureLoader, 'assets/textures/mcblu2.png')
	const m = useRef()
	const test = useRef()
	const groupRef = useRef()
	const middle = useRef()
	const transit = useRef()
	const router = useRouter()
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
			gsap.to(test.current, {
				opacity: 0,
				duration: 0.5,
				ease: 'sine.inOut',
			})
			gsap.to(transit.current.scale, {
				x: 0,
				y: 0,
				z: 0,
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
				delay: 1,
			})
			gsap.to(test.current, {
				opacity: 0,
				duration: 1.5,
				ease: 'sine.inOut',
				delay: 1,
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
							color: 'white',
						}}
						center
						position={[0, 0, 0.55]}
					>
						<div ref={test} className='pageNames'>
							{navTitle}
						</div>
					</Html>
					<sphereGeometry args={[0.1, 32, 64]} />
					<meshMatcapMaterial matcap={colorMap} transparent />
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
