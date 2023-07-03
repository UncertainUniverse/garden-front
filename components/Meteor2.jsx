import { useGLTF, shaderMaterial } from '@react-three/drei'
import { forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import vertexShader from '@/shaders/middleVertex.glsl'
import fragmentShader from '@/shaders/middleFragment.glsl'
import { extend } from '@react-three/fiber'
import { useRef } from 'react'
const Meteor2 = forwardRef((props, ref) => {
	const testRef2 = useRef()
	const MeteorMaterial = shaderMaterial(
		{
			// uTexture: map,
			uTime: 0,
			uSpeed: 0.2,
			uNoiseDensity: 1.5,
			uNoiseStrength: 0.1,
			uIntensity: 7.0,
			uOffset: Math.PI * 2,
			uHue: 0.4,
			uOpacity: 0.4,
		},
		vertexShader,
		fragmentShader
	)
	extend({ MeteorMaterial })

	useFrame(() => {
		ref.current.material.uniforms.uTime.value += 0.01
	})

	return (
		<>
			<group scale={[1.0, 1.0, 1.0]} position={[0.0, 0, -1.2]}>
				<mesh ref={ref} scale={[1.02, 1.02, 1.02]}>
					<icosahedronGeometry args={[0.4, 64]} />
					<meteorMaterial />
				</mesh>
			</group>
		</>
	)
})

Meteor2.displayName = 'Meteor2'
export default Meteor2
