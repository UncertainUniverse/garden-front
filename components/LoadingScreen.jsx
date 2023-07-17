export const LoadingScreen = () => {
	return (
		<>
			<mesh>
				<boxGeometry args={[1, 1]} />
				<meshBasicMaterial color='red' />
			</mesh>
		</>
	)
}
