import { MeshTransmissionMaterial } from '@react-three/drei'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
export default function GlassSphere(props) {
	const glass = useRef()
	useEffect(() => {
		if (props.glassExit) {
			gsap.to(glass.current.material, {
				opacity: 0,
				duration: 2,
				ease: 'Power0.easeIn',
				delay: 3,
			})
		}
	})
	return (
		<mesh scale={props.scale} ref={glass}>
			<sphereGeometry />
			<MeshTransmissionMaterial
				opacity={1}
				transparent
				color='hotpink'
				resolution={128}
				thickness={0.5}
				anisotropy={2}
				temporalDistortion={0.1}
				distortion={10}
			/>
		</mesh>
	)
}
