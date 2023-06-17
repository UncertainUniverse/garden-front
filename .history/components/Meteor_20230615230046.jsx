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

const Meteor = forwardRef((props, ref) => {
	const { nodes } = useGLTF('assets/models/meteor.glb')
	const normalMap = useTexture(['assets/textures/meteor_normals.png'])

	useFrame(() => {
		ref.current.rotation.x += 0.01
	})

	return (
		<>
			<group ref={ref} scale={[0.0, 0.0, 0.0]} position={[0, 0, -0.75]}>
				<mesh geometry={nodes.meteor.geometry}>
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
					geometry={nodes.meteor.geometry}
					scale={[1.02, 1.02, 1.02]}
				>
					<NodeToyMaterial data={meteorShaderData} />
				</mesh>
			</group>
		</>
	)
})

Meteor.displayName = 'Meteor'
export default Meteor
