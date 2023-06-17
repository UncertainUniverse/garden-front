import { useMemo } from 'react'
import { DataTexture, FloatType, RGBAFormat } from 'three'
const lerp = (a, b, t) => {
	return a * (1 - t) + b * t
}
export function getPositions(
	size,
	setting,
	minRadius,
	maxRadius,
	center,
	theatre
) {
	const number = size * size
	const data = new Float32Array(4 * number)
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const index = i * size + j
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, minRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			data[4 * index] = x
			data[4 * index + 1] = y
			data[4 * index + 2] = z
			data[4 * index + 3] = i * 3
		}
	}
	const dataTexture = new DataTexture(data, size, size, RGBAFormat, FloatType)
	dataTexture.needsUpdate = true
	return dataTexture

	if (theatre) {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, minRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	} else {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, maxRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	}
}
export function getRef(size, setting, minRadius, maxRadius, center, theatre) {
	const number = size * size
	const data = new Float32Array(4 * number)
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const index = i * size + j
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, minRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			data[4 * index] = x
			data[4 * index + 1] = y
			data[4 * index + 2] = z
			data[4 * index + 3] = i * 3
		}
	}
	const dataTexture = new DataTexture(data, size, size, RGBAFormat, FloatType)
	dataTexture.needsUpdate = true
	return dataTexture

	if (theatre) {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, minRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	} else {
		const pos = new Float32Array(count * 3)
		for (let i = 0; i < count; i++) {
			let theta = Math.random() * 2 * Math.PI
			let r = lerp(minRadius, maxRadius, Math.random())
			let x = r * Math.sin(theta) + center[0]
			let y = (Math.random() - 0.5) * 0.1 + center[1]
			let z = r * Math.cos(theta) + center[2]
			pos.set([x, y, z], i * 3)
		}
		return pos
	}
}
