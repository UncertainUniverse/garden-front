import PointCloud from './PointCloud'
import { forwardRef } from 'react'
const Page1 = forwardRef((props, ref) => {
	return (
		<>
			<PointCloud
				minRadius={1.0}
				maxRadius={1.5}
				theatre={false}
				color={'#f7b373'}
				rotation={[Math.PI / 2, 0, 0]}
				spread={1.0}
				size={1.0}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
			<PointCloud
				minRadius={0.85}
				maxRadius={1.35}
				color={'#88b3ce'}
				theatre={true}
				spread={1.0}
				size={0.5}
				ref={smallCircle}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
