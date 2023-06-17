import React, { useMemo, useState } from 'react'
import ClickablePage from './ClickablePage'
import { Html } from '@react-three/drei'
const Navigation = (props) => {
	const radius = props.radius
	const dummyAvailableNodes = 8
	console.log(props.navData)
	const numElements = props.navData.length
	const [order, setOrder] = useState(
		Array.from({ length: numElements }, (_, i) => i)
	)
	const [clickedStates, setClickedStates] = useState(
		new Array(numElements).fill(false)
	)
	const [exitState, setExitStates] = useState(
		new Array(numElements).fill(false)
	)
	const positions = useMemo(() => {
		const positions = []

		for (let i = 0; i < numElements; i++) {
			const theta = (i / numElements) * 2 * Math.PI // calculate the angle

			const x = radius * Math.cos(theta) // calculate the x position
			const y = radius * Math.sin(theta) // calculate the y position

			positions.push([x, y])
		}

		return positions
	}, [radius, numElements])
	const handleChildClick = (index) => {
		setClickedStates((prevClickedStates) =>
			prevClickedStates.map((state, i) => {
				return i === index ? !state : state
				return state
			})
		)
		// setOrder((prevOrder) => {
		// 	const afterIndex = prevOrder.slice(index + 1)
		// 	const beforeIndex = prevOrder.slice(0, index + 1)
		// 	return afterIndex.concat(beforeIndex)
		// })
		setExitStates((prevExitStates) => {
			// return prevExitStates.map((state, i) => {
			// 	i !== index ? !state : state
			// })
			console.log(prevExitStates)
			for (let i = index; i < prevExitStates.length - 1; i++) {
				if (i == index) {
					prevExitStates[i] = prevExitStates[i]
				}
				if (i !== index) {
					prevExitStates[i] = !prevExitStates[i]
				}
				if (i == prevExitStates.length - 1) {
					i = 0
				}
				if (i == index - 1) {
					break
				}
			}
			console.log(prevExitStates)
			return prevExitStates
			// const updatedExitStates = [...prevExitStates] // Create a copy of the exit states array
			// updatedExitStates[index] = !updatedExitStates[index] // Toggle the exit state for the clicked index
			// return updatedExitStates
			// return prevExitStates
			// const afterIndex = prevExitStates.slice(index + 1)
			// const beforeIndex = prevExitStates.slice(0, index + 1)
			// const reorderedArray = afterIndex.concat(beforeIndex)
			// prevExitStates.map((state, i) => {
			// 	return i !== index ? !state : state
			// })
			// return reorderedArray.map((state, i) =>
			// i !== index ? !state : state
			// )
		})
	}
	return (
		<>
			{order.map((originalIndex, i) => {
				const position = positions[originalIndex]
				return (
					<>
						<ClickablePage
							key={originalIndex} // Use originalIndex as key to preserve component identity.
							navData={props.navData[i]}
							indexPos={i}
							position={position}
							availableNodes={dummyAvailableNodes}
							onClick={() => handleChildClick(i)}
							clicked={clickedStates[originalIndex]}
							exited={exitState[originalIndex]}
						/>
					</>
				)
			})}
		</>
	)
}

export default Navigation
