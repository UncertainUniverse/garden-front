import React, { useMemo, useState, useRef } from 'react'
import ClickablePage from './ClickablePage'
import { Caustics, Decal, MeshTransmissionMaterial } from '@react-three/drei'
import Title from './Title'
import { Circle } from '@react-three/drei'
import { gsap } from 'gsap'
const Navigation = (props) => {
	const radius = props.radius
	const dummyAvailableNodes = 8
	const numElements = props.navData.length
	const text = useRef()
	const [glassExit, setGlassExit] = useState(false)
	const navLink = Object.keys(props.navData)
	// const navTitle = props.navData[`${navLink[0]}`]
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
		if (text.current) {
			const c = Object.keys(props.navData[index])
			const cTitle = props.navData[index][c[0]]
			text.current.text = cTitle
		}
		setGlassExit(true)
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
				setTimeout(() => triggerExitState(nextIdx, prevState), 350) // call next one after 2 seconds
			}
		}

		// start triggering from the next index
		setExitStates((prevExitStates) => {
			let nextIndex = index + 1 === prevExitStates.length ? 0 : index + 1
			triggerExitState(nextIndex, prevExitStates)
			return prevExitStates
		})
	}

	return (
		<>
			{props.mainText && (
				<Title
					ref={text}
					text={props.mainText}
					scale={[0.15, 0.15, 0.15]}
					position={[0, 0, 1]}
				/>
			)}
			<Circle args={[0.35, 64]} material-color={'#FE6900'} />
			{order.map((originalIndex, i) => {
				const position = positions[originalIndex]
				return (
					<ClickablePage
						key={originalIndex} // Use originalIndex as key to preserve component identity.
						navData={props.navData[i]}
						indexPos={i}
						numNodes={order.length}
						position={position}
						availableNodes={dummyAvailableNodes}
						onClick={() => handleChildClick(i)}
						clicked={clickedStates[originalIndex]}
						exited={exitState[originalIndex]}
					/>
				)
			})}
		</>
	)
}

export default Navigation
