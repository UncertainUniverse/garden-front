function findChildren(node, list) {
	return list.filter((item) => item.parent_node === node.file_name)
}

function buildTree(node, list) {
	const children = findChildren(node, list)
	if (children.length) {
		node.children = children
	}
	return node
}

function generateHierarchy(list, root) {
	const roots = list.filter((item) => item.parent_node === root)
	return roots.map((root) => buildTree(root, list))
}

export default generateHierarchy
