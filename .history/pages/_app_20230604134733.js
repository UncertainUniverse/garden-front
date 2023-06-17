import '@/styles/globals.css'
import { CanvasProvider } from '@/components/ContextProvider'
export default function App({ Component, pageProps }) {
	// return <Component {...pageProps} />
	return (
		<CanvasProvider>
			<Component {...pageProps} />
		</CanvasProvider>
	)
}
