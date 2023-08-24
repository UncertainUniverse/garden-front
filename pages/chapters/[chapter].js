import { getAllPostIds } from '@/api/getAllPostIds'
import { getDataContent } from '@/api/getDataContent'

export default function Chapter({ post }) {
	return (
		<>
			<h1>Chapter: {post.title} </h1>
			<h1>Parent: {post.parent_node} </h1>
		</>
	)
}

export async function getStaticProps({ params }) {
	const postData = await getDataContent(params.chapter)
	const post = postData[0]
	if (post._id) {
		post._id = post._id.toString()
	}

	// Convert _id of every child in child_nodes
	if (post.child_nodes && post.child_nodes.length) {
		post.child_nodes = post.child_nodes.map((child) => {
			if (child._id) {
				child._id = child._id.toString()
			}
			return child
		})
	}
	return {
		props: {
			post,
		},
	}
}
export async function getStaticPaths() {
	const paths = await getAllPostIds()
	return {
		paths,
		fallback: false,
	}
}
