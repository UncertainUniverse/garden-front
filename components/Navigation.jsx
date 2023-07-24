import React, { useMemo, useState, useRef } from 'react'
import ClickablePage from './ClickablePage'
import Title from './Title'
import { Circle } from '@react-three/drei'
import { gsap } from 'gsap'
const Navigation = (props) => {
	const radius = props.radius
	const dummyAvailableNodes = 8
	const numElements = props.navData.length
	const text = useRef()
	const middle = useRef()
	const PARAMS = {
		title: {
			scale: props.isMobile ? [0.075, 0.075, 0.075] : [0.15, 0.15, 0.15],
		},
		middle: { size: props.isMobile ? [0.175, 64] : [0.35, 64] },
	}
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
			text.current.text = props.navData[index]
			gsap.to(text.current, {
				fillOpacity: 0,
				duration: 1.75,
				delay: order.length * 0.75,
			})
			gsap.to(middle.current.material, {
				opacity: 0,
				duration: 1.75,
				delay: order.length * 0.75,
			})
		}
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
					scale={PARAMS.title.scale}
					position={[0, 0, 1]}
					opacity={1}
				/>
			)}
			<Circle
				ref={middle}
				args={PARAMS.middle.size}
				material-color={'#FE6900'}
				material-opacity={1}
				material-transparent={true}
				// opacity={0}
			/>
			{order.map((originalIndex, i) => {
				const position = positions[originalIndex]
				return (
					<ClickablePage
						key={originalIndex} // Use originalIndex as key to preserve component identity.
						navData={props.navData[i]}
						isMobile={props.isMobile}
						indexPos={i}
						numNodes={order.length}
						position={position}
						availableNodes={dummyAvailableNodes}
						onClick={() => handleChildClick(i)}
						clicked={clickedStates[originalIndex]}
						exited={exitState[originalIndex]}
						dbURL={props.dbURL}
						setDB={props.setDB}
					/>
				)
			})}
		</>
	)
}

export default Navigation
