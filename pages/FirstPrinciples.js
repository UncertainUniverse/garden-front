import { motion } from 'framer-motion'
import Page2 from '@/components/Page2'
import Layout from '@/components/Layout'

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

export default function FirstPrinciples() {
	return (
		<motion.div
			style={{ position: 'relative', transformOrigin: 'center center' }}
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				<Page2 mainText={'First Principles'} />
			</Layout>
		</motion.div>
	)
}
