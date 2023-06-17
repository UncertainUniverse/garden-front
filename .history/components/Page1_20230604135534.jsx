import PointCloud from './PointCloud'

const Page1 = forwardRef((props, ref) => {
	return (
		<>
			<PointCloud
				minRadius={1.0}
				maxRadius={1.5}
				theatre={false}
				color={'#f7b373'}
				spread={1.0}
				size={1.0}
				count={10000}
				opacity={0.0}
				center={[0, 0, 0]}
			/>
		</>
	)
})
Page1.displayName = 'Page1'
export default Page1
