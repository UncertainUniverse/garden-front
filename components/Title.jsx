import { Text } from '@react-three/drei'
import { forwardRef } from 'react'
const Title = forwardRef((props, ref) => {
	return (
		<Text
			ref={ref}
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			position={props.position}
			rotation={props.rotation}
			scale={props.scale}
			color={props.col}
			strokeOpacity={0}
			fillOpacity={props.opacity}
			outlineOpacity={0}
		>
			{props.text}
		</Text>
	)
})
Title.displayName = 'Title'
export default Title
