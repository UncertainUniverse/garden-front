const SurroundingNodes = () => {
	const color = Math.random()
	return (
		<mesh>
			<circleBufferGeometry args={[0.1, 16, 32]} />
			<meshBasicMaterial color={color > 0.5 ? '#f7b373' : '#88b3ce'} />
		</mesh>
	)
}

export default SurroundingNodes
