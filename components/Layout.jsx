import { Canvas } from '@react-three/fiber'
import { useCanvasContext } from './ContextProvider'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend } from '@react-three/fiber'
import { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import styles from '@/styles/Home.module.css'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SoftShadows } from '@react-three/drei'
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
export default function Layout({ children }) {
	const { setCanvas } = useCanvasContext()

	return (
		<div className={styles.scene}>
			<Canvas
				shadows
				className={styles.canvas}
				camera={{
					position: [0, 0, 4.5],
					fov: 45,
				}}
				onCreated={({ gl }) => setCanvas(gl)}
			>
				<Stats />
				{/* <pointLight position={[0, 5, 0]} intensity={1} color='#fff' />
				<directionalLight
					position={[5, 5, 0]}
					intensity={1}
					color='#fff'
				/> */}

				<EffectComposer>
					<Bloom
						luminanceThreshold={0.962}
						// luminanceThreshold={0.9}
						intensity={10}
						levels={9}
						mipmapBlur
					/>
				</EffectComposer>
				{/* <SoftShadows /> */}
				<Environment files='https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr' />
				{children}
				<Controls />
			</Canvas>
		</div>
	)
}
