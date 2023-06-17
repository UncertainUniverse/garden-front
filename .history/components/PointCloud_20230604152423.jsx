import React, { useMemo, forwardRef, useState, useEffect, useRef } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import vertexShader from '@/shaders/vertexShader.glsl'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import { SheetProvider, editable as e } from '@theatre/r3f'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { getPositions } from './getPositions'
import {
	Vector3,
	InstancedBufferGeometry,
	Vector4,
	PlaneBufferGeometry,
	InstancedBufferAttribute,
	ShaderMaterial,
	Color,
	AdditiveBlending,
} from 'three'

const PointCloud = forwardRef((props, ref) => {
	const lerp = (a, b, t) => {
		return a * (1 - t) + b * t
	}

	//Theatre
	const threeRef = useRef()
	const [theatreObject, setTheatreObject] = useState(null)

	const map = useLoader(TextureLoader, '1.png')
	const particleGeometry = new PlaneBufferGeometry(1, 1)
	const count = props.count
	const geometry = new InstancedBufferGeometry()
	geometry.instanceCount = count
	geometry.setAttribute('position', particleGeometry.getAttribute('position'))
	geometry.index = particleGeometry.index
	const positions = getPositions(
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
	const material = useMemo(() => {
		if (props.theatre) {
			return new ShaderMaterial({
				uniforms: {
					uTexture: { value: map },
					uTime: { value: 0.0 },
					uSize: { value: props.size },
					uColor: { value: new Color(props.color) },
					uMouse: { value: new Vector3() },
					uOpacity: { value: props.opacity },
					uSpread: { value: props.spread },
					resolution: { value: new Vector4() },
				},
				transparent: true,
				alphaTest: 0.001,
				depthWrite: false,
				blending: AdditiveBlending,
				vertexShader,
				fragmentShader,
			})
		} else {
			return new ShaderMaterial({
				uniforms: {
					uTexture: { value: map },
					uTime: { value: 0.0 },
					uSize: { value: props.size },
					uColor: { value: new Color(props.color) },
					uMouse: { value: new Vector3() },
					uOpacity: { value: props.opacity },
					uSpread: { value: 0.0 },
					resolution: { value: new Vector4() },
				},
				transparent: true,
				alphaTest: 0.001,
				depthWrite: false,
				blending: AdditiveBlending,
				vertexShader,
				fragmentShader,
			})
		}
	}, [fragmentShader, vertexShader])

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
					position={props.pos}
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
