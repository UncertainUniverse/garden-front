import styles from '@/styles/Home.module.css'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Floor from '@/components/Floor'
import Box from '@/components/Box'
import LightBulb from '@/components/Lightbulb'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Page1 from '@/components/Page1'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'

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
				<Page1 />
			</Layout>
		</motion.div>
	)
}
