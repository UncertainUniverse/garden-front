import { Vector3 } from 'three'
import PointCloud from './PointCloud'
import DebugSphere from './DebugSphere'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { isMobile } from 'react-device-detect'
import { useThree } from '@react-three/fiber'
import MainTitle from './MainTItle'
import Meteor from './Meteor'
import { useRouter } from 'next/router'

const Page1 = forwardRef((props, ref) => {
	const PARAMS = {
		p1: {
			minRadius: !isMobile ? 1.0 : 0.5,
			maxRadius: !isMobile ? 1.5 : 0.75,
			particleCount: !isMobile ? 10000 : 5000,
		},
		p2: {
			minRadius: !isMobile ? 0.85 : 0.425,
			maxRadius: !isMobile ? 1.35 : 0.675,
			particleCount: !isMobile ? 10000 : 5000,
		},
	}

	const pointer = new Vector3()
	const floor = useRef()
	const animRef = useRef()
	const meteorEarth = useRef()
	const pointClouds = useRef()
	const mainTitle = useRef()
	const pRef = useRef()
	const pRef2 = useRef()
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

					animRef.current = true
				}
			}
		}

		// let touchStartY
		// const handleTouchStart = (event) => {
		// 	touchStartY = event.touches[0].clientY
		// }

		// const handleTouchEnd = (event) => {
		// 	const deltaY = touchStartY - event.changedTouches[0].clientY
		// 	console.log(deltaY)
		// 	if (!animRef.current) {
		// 		if (deltaY >= 75) {
		// 			console.log('running touch bro')
		// 			// adjust this value to meet your specific touch sensitivity requirements
		// 			gsap.to(meteorEarth.current.scale, {
		// 				x: 3.5,
		// 				y: 3.5,
		// 				z: 3.5,
		// 				ease: 'Power4.easeIn',
		// 				duration: 1.75,
		// 				delay: 2.0,
		// 				onComplete: () => router.push('/IntroNav'),
		// 			})
		// 			gsap.to(mainTitle.current.children[0].scale, {
		// 				x: 0.15,
		// 				y: 0.15,
		// 				z: 0.15,
		// 				ease: 'Power3.easeIn',
		// 				duration: 2.5,
		// 			})
		// 			gsap.to(mainTitle.current.children[1].scale, {
		// 				x: 0.15,
		// 				y: 0.15,
		// 				z: 0.15,
		// 				ease: 'Power3.easeIn',
		// 				duration: 2.5,
		// 			})
		// 			gsap.to(mainTitle.current.children[0].position, {
		// 				y: 0.05,
		// 				ease: 'Power3.easeIn',
		// 				duration: 2.5,
		// 			})
		// 			gsap.to(mainTitle.current.children[1].position, {
		// 				y: -0.1,
		// 				ease: 'Power3.easeIn',
		// 				duration: 2.5,
		// 			})
		// 			gsap.to(pRef.current.position, {
		// 				z: -13,
		// 				ease: 'Power4.easeIn',
		// 				duration: 3,
		// 			})
		// 			gsap.to(pRef2.current.position, {
		// 				z: -13,
		// 				ease: 'Power4.easeIn',
		// 				duration: 3,
		// 				onComplete: () => cleanUp(pRef2),
		// 			})
		// 			animRef.current = true
		// 		}
		// 	}
		// }

		// window.addEventListener('touchstart', handleTouchStart)
		// window.addEventListener('touchend', handleTouchEnd)
		window.addEventListener('wheel', handleWheel, { passive: false })
		return () => {
			window.removeEventListener('wheel', handleWheel)
			// window.removeEventListener('touchstart', handleTouchStart)
			// window.removeEventListener('touchend', handleTouchEnd)
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

			<Meteor ref={meteorEarth} />
			<MainTitle ref={mainTitle} />

			<group ref={pointClouds}>
				<PointCloud
					ref={pRef}
					indexPage={true}
					minRadius={PARAMS.p1.minRadius}
					maxRadius={PARAMS.p1.maxRadius}
					pointer={pointer}
					theatre={false}
					color={'#ff8c21'}
					rotation={[Math.PI / 2, 0, 0]}
					spread={1.0}
					size={1.0}
					count={PARAMS.p2.particleCount}
					opacity={0.0}
					center={[0, 0, 0]}
				/>
				<PointCloud
					ref={pRef2}
					indexPage={true}
					minRadius={PARAMS.p2.minRadius}
					maxRadius={PARAMS.p2.maxRadius}
					color={'#3190cb'}
					theatre={false}
					spread={1.0}
					size={0.5}
					rotation={[Math.PI / 2, 0, 0]}
					count={PARAMS.p2.particleCount}
					opacity={0.0}
					center={[0, 0, 0]}
				/>
			</group>
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
