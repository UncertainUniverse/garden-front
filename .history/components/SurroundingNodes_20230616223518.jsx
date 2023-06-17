import { useMemo, useState } from 'react'
import { useSpring, a } from '@react-spring/three'
const SurroundingNodes = (props) => {
	const [isVisible, setIsVisible] = useState(false)
	const radius = 0.35
	const numCircles = props.availableNodes
	const { opacity } = useSpring({
		opacity: props.hoverState ? 1 : 0,
		config: { duration: 1000 }, // Adjust duration as needed
	})
	const childNodes = useMemo(() => {
		const angle = (2 * Math.PI) / numCircles
		const points = []

		for (let i = 0; i < numCircles; i++) {
			const size = Math.abs(Math.random() * 0.05 - 0.025) + 0.01
			const r = Math.sqrt(Math.random()) * radius
			const angle = Math.random() * 2 * Math.PI
			const x = radius * Math.cos(i * angle)
			const y = r * Math.sin(i * angle)
			points.push([x, y, size])
		}

		return points
	}, [numCircles, radius])
	return (
		<>
			{childNodes.map((point, index) => (
	const color = Math.random()
				<mesh
					position={[
						point[0] + props.position[0],
						point[1] + props.position[1],
						props.position[2],
					]}
					key={index}
				>
					<circleBufferGeometry args={[point[2], 16, 32]} />
					<a.meshBasicMaterial
						color={color > 0.5 ? '#f7b373' : '#88b3ce'}
						transparent
						opacity={opacity}
					/>
				</mesh>
			))}
		</>
	)
}

export default SurroundingNodes
