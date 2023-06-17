import { Vector3 } from 'three'
import PointCloud from './PointCloud'
import DebugSphere from './DebugSphere'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import LandingMiddle from './LandingMiddle'
import MainTitle from './MainTItle'
const Page1 = forwardRef((props, ref) => {
	const pointer = new Vector3()
	const floor = useRef()
	const animRef = useRef()
	const middleEarth = useRef()
	const mainTitle = useRef()
	const pRef = useRef()
	const pRef2 = useRef()
	// const [active, setActive] = useState(false)
	animRef.current = false
	// ScrollTrigger((event) => {
	// 	if (!animRef.current) {
	// 		if (event.deltaY >= 25) {
	// 			setActive(true)
	// 			console.log('hi')
	// 			animRef.current = true
	// 		}
	// 	}
	// })
	useEffect(() => {
		const handleWheel = (event) => {
			event.preventDefault()
			if (!animRef.current) {
				if (event.deltaY >= 25) {
					gsap.to(middleEarth.current.position, {
						z: -0.55,
						duration: 2,
					})
					gsap.to(mainTitle.current.children[0], {
						scale: 0,
						duration: 2,
					})
					gsap.to(pRef.current.position, { z: -7, duration: 3 })
					gsap.to(pRef2.current.position, { z: -7, duration: 3 })

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
			<MainTitle ref={mainTitle} />
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
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
