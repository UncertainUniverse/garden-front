import styles from '@/styles/Home.module.css'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import Floor from '@/components/Floor'
import Box from '@/components/Box'
import LightBulb from '@/components/Lightbulb'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Page1 from '@/components/Page1'
import Layout from '@/components/Layout'

extend({ OrbitControls })

function Controls() {
	const controls = useRef()
	const { camera, gl } = useThree()
	useFrame(() => controls.current.update())
	return (
		<orbitControls
			ref={controls}
			args={[camera, gl.domElement]}
			enableDamping
			dampingFactor={0.1}
			rotateSpeed={0.5}
		/>
	)
}

export default function Home() {
	return (
		// <div className={styles.scene}>
		// 	<Canvas
		// 		shadows
		// 		className={styles.canvas}
		// 		camera={{
		// 			position: [-6, 7, 7],
		// 		}}
		// 	>
				{/* <Controls /> */}
			<Layout>

				<ambientLight color={'white'} intensity={0.3} />
			</Layout>
		// 	</Canvas>
		// </div>
	)
}
