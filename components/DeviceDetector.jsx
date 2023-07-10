import { isMobile } from 'react-device-detect'

const DeviceDetector = () => (
	<div className='Device'>
		I am rendered on: {isMobile ? 'Mobile' : 'Desktop'}
	</div>
)

export default DeviceDetector
