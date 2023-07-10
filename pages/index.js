import Page1 from '@/components/Page1'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import DeviceDetector from '@/components/DeviceDetector'

const pageTransition = {
	out: {
		opacity: 0,
		y: 40,
		transition: {
			duration: 2.5,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 3.5,
			delay: 1,
		},
	},
}

export default function Home() {
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<DeviceDetector />
			<Layout>
				<Page1 />
			</Layout>
		</motion.div>
	)
}
