import { useMemo } from 'react'
import { ShaderMaterial } from 'three'

export function PointCloudMaterial(indexPage) {
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
