import { RoundedBox } from '@react-three/drei'
import { forwardRef } from 'react'
import Title from './Title'

const IntroBtn = forwardRef((props, ref) => {
	return (
		<>
			<group position={props.position} ref={ref}>
				<RoundedBox
					onClick={props.enterState}
					args={[0.43, 0.15, 0.001]} // Width, height, depth. Default is [1, 1, 1]
					radius={0.05} // Radius of the rounded corners. Default is 0.05
					smoothness={4} // The number of curve segments. Default is 4
					creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
					// {...meshProps} // All THREE.Mesh props are valid
				>
					<meshBasicMaterial
						color='#f3f3f3'
						opacity={1}
						transparent
					/>
				</RoundedBox>
				<Title
					text='Enter'
					scale={[0.075, 0.075, 0.075]}
					col='Black'
					position={[0, 0, 0.001]}
					opacity={1}
				/>
			</group>
		</>
	)
})

IntroBtn.displayName = 'IntroBtn'
export default IntroBtn
