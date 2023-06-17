// import
import { NodeToyMaterial } from '@nodetoy/react-nodetoy'
import { data as meteorShaderData } from './meteor-data.js'
import {
	MeshTransmissionMaterial,
	useGLTF,
	useTexture,
} from '@react-three/drei'
import { forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { useSpring, animated as a } from '@react-spring/three'
const Meteor = forwardRef((props, ref) => {
	const { nodes } = useGLTF('assets/models/meteor.glb')
	const normalMap = useTexture(['assets/textures/meteor_normals.png'])
	const testRef = useRef()
	const testRef2 = useRef()
	const properties = useSpring({
		scale: [0.8, 0.8, 0.8],
		from: { scale: [0.4, 0.4, 0.4] },
		config: { duration: 4000 },
		loop: { reverse: true },
	})

	useFrame(() => {
		testRef2.current.rotation.y += 0.01
	})

	return (
		<>
			<group ref={ref} scale={[0.0, 0.0, 0.0]} position={[0.0, 0, -1.2]}>
				<a.mesh
					ref={testRef}
					geometry={nodes.meteor.geometry}
					position={[0.0, 0.15, 0.0]}
					scale={properties.scale}
				>
					<MeshTransmissionMaterial
						roughness={0}
						ior={1.5}
						thickness={0.035}
						transmission={1}
						chromaticAberration={1}
						anisotropy={20}
						distortion={0}
						distortionScale={0}
						samples={10}
						backside={true}
						color={'#4816bd'}
						attenuationDistance={0.2}
						attentuationColor={'#ffdb0e'}
					/>
				</a.mesh>
				<mesh
					ref={testRef2}
					scale={[1.02, 1.02, 1.02]}
					// geometry={nodes.meteor.geometry}
					// position={[0.1, 0.15, -1.2]}
				>
					<sphereGeometry args={[1, 4, 4]} />
					<NodeToyMaterial data={meteorShaderData} />
				</mesh>
			</group>
		</>
	)
})

Meteor.displayName = 'Meteor'
export default Meteor
