import { forwardRef } from 'react'
import Title from './Title'

const Subtitle = forwardRef((props, ref) => {
	return (
		<>
			<Title
				ref={ref}
				text='Temporary Text'
				scale={[0.075, 0.075, 0.075]}
				col='white'
				position={[0, -1.25, 0]}
				opacity={props.opacity}
			/>
		</>
	)
})

Subtitle.displayName = 'Subtitle'
export default Subtitle
