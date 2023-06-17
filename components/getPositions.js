import { useMemo } from 'react'
import { DataTexture, FloatType, RGBAFormat } from 'three'
const lerp = (a, b, t) => {
	return a * (1 - t) + b * t
}
export function getPositions(
	count,
	setting,
	minRadius,
	maxRadius,
	center,
	theatre
) {
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
	const ref = new Float32Array(4 * number)
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const k = i * size + j
			ref[k * 2 + 0] = i / (size - 1)
			ref[k * 2 + 1] = j / (size - 1)
		}
	}
	return ref

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
