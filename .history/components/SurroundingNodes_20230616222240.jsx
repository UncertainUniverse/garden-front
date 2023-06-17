import { useMemo } from 'react'
const SurroundingNodes = (props) => {
	const color = Math.random()
	const radius = 0.35
	const numCircles = props.availableNodes
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
		<mesh position={props.position}>
			<circleBufferGeometry args={[0.2, 16, 32]} />
			<meshBasicMaterial color={color > 0.5 ? '#f7b373' : '#88b3ce'} />
		</mesh>
	)
}

export default SurroundingNodes
