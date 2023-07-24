import React, { useEffect } from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'
import { isMobile } from 'react-device-detect'
import { useState } from 'react'
import { LoadingScreen } from './LoadingScreen'
import { useRouter } from 'next/router'

export default function Page3(props) {
	const PARAMS = {
		pc: {
			minRadius: isMobile ? 1 : 1.75,
			maxRadius: isMobile ? 1 : 1.75,
			count: isMobile ? 2000 : 10000,
		},
	}
	return (
		<>
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
					opacity={1.0}
					center={[0, 0, 0]}
				/>
				<Navigation
					radius={PARAMS.pc.minRadius}
					navData={props.pages}
					mainText={props.mainText}
					nodeCount={props.pages.length}
					isMobile={isMobile}
				/>
			</>
		</>
	)
}
