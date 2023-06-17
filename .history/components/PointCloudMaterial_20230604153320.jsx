import { useMemo } from 'react'
import { ShaderMaterial } from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import fragmentShader from '@/shaders/fragmentShader.glsl'
import vertexShader from '@/shaders/vertexShader.glsl'
import { Color, Vector3, Vector4, AdditiveBlending}

export function PointCloudMaterial(indexPage, size, color, opacity, spread) {
	const map = useLoader(TextureLoader, '1.png')
	return useMemo(() => {
		if (indexPage) {
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
}
