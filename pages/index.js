import Page1 from '@/components/Page1'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'

const pageTransition = {
	out: {
		opacity: 0,
		transition: {
			duration: 1.75,
		},
	},
	in: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 2.0,
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
				<Page1 />
			</Layout>
		</motion.div>
	)
}
