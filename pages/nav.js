import { motion } from 'framer-motion'
import Page2 from '@/components/Page2'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
// import { connectToDataBase } from '@/database/mongo'
// import dd{ GetServerSideProps } from 'next'

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

export default function Nav() {
	const router = useRouter()
	// const cleanTitle = router.query.data.split(/(?=[A-Z])/).join(' ')
	if (!router.query.data) {
		return null // Render null or a fallback component when router.query.data is not available
	}

	const cleanTitle = router.query.data.split(/(?=[A-Z])/).join(' ')
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				<Page2 />
			</Layout>
		</motion.div>
	)
}
