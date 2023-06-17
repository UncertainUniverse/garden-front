import React from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'
const Page2 = () => {
	return (
		<PointCloud
			ref={pRef3}
			position={[0, 0, 3]}
			indexPage={true}
			minRadius={2}
			maxRadius={2}
			color={'#fff'}
			theatre={false}
			spread={0.0}
			size={0.1}
			rotation={[Math.PI / 2, 0, 0]}
			count={10000}
			opacity={0.0}
			center={[0, 0, 0]}
		/>
	)
}

export default Page2
