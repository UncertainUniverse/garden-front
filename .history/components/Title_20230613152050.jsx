import { Text } from '@react-three/drei'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const Title = (props) => {
	return (
		<Text
			font={'/static/fonts/bluunext-bold-webfont.woff'}
			position={props.position}
			rotation={props.rotation}
			scale={props.scale}
		></Text>
	)
}
