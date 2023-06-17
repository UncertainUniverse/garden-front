import React from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'

const arrayNav = [
	{ Evolution: '/Evolution' },
	{ 'First Principles': '/FirstPrinciples' },
	{ Metaphysics: '/Metaphysics' },
	{ Society: '/Society' },
	{ Society: '/Society' },
]

const Page2 = () => {
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
			<Navigation radius={1.75} nodeCount={5} />
			{/* <ClickablePage /> */}
		</>
	)
}

export default Page2
