import { motion } from 'framer-motion'
import Page2 from '@/components/Page1'
import Layout from '@/components/Layout'

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
			<Layout>
				<Page2 />
			</Layout>
		</motion.div>
	)
}
