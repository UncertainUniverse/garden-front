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
	console.log(splitData)
	const upperData = splitData.map((word) => {
		return word[0].toUpperCase() + word.substr(1)
	})
	console.log(upperData)
	const cleanData = upperData.join(' ')
	console.log(cleanData)
	const pageUrl = cleanData.replaceAll(' ', '')
	console.log(pageUrl)
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
}) => {
	const PARAMS = {
		html: { fontSize: isMobile ? '12px' : '16px' },
		mesh: { size: isMobile ? [0.075, 32, 64] : [0.1, 32, 64] },
	}
	const colorMap = useLoader(TextureLoader, 'assets/textures/mcblu2.png')
	const m = useRef()
	const test = useRef()
	const groupRef = useRef()
	const middle = useRef()
	const transit = useRef()
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
				z: 500,
				ease: 'Power4.easeIn',
				duration: 1.75,
				delay: numNodes / 2,
				onComplete: () => router.push(`/nav?data=${navTitle[1]}`),
			})
			// gsap.to(transit.current.scale, {
			// 	x: 3.5,
			// 	y: 3.5,
			// 	z: 3.5,
			// 	ease: 'Power4.easeIn',
			// 	duration: 1.75,
			// 	delay: 2,
			// 	onComplete: () => router.push(`/${navLink}`),
			// })
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
			// gsap.to(middle.current.material.uniforms.uOpacity, {
			// 	value: 0,
			// 	duration: 2.5,
			// 	ease: 'sine.inOut',
			// 	delay: 0,
			// })
		}
	}, [clicked, exited])
	const navTitle = cleanUpData(navData)

	console.log(navTitle[1])
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
						// position={[0, 0, 0.9]}
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
					{/* <meshMatcapMaterial matcap={colorMap} transparent /> */}
				</mesh>
			</group>
			{/* <Meteor ref={transit} /> */}
			{/* <Meteor2 ref={middle} /> */}
			<SurroundingNodes
				hoverState={hovered}
				position={[position[0], position[1], -0.75]}
				availableNodes={5}
			/>
		</>
	)
}

export default ClickablePage
