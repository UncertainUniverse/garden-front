import Title from './Title'
export function MainTitle(props) {
	return (
		<>
			<Title
				text={'Uncertain'}
				position={[0, 0.15, 0]}
				scale={[0.35, 0.35, 0.35]}
			/>
			<Title
				text={'Universe'}
				position={[0, -0.25, 0]}
				scale={[0.35, 0.35, 0.35]}
			/>
		</>
	)
}
