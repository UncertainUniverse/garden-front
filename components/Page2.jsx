import React from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'
const arrayNav = [
	{ Evolution: 'Evolution' },
	{ FirstPrinciples: 'First Principles' },
	{ Metaphysics: 'Metaphysics' },
	{ Society: 'Society' },
	{ Spacetime: 'Spacetime' },
]

const Page2 = (props) => {
	return (
		<>
			<PointCloud
				position={[0, 0, -0.75]}
				indexPage={true}
				minRadius={1.75}
				maxRadius={1.75}
				color={'#fff'}
				theatre={false}
				spread={0.0}
				size={0.1}
				rotation={[Math.PI / 2, 0, 0]}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
			<Navigation
				radius={1.75}
				navData={arrayNav}
				mainText={props.mainText}
				nodeCount={5}
			/>
		</>
	)
}

export default Page2
