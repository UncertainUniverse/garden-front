import { Vector3 } from 'three'
import PointCloud from './PointCloud'
import DebugSphere from './DebugSphere'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import LandingMiddle from './LandingMiddle'
import { useThree } from '@react-three/fiber'
import MainTitle from './MainTItle'
import Meteor from './Meteor'

const Page1 = forwardRef((props, ref) => {
	const pointer = new Vector3()
	const floor = useRef()
	const animRef = useRef()
	const middleEarth = useRef()
	const meteorEarth = useRef()
	const pointClouds = useRef()
	const mainTitle = useRef()
	const pRef = useRef()
	const pRef2 = useRef()
	const pRef3 = useRef()
	const { scene } = useThree()
	animRef.current = false
	function cleanUp() {
		scene.remove(pointClouds.current)
	}

	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					gsap.to(meteorEarth.current.scale, {
						x: 0.7,
						y: 0.7,
						z: 0.7,
						// ease: 'Power1.easeIn',
						duration: 2,
						// delay: 2,
					})
					gsap.to(mainTitle.current.children[0].scale, {
						x: 0.15,
						y: 0.15,
						z: 0.15,
						ease: 'Power3.easeIn',
						duration: 2.5,
					})
					gsap.to(mainTitle.current.children[1].scale, {
						x: 0.15,
						y: 0.15,
						z: 0.15,
						ease: 'Power3.easeIn',
						duration: 2.5,
					})
					gsap.to(mainTitle.current.children[0].position, {
						y: 0.05,
						ease: 'Power3.easeIn',
						duration: 2.5,
					})
					gsap.to(mainTitle.current.children[1].position, {
						y: -0.1,
						ease: 'Power3.easeIn',
						duration: 2.5,
					})
					gsap.to(pRef.current.position, {
						z: -13,
						ease: 'Power4.easeIn',
						duration: 3,
					})
					gsap.to(pRef2.current.position, {
						z: -13,
						ease: 'Power4.easeIn',
						duration: 3,
						onComplete: () => cleanUp(pRef2),
					})
					gsap.to(pRef3.current.position, {
						z: -1,
						ease: 'Power4.easeIn',
						duration: 2,
					})

					animRef.current = true
				}
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
		}
	}, [])
	return (
		<>
			<mesh
				ref={floor}
				onPointerMove={(e) => {
					pointer.copy(e.intersections[0].point)
				}}
			>
				<planeGeometry args={[10, 10, 10, 10]} />
				<meshBasicMaterial visible={false} />
			</mesh>
			<DebugSphere
				pos={pointer}
				size={[0.06, 32, 16]}
				rotation={[Math.PI / 2, 0, 0]}
			/>
			<LandingMiddle ref={middleEarth} />
			<Meteor ref={meteorEarth} />
			<MainTitle ref={mainTitle} />

			<group ref={pointClouds}>
				<PointCloud
					ref={pRef}
					indexPage={true}
					minRadius={1.0}
					maxRadius={1.5}
					pointer={pointer}
					theatre={false}
					color={'#f7b373'}
					rotation={[Math.PI / 2, 0, 0]}
					spread={1.0}
					size={1.0}
					count={10000}
					opacity={0.0}
					center={[0, 0, 0]}
				/>
				<PointCloud
					ref={pRef2}
					indexPage={true}
					minRadius={0.85}
					maxRadius={1.35}
					color={'#88b3ce'}
					theatre={false}
					spread={1.0}
					size={0.5}
					rotation={[Math.PI / 2, 0, 0]}
					count={10000}
					opacity={0.0}
					center={[0, 0, 0]}
				/>
			</group>
			<PointCloud
				ref={pRef3}
				position={[0, 0, 3]}
				indexPage={true}
				minRadius={2}
				maxRadius={2}
				color={'#fff'}
				theatre={false}
				spread={0.0}
				size={0.1}
				rotation={[Math.PI / 2, 0, 0]}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
