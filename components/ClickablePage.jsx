import React, { useEffect, useRef, useState, useMemo } from 'react'
import SurroundingNodes from './SurroundingNodes'
import Meteor from './Meteor'
// import Meteor2 from './Meteor2'
import { Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { useRouter } from 'next/router'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Circle } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'

function cleanUpData(data) {
	const navTitle = data
	const splitData = navTitle.split('-')
	const upperData = splitData.map((word) => {
		return word[0].toUpperCase() + word.substr(1)
	})
	const cleanData = upperData.join(' ')
	const pageUrl = cleanData.replaceAll(' ', '')
	return [cleanData, pageUrl]
}
const ClickablePage = ({
	position,
	onClick,
	clicked,
	exited,
	indexPos,
	availableNodes,
	numNodes,
	navData,
	isMobile,
	dbURL,
	setDB,
}) => {
	const PARAMS = {
		html: { fontSize: isMobile ? '12px' : '16px' },
		mesh: { size: isMobile ? [0.075, 32, 64] : [0.1, 32, 64] },
	}
	const m = useRef()
	const test = useRef()
	const groupRef = useRef()
	const router = useRouter()
	const { camera } = useThree()
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

	const pageTransition = () => {
		if (setDB) {
			// setDB(navTitle[1])
		}
		router.push(`/nav?data=${navTitle[1]}`)
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
			gsap.to(camera.position, {
				z: 200,
				ease: 'Power4.easeIn',
				duration: 1.75,
				delay: numNodes / 2,
				onComplete: pageTransition,
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
	const navTitle = cleanUpData(navData)

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
							backgroundColor: 'transparent',
							fontSize: PARAMS.html.fontSize,
						}}
						center
					>
						<div ref={test} className='pageNames'>
							{navTitle[0]}
						</div>
					</Html>
					<sphereGeometry args={PARAMS.mesh.size} />
					<meshBasicMaterial
						color='#1C7FFF'
						transparent
						opacity={1}
					/>
				</mesh>
			</group>
			<SurroundingNodes
				hoverState={hovered}
				position={[position[0], position[1], -0.75]}
				availableNodes={5}
			/>
		</>
	)
}

export default ClickablePage
