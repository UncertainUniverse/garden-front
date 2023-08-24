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
	console.log(postData)
	const post = postData[0]
	console.log(postData[0])
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
