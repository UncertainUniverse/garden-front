import { Vector3 } from 'three'
import PointCloud from './PointCloud'
import DebugSphere from './DebugSphere'
import { forwardRef, useRef } from 'react'
import { useFram } from '@react-three/fiber'
const Page1 = forwardRef((props, ref) => {
	const pointer = new Vector3()
	const floor = useRef()
	return (
		<>
			<mesh
				ref={floor}
				onPointerMove={(e) => {
					pointer.copy(e.intersections[0].point)
				}}
			>
				<planeGeometry args={[10, 10, 10, 10]} />
				<meshBasicMaterial visible={false} />
			</mesh>
			<DebugSphere
				pos={pointer}
				size={[1.06, 32, 16]}
				rotation={[Math.PI / 2, 0, 0]}
			/>

			<PointCloud
				indexPage={true}
				minRadius={1.0}
				maxRadius={1.5}
				theatre={false}
				color={'#f7b373'}
				rotation={[Math.PI / 2, 0, 0]}
				spread={1.0}
				size={1.0}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
			<PointCloud
				indexPage={true}
				minRadius={0.85}
				maxRadius={1.35}
				color={'#88b3ce'}
				theatre={false}
				spread={1.0}
				size={0.5}
				rotation={[Math.PI / 2, 0, 0]}
				// ref={smallCircle}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
