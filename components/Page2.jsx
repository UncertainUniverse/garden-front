import React from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'
import { isMobile } from 'react-device-detect'

const arrayNav = [
	{ Evolution: 'Evolution' },
	{ FirstPrinciples: 'First Principles' },
	{ Metaphysics: 'Metaphysics' },
	{ Society: 'Society' },
	{ Spacetime: 'Spacetime' },
]

const Page2 = (props) => {
	const PARAMS = {
		pc: {
			minRadius: isMobile ? 0.85 : 1.75,
			maxRadius: isMobile ? 0.85 : 1.75,
			count: isMobile ? 2000 : 10000,
		},
	}
	return (
		<>
			<PointCloud
				position={[0, 0, -0.75]}
				indexPage={true}
				minRadius={PARAMS.pc.minRadius}
				maxRadius={PARAMS.pc.maxRadius}
				color={'#fff'}
				theatre={false}
				spread={0.0}
				size={0.1}
				rotation={[Math.PI / 2, 0, 0]}
				count={PARAMS.pc.count}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
			{/* <Title text={'0'} scale={[0.1, 0.1, 0.1]} /> */}
			<Navigation
				radius={1.75}
				navData={arrayNav}
				mainText={props.mainText}
				nodeCount={5}
				isMobile={isMobile}
			/>
		</>
	)
}

export default Page2
