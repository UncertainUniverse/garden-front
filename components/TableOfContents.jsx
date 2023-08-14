import React from 'react'
import { useEffect, useState } from 'react'
import getData from '@/api/getData'
import generateHierarchy from '@/api/generateHierarchy'

function TableOfContentsItem({ node }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<div onClick={() => setIsOpen(!isOpen)}>
				{node.title}
				{node.children && node.children.length > 0 && (
					<span> {isOpen ? '▲' : '▼'} </span>
				)}
			</div>
			{isOpen && node.children && (
				<div style={{ marginLeft: '20px' }}>
					{node.children.map((child, index) => (
						<TableOfContentsItem key={index} node={child} />
					))}
				</div>
			)}
		</div>
	)
}

function TableOfContents() {
	const [isLoading, setIsLoading] = useState(true)
	const [treeData, setTreeData] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			const res = await getData('first-principles')
			const temp = generateHierarchy(res, 'dimensions-of-uncertainty')
			setTreeData(temp)
			setIsLoading(false)
		}

		fetchData()
	}, []) // updating the depen
	return (
		<>
			{!isLoading &&
				treeData.map((node, i) => (
					<TableOfContentsItem key={i} node={node} />
				))}
		</>
	)
}

export default TableOfContents
