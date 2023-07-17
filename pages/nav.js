import { motion } from 'framer-motion'
import Page2 from '@/components/Page2'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
const pageTransition = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 1.75,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 2.0,
			delay: 1,
		},
	},
}
async function getData(url) {
	console.log('im running')
	if (url) {
		const res = await fetch(url)
		if (!res.ok) {
			throw new Error('Failed to fetch data')
		}
		const data = await res.json()
		const filteredData = data.filter(
			(item) => item.title === 'First Principles'
		)
		if (!filteredData) {
			throw new Error('No data with matching Title')
		}
		// return res.json()
		return filteredData[0]
	}
}

export default function Nav() {
	const router = useRouter()
	const cleanTitle = router.query.data.split(/(?=[A-Z])/).join(' ')

	const [titleTest, setTitleTest] = useState(undefined)

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (router.query.data) {
					const res = await getData(`${router.query.data}.json`)
					setData(res)
					setLoading(false)
				}
			} catch (e) {
				console.error(e)
			}
		}

		fetchData()
	}, [router.query.data]) // updating the dependencies

	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				{loading && <LoadingScreen />}
				{!loading && (
					<Page2
						mainText={`${cleanTitle}`}
						pages={data.child_nodes}
					/>
				)}
			</Layout>
		</motion.div>
	)
}
