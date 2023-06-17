import { Text } from '@react-three/drei'
import { forwardRef } from 'react'
const Title = forwardRef((props, ref) => {
	return (
		<Text
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			position={props.position}
			rotation={props.rotation}
			scale={props.scale}
		>
			{props.text}
		</Text>
	)
})
Title.displayName = 'Title'
export default Title
