import React, { useEffect } from 'react'
import Navigation from './Navigation'
import PointCloud from './PointCloud'
import { isMobile } from 'react-device-detect'
import { useState } from 'react'
import { LoadingScreen } from './LoadingScreen'
import { useRouter } from 'next/router'
async function getData(_data, query) {
	if (_data) {
		const jsonFile = 'FirstPrinciples.json'
		const res = await fetch(jsonFile)
		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}
		const data = await res.json()
		const filteredData = data.filter((item) => item.title === query)
		if (!filteredData) {
			throw new Error('No data with matching Title')
		}
		console.log(filteredData)
		return filteredData[0]
	}
}

export default function Page2() {
	const router = useRouter()
	const [dbURL, setdbURL] = useState(null)
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const cleanTitle = router.query.data.split(/(?=[A-Z])/).join(' ')
	;('FirstPrinciples')
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (router.query.data) {
					const res = await getData(router.query.data, cleanTitle)
					setData(res)
					setLoading(false)
				}
			} catch (e) {
				console.error(e)
			}
		}

		fetchData()
	}, [router.query.data, dbURL]) // updating the dependencies

	const PARAMS = {
		pc: {
			minRadius: isMobile ? 1 : 1.75,
			maxRadius: isMobile ? 1 : 1.75,
			count: isMobile ? 2000 : 10000,
		},
	}
	return (
		<>
			{loading && <LoadingScreen />}
			{!loading && (
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
						navData={data.child_nodes}
						mainText={cleanTitle}
						nodeCount={data.child_nodes.length}
						isMobile={isMobile}
						dbURL={dbURL}
						setDB={setdbURL}
					/>
				</>
			)}
		</>
	)
}
