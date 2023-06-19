import { Vector3 } from 'three'
import PointCloud from './PointCloud'
import DebugSphere from './DebugSphere'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import LandingMiddle from './LandingMiddle'
import { useThree } from '@react-three/fiber'
import MainTitle from './MainTItle'
import Meteor from './Meteor'
import { useRouter } from 'next/router'

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
	const router = useRouter()
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
						x: 3.5,
						y: 3.5,
						z: 3.5,
						ease: 'Power4.easeIn',
						duration: 1.75,
						delay: 2.0,
						onComplete: () => router.push('/IntroNav'),
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
					// gsap.to(pRef3.current.position, {
					// 	z: -0.75,
					// 	ease: 'Power4.easeIn',
					// 	duration: 2.75,
					// })

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
					color={'#ff8c21'}
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
					color={'#3190cb'}
					theatre={false}
					spread={1.0}
					size={0.5}
					rotation={[Math.PI / 2, 0, 0]}
					count={10000}
					opacity={0.0}
					center={[0, 0, 0]}
				/>
			</group>
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
