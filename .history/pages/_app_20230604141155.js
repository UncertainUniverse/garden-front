import '@/styles/globals.css'
import { CanvasProvider } from '@/components/ContextProvider'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend } from '@react-three/fiber'
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
export default function App({ Component, pageProps }) {
	return (
		<CanvasProvider>
			<Controls />
			<Component {...pageProps} />
		</CanvasProvider>
	)
}
