// import
import { NodeToyMaterial } from '@nodetoy/react-nodetoy'
import { data as meteorShaderData } from './meteor-data.js'
import {
	MeshTransmissionMaterial,
	useGLTF,
	useTexture,
} from '@react-three/drei'

export default function Meteor() {
	const { nodes } = useGLTF('assets/models/meteor.glb')
	const normalMap = useTexture(['assets/textures/meteor_normals.png'])

	return (
		<>
			<group scale={[0.4, 0.4, 0.4]} position={[0, 0, -0.55]}>
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
						color={'#3a2f53'}
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
}
