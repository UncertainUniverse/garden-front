import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
function DebugSphere(props) {
	const mesh = useRef()
	console.log(props.pointer)
	useFrame(({ clock, state }) => {
		const time = clock.getElapsedTime()
		// console.log(props.pos)
		if (props.pos) {
			// mesh.current.position = props.pos
			mesh.current.position.x = props.pos.x
			mesh.current.position.y = props.pos.y
			mesh.current.position.z = props.pos.z
		}
	})
	return (
		<mesh ref={mesh} {...props} position={[...props.pos, 0.0]}>
			<sphereBufferGeometry args={props.size} />
			<meshPhysicalMaterial color={'red'} wireframe={true} />
		</mesh>
	)
}
export default DebugSphere
