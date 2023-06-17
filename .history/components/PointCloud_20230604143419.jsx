import React, { useMemo, forwardRef, useState, useEffect, useRef } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import vertexShader from '@/shaders/vertexShader.glsl'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import { SheetProvider, editable as e } from '@theatre/r3f'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { GetPositions } from './getPositions'
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

	const positionSet1 = useMemo(() => {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(props.minRadius, props.minRadius, Math.random())
			let x = r * Math.sin(theta) + props.center[0]
			let y = (Math.random() - 0.5) * 0.1 + props.center[1]
			let z = r * Math.cos(theta) + props.center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	}, [])

	const pos = new Float32Array(count * 3)
	for (let i = 0; i < count; i++) {
		let theta = Math.random() * 2 * Math.PI
		let r = lerp(props.minRadius, props.maxRadius, Math.random())
		let x = r * Math.sin(theta) + props.center[0]
		let y = (Math.random() - 0.5) * 0.1 + props.center[1]
		let z = r * Math.cos(theta) + props.center[2]
		pos.set([x, y, z], i * 3)
	}
	if (props.theatre) {
		geometry.setAttribute(
			'pos',
			new InstancedBufferAttribute(pos, 3, false)
		)
	} else {
		geometry.setAttribute(
			'pos',
			new InstancedBufferAttribute(positionSet1, 3, false)
		)
	}
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
