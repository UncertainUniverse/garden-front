import { useMemo } from 'react'
import { ShaderMaterial } from 'three'
import { useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import vertexShader from '@/shaders/vertexShader.glsl'
import { Color, Vector3, Vector4, AdditiveBlending } from 'three'
import { shaderMaterial } from '@react-three/drei'

export function PointCloudMaterial(indexPage, size, color, opacity, spread) {
	const map = useLoader(TextureLoader, '1.png')
	return useMemo(() => {
		if (indexPage) {
			return new ShaderMaterial({
				uniforms: {
					uTexture: { value: map },
					uTime: { value: 0.0 },
					uSize: { value: size },
					uColor: { value: new Color(color) },
					uMouse: { value: new Vector3() },
					uOpacity: { value: opacity },
					uSpread: { value: spread },
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
					uSize: { value: size },
					uColor: { value: new Color(color) },
					uMouse: { value: new Vector3() },
					uOpacity: { value: opacity },
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
}
