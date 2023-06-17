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
			prevClickedStates.map((state, i) => (i === index ? !state : state))
		)

		function triggerExitState(idx, prevState) {
			setExitStates((prevExitStates) => {
				let newExitStates = [...prevExitStates] // copy the array
				newExitStates[idx] = !newExitStates[idx] // toggle the state at index
				return newExitStates // return the new array
			})

			// calculate the next index with wrap around
			let nextIdx = idx + 1 === prevState.length ? 0 : idx + 1

			if (nextIdx !== index) {
				// prevent infinite loop
				setTimeout(() => triggerExitState(nextIdx, prevState), 500) // call next one after 2 seconds
			}
		}

		// start triggering from the next index
		setExitStates((prevExitStates) => {
			let nextIndex = index + 1 === prevExitStates.length ? 0 : index + 1
			triggerExitState(nextIndex, prevExitStates)
			return prevExitStates
		})
	}

	// const handleChildClick = (index) => {
	// 	setClickedStates((prevClickedStates) =>
	// 		prevClickedStates.map((state, i) => {
	// 			return i === index ? !state : state
	// 			return state
	// 		})
	// 	)

	// 	/*------------------------------
	// 	Block
	// 	------------------------------*/
	// 	function triggerExitState(idx) {
	// 		setExitStates((prevExitStates) => {
	// 		  let newExitStates = [...prevExitStates]; // copy the array
	// 		  newExitStates[idx] = !newExitStates[idx]; // toggle the state at index
	// 		  return newExitStates; // return the new array
	// 		});

	// 		// calculate the next index with wrap around
	// 		let nextIdx = idx + 1 === prevExitStates.length ? 0 : idx + 1;

	// 		if (nextIdx !== index) { // prevent infinite loop
	// 		  setTimeout(() => triggerExitState(nextIdx), 2000); // call next one after 2 seconds
	// 		}
	// 	  }

	// 	  // start triggering from the next index
	// 	  triggerExitState(index + 1 === prevExitStates.length ? 0 : index + 1);
	// 	/*------------------------------
	// 	Block
	// 	------------------------------*/
	// 	// setExitStates((prevExitStates) => {
	// 		// for (let i = index; i < prevExitStates.length; i++) {
	// 		// 	if (i == index) {
	// 		// 		prevExitStates[i] = prevExitStates[i]
	// 		// 	}
	// 		// 	if (i !== index) {
	// 		// 		prevExitStates[i] = !prevExitStates[i]
	// 		// 	}
	// 		// 	if (i == prevExitStates.length - 1) {
	// 		// 		i = -1
	// 		// 	}
	// 		// 	if (i == index - 1) {
	// 		// 		break
	// 		// 	}
	// 		// }
	// 		// return prevExitStates
	// 		// const updatedExitStates = [...prevExitStates] // Create a copy of the exit states array
	// 		// updatedExitStates[index] = !updatedExitStates[index] // Toggle the exit state for the clicked index
	// 		// return updatedExitStates
	// 		// return prevExitStates
	// 		// const afterIndex = prevExitStates.slice(index + 1)
	// 		// const beforeIndex = prevExitStates.slice(0, index + 1)
	// 		// const reorderedArray = afterIndex.concat(beforeIndex)
	// 		// prevExitStates.map((state, i) => {
	// 		// 	return i !== index ? !state : state
	// 		// })
	// 		// return reorderedArray.map((state, i) =>
	// 		// i !== index ? !state : state
	// 		// )
	// 	})
	// }
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
