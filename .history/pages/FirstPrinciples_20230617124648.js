import { motion } from 'framer-motion'
import Page2 from '@/components/Page2'
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
			duration: 2.0,
			delay: 1,
		},
	},
}

export default function IntroNav() {
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				<mesh>
					<boxGeometry args={[1, 1]} />
					<meshBasicMaterial color='blue' />
				</mesh>
			</Layout>
		</motion.div>
	)
}
