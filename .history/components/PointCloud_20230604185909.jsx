import React, { useMemo, forwardRef, useState, useEffect, useRef } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import vertexShader from '@/shaders/vertexShader.glsl'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import { SheetProvider, editable as e } from '@theatre/r3f'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { PointCloudMaterial } from './PointCloudMaterial'
import { getPositions, getRef } from './getPositions'
import simFragmentPosition from '@/shaders/simFragmentPosition.glsl'
import { getPositions2 } from './getPositions1'
// import { ShaderMaterial } from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
// import fragmentShader from '@/shaders/fragmentShader.glsl'
// import vertexShader from '@/shaders/vertexShader.glsl'
import { Color, Vector3, Vector4, AdditiveBlending } from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js'
import {
	InstancedBufferGeometry,
	PlaneBufferGeometry,
	// Vector3,
	InstancedBufferAttribute,
} from 'three'

const PointCloud = forwardRef((props, ref) => {
	const { gl } = useThree()
	const count = props.count
	const size = 64
	const positions = getPositions(
		size,
		props.spread,
		props.minRadius,
		props.maxRadius,
		props.center,
		props.theatre
	)

	const positions2 = getPositions2(
		count,
		props.spread,
		props.minRadius,
		props.maxRadius,
		props.center,
		props.theatre
	)
	const references = getRef(
		size,
		props.spread,
		props.minRadius,
		props.maxRadius,
		props.center,
		props.theatre
	)

	/*------------------------------
	Block
	------------------------------*/
	const lerp = (a, b, t) => {
		return a * (1 - t) + b * t
	}

	//Theatre
	const threeRef = useRef()
	const [theatreObject, setTheatreObject] = useState(null)

	const particleGeometry = new PlaneBufferGeometry(1, 1)
	const geometry = new InstancedBufferGeometry()
	geometry.instanceCount = count
	geometry.setAttribute('position', particleGeometry.getAttribute('position'))
	geometry.index = particleGeometry.index

	geometry.setAttribute(
		'pos',
		new InstancedBufferAttribute(positions2, 3, false)
	)
	// const newMaterial = PointCloudMaterial(
	// 	props.theatre,
	// 	props.size,
	// 	props.color,
	// 	props.opacity,
	// 	props.spread
	// )
	const map = useLoader(TextureLoader, '1.png')
	const RenderMaterialDef = shaderMaterial(
		{
			uTexture: map,
			uTime: 0,
			uSize: props.size,
			uColor: new Color(props.color),
			uMouse: new Vector3(),
			uOpacity: props.opacity,
			uSpread: props.spread,
			resolution: new Vector4(),
		},
		vertexShader,
		fragmentShader
	)
	extend({ RenderMaterialDef })

	const RenderMaterial = useMemo(() => {
		const material = new RenderMaterialDef()
		material.transparent = true
		material.alphaTest = 0.001
		material.depthWrite = false
		material.blending = AdditiveBlending
		return material
	}, [])
	// alphaTest: 0.001,
	// 				depthWrite: false,
	// 				blending: AdditiveBlending,
	useFrame(({ clock }) => {
		// gpuCompute.compute()
		const time = clock.getElapsedTime()
		RenderMaterial.uniforms.uTime.value = time
		// material.uniforms.uTime.value = time
		// if (props.pointer) {
		// 	material.uniforms.uMouse.value = props.pointer
		// }
	})
	return (
		<>
			{/* {props.theatre ? (
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
			) : ( */}
			<mesh
				geometry={geometry}
				material={RenderMaterial}
				ref={ref}
			></mesh>
			{/* )} */}
		</>
	)
})
PointCloud.displayName = 'PointCloud'

export default PointCloud
