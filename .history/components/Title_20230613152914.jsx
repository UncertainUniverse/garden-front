import { Text } from '@react-three/drei'

const Title = (props) => {
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
}
