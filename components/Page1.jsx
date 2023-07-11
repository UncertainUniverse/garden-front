import { Vector3 } from 'three'
import PointCloud from './PointCloud'
import { forwardRef, useEffect, useRef, useState } from 'react'
import IntroBtn from './IntroBtn'
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
			particleCount: !isMobile ? 10000 : 2000,
		},
		p2: {
			minRadius: !isMobile ? 0.85 : 0.425,
			maxRadius: !isMobile ? 1.35 : 0.675,
			particleCount: !isMobile ? 10000 : 2000,
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
	const enterRef = useRef()
	const introBtnRef = useRef()
	enterRef.current = true
	const { scene } = useThree()
	animRef.current = false
	function cleanUp() {
		scene.remove(pointClouds.current)
	}
	// console.log(introBtnRef.current.children[1])

	function handleEnterState() {
		if (enterRef.current) {
			gsap.to(meteorEarth.current.scale, {
				x: 5.5,
				y: 5.5,
				z: 5.5,
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
			gsap.to(mainTitle.current.children[0], {
				fillOpacity: 0,
				ease: 'Power3.easeIn',
				duration: 1.5,
				delay: 2,
			})
			gsap.to(mainTitle.current.children[1], {
				fillOpacity: 0,
				ease: 'Power3.easeIn',
				duration: 1.5,
				delay: 2,
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
			gsap.to(introBtnRef.current.children[0].material, { opacity: 0 })
			gsap.to(introBtnRef.current.children[1], { fillOpacity: 0 })
			enterRef.current = false
		}
	}

	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					gsap.to(meteorEarth.current.scale, {
						x: 5.5,
						y: 5.5,
						z: 5.5,
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
					gsap.to(mainTitle.current.children[0], {
						fillOpacity: 0,
						ease: 'Power3.easeIn',
						duration: 1.5,
						delay: 2,
					})
					gsap.to(mainTitle.current.children[1], {
						fillOpacity: 0,
						ease: 'Power3.easeIn',
						duration: 1.5,
						delay: 2,
					})
					console.log(mainTitle.current.children[0])

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

			<Meteor ref={meteorEarth} />
			<MainTitle ref={mainTitle} opacity={1} />
			{isMobile ?? (
				<IntroBtn
					position={[0, -0.75, 0]}
					enterState={handleEnterState}
					ref={introBtnRef}
				/>
			)}
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
