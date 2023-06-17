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

const Meteor = forwardRef((props, ref) => {
	const { nodes } = useGLTF('assets/models/meteor.glb')
	const normalMap = useTexture(['assets/textures/meteor_normals.png'])
	const testRef = useRef()

	useFrame(() => {
		// ref.current.rotation.x += 0.01
		ref.current.rotation.y += 0.01
		// testRef.current.rotation.y += 0.01
		// ref.current.rotation.z += 0.01
		// console.log(ref.current)
	})

	return (
		<>
			<group ref={ref} scale={[0.0, 0.0, 0.0]} position={[0.0, 0, -0.95]}>
				<mesh
					ref={testRef}
					geometry={nodes.meteor.geometry}
					// position={[0.0, 0.15, 0.0]}
					// scale={[0.8, 0.8, 0.8]}
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
				</mesh>
				<mesh
					scale={[1.02, 1.02, 1.02]}
					geometry={nodes.meteor.geometry}
				>
					{/* <sphereGeometry args={[1, 16, 32]} /> */}
					<NodeToyMaterial data={meteorShaderData} />
				</mesh>
			</group>
		</>
	)
})

Meteor.displayName = 'Meteor'
export default Meteor
