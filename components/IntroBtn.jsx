import { RoundedBox } from '@react-three/drei'
import Title from './Title'
const IntroBtn = (props) => {
	return (
		<>
			<group position={props.position}>
				<RoundedBox
					args={[0.43, 0.15, 0.001]} // Width, height, depth. Default is [1, 1, 1]
					radius={0.05} // Radius of the rounded corners. Default is 0.05
					smoothness={4} // The number of curve segments. Default is 4
					creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
					// {...meshProps} // All THREE.Mesh props are valid
				>
					<meshBasicMaterial color='#f3f3f3' />
				</RoundedBox>
				<Title
					text='Enter'
					scale={[0.075, 0.075, 0.075]}
					col='Black'
					position={[0, 0, 0.001]}
				/>
			</group>
		</>
	)
}

export default IntroBtn
