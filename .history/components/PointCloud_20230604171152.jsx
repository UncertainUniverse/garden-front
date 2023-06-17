import React, { useMemo, forwardRef, useState, useEffect, useRef } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import vertexShader from '@/shaders/vertexShader.glsl'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import { SheetProvider, editable as e } from '@theatre/r3f'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { PointCloudMaterial } from './PointCloudMaterial'
import { getPositions, getVelocities } from './getPositions'
import simFragmentPosition from '@/shaders/simFragmentPosition.glsl'
import simFragmentVelocity from '@/shaders/simFragmentVelocity.glsl'
import { GPUComputationalRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer'
import {
	InstancedBufferGeometry,
	PlaneBufferGeometry,
	Vector3,
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
	const velocities = getVelocities(
		size,
		props.spread,
		props.minRadius,
		props.maxRadius,
		props.center,
		props.theatre
	)

	const gpuCompute = new GPUComputationalRenderer(size, size, gl)
	const positionVariable = gpuCompute.addVariable(
		'uCurrentPosition',
		simFragmentPosition,
		positions
	)
	const velocityVariable = gpuCompute.addVariable(
		'uCurrentVelocity',
		simFragmentVelocity,
		velocities
	)
	gpuCompute.setVariableDependencies(positionVariable, [
		positionVariable,
		velocityVariable,
	])
	gpuCompute.setVariableDependencies(velocityVariable, [
		positionVariable,
		velocityVariable,
	])
	const positionUniforms = positionVariable.material.uniforms
	const velocityUniforms = velocityVariable.material.uniforms
	positionUniforms.uTime = { value: 0.0 }
	velocityUniforms.uTime = { value: 0.0 }
	positionUniforms.uMouse = { value: new Vector3(0, 0, 0) }
	velocityUniforms.uMouse = { value: new Vector3(0, 0, 0) }
	positionUniforms.uOriginalPosition = { value: positions }
	velocityUniforms.uOriginalPosition = { value: positions }
	gpuCompute.init()

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
		new InstancedBufferAttribute(positions, 3, false)
	)
	const material = PointCloudMaterial(
		props.theatre,
		props.size,
		props.color,
		props.opacity,
		props.spread
	)

	useFrame(({ clock }) => {
		gpuCompute.compute()
		// const time = clock.getElapsedTime()
		// material.uniforms.uTime.value = time
		// if (props.pointer) {
		// 	material.uniforms.uMouse.value = props.pointer
		// }
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
				<mesh>
					<bufferGeometry>
						<bufferGeometry>
							<bufferAttribute
								attach='attributes-position'
								count={particles.length / 3}
								array={particles}
								itemSize={3}
							/>
							<bufferAttribute
								attach='attributes-ref'
								count={ref.length / 3}
								array={ref}
								itemSize={2}
							/>
						</bufferGeometry>
						<renderMaterial
							transparent={true}
							blending={THREE.AdditiveBlending}
							ref={renderMat}
						/>{' '}
					</bufferGeometry>
				</mesh>
			)}
		</>
	)
})
PointCloud.displayName = 'PointCloud'

export default PointCloud
