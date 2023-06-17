function LandingMiddle() {
	return (
		<>
			<mesh position={[0, 0, -0.5]}>
				<sphereGeometry args={[0.35, 16, 32]} />
				<meshBasicMaterial color={[0.23, 0.2, 0.57]} />
			</mesh>
		</>
	)
}

export default LandingMiddle
