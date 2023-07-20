import { motion } from 'framer-motion'
import Page3 from '@/components/Page3'
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
	const arrayNav = [
		'Evolution',
		'First Principles',
		'Metaphysics',
		'Society',
		'Spacetime',
	]
	return (
		<motion.div
			variants={pageTransition}
			animate='in'
			initial='out'
			exit='out'
		>
			<Layout>
				<Page3 mainText={`Uncertain \n  Universe`} pages={arrayNav} />
			</Layout>
		</motion.div>
	)
}
