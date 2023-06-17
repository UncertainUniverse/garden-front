import React, { useMemo, forwardRef, useState, useEffect, useRef } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import vertexShader from '@/shaders/vertexShader.glsl'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import { SheetProvider, editable as e } from '@theatre/r3f'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { PointCloudMaterial } from './PointCloudMaterial'
import { getPositions2 } from './getPositions1'
import {
	InstancedBufferGeometry,
	PlaneBufferGeometry,
	InstancedBufferAttribute,
} from 'three'

const PointCloud = forwardRef((props, ref) => {
	const lerp = (a, b, t) => {
		return a * (1 - t) + b * t
	}

	//Theatre
	const threeRef = useRef()
	const [theatreObject, setTheatreObject] = useState(null)

	const particleGeometry = new PlaneBufferGeometry(1, 1)
	const count = props.count
	const geometry = new InstancedBufferGeometry()
	geometry.instanceCount = count
	geometry.setAttribute('position', particleGeometry.getAttribute('position'))
	geometry.index = particleGeometry.index
	const positions = getPositions2(
		count,
		props.spread,
		props.minRadius,
		props.maxRadius,
		props.center,
		props.theatre
	)
	geometry.setAttribute(
		'pos',
		new InstancedBufferAttribute(positions, 3, false)
	)
	const material = PointCloudMaterial(
		props.theatre,
		props.size,
		props.color,
		props.opacity,
		props.spread
	)

	console.log(props.position)
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime()
		material.uniforms.uTime.value = time
		if (props.pointer) {
			material.uniforms.uMouse.value = props.pointer
		}
	})
	return (
		<>
			{props.theatre ? (
				<e.group
					theatreKey='pc'
					additionalProps={{ offset: 0 }}
					objRef={setTheatreObject}
					position={props.position}
				>
					<mesh
						geometry={geometry}
						material={material}
						ref={ref}
					></mesh>
				</e.group>
			) : (
				<mesh
					rotation={props.rotation}
					position={props.position}
					geometry={geometry}
					material={material}
					ref={ref}
				></mesh>
			)}
		</>
	)
})
PointCloud.displayName = 'PointCloud'

export default PointCloud
