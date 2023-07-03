import { useMemo, useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { Vector3 } from 'three'
const SurroundingNodes = (props) => {
	const radius = 0.25
	const numCircles = props.availableNodes
	const rotationPoint = new Vector3(
		props.position[0],
		props.position[1],
		props.position[2]
	)
	const nodeRef = useRef()
	const { clock } = useThree()

	const { opacity } = useSpring({
		opacity: props.hoverState ? 1 : 0,
		config: { duration: 500 }, // Adjust duration as needed
	})
	const childNodes = useMemo(() => {
		const points = []

		for (let i = 0; i < numCircles; i++) {
			const theta = (i / numCircles) * 2 * Math.PI
			// const size = Math.abs(Math.random() * 0.05 - 0.025) + 0.01
			const size = 0.02
			// const r = Math.sqrt(Math.random()) * radius
			const r = radius
			// const angle = Math.random() * 2 * Math.PI
			const angle = 2 * Math.PI
			const x = r * Math.cos(theta)
			const y = r * Math.sin(theta)
			points.push([x, y, size])
		}

		return points
	}, [numCircles, radius])
	useFrame(() => {
		//
		if (props.hoverState) {
			const elapsedTime = clock.getElapsedTime()
			nodeRef.current.rotation.z = elapsedTime
		}
	})
	return (
		<>
			<group
				position={[props.position[0], props.position[1], 0]}
				ref={nodeRef}
			>
				{childNodes.map((point, index) => (
					<mesh
						key={index}
						position={[point[0], point[1], props.position[2]]}
					>
						<circleGeometry args={[point[2], 16, 32]} />
						<a.meshBasicMaterial
							color={Math.random() > 0.5 ? '#f7b373' : '#88b3ce'}
							transparent
							opacity={opacity}
						/>
					</mesh>
				))}
			</group>
		</>
	)
}

export default SurroundingNodes
