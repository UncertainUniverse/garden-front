import Title from './Title'
import { forwardRef } from 'react'

const MainTitle = forwardRef((props, ref) => {
	return (
		<>
			<group ref={ref}>
				<Title
					text={'Uncertain'}
					position={[0, 0.15, 0]}
					scale={[0.35, 0.35, 0.35]}
					opacity={props.opacity}
				/>
				<Title
					text={'Universe'}
					position={[0, -0.25, 0]}
					scale={[0.35, 0.35, 0.35]}
					opacity={props.opacity}
				/>
			</group>
		</>
	)
})

MainTitle.displayName = 'MainTitle'
export default MainTitle
