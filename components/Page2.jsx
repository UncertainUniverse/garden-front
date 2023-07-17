import React, { useEffect } from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'
import { isMobile } from 'react-device-detect'
import { useState } from 'react'
import { LoadingScreen } from './LoadingScreen'

async function getData(url) {
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}
	return res.json()
}

export default function Page2(props) {
	// const data = await getData().then(console.log('hi'))
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)

	// useEffect(() => {
	// 	getData('/first-principles.json').then((d) => {
	// 		setData(d)
	// 		setLoading(false)
	// 		console.log(data)
	// 	})
	// }, [])

	const PARAMS = {
		pc: {
			minRadius: isMobile ? 1 : 1.75,
			maxRadius: isMobile ? 1 : 1.75,
			count: isMobile ? 2000 : 10000,
		},
	}
	console.log(props.pages.length)
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
					opacity={0.0}
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
