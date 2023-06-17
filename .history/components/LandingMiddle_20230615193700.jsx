import { forwardRef } from 'react'

const LandingMiddle = forwardRef((props, ref) => {
	return (
		<>
			<mesh ref={ref} position={[0, 0, 3.55]}>
				<sphereGeometry args={[0.55, 16, 32]} />
				<meshBasicMaterial color={[0.23, 0.2, 0.57]} />
			</mesh>
		</>
	)
})

LandingMiddle.displayName = 'MiddleEart'
export default LandingMiddle
