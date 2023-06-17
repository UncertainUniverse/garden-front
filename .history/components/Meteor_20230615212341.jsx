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
					color={'#ffa500'}
					attenuationDistance={0.2}
					attentuationColor={'#e2ae5b'}
				/>
			</mesh>
			<mesh geometry={nodes.meteor.geometry} scale={[1.02, 1.02, 1.02]}>
				<NodeToyMaterial data={meteorShaderData} />
			</mesh>
		</>
	)
}
