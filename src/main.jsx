import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ScopedCssBaseline } from '@mui/material'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SesionExpiradaProvider from './utils/SesionExpiradaProvider'
import Version from './components/Version.jsx'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Version />
		<QueryClientProvider client={client}>
			<SesionExpiradaProvider>
				<ScopedCssBaseline>
					<BrowserRouter basename={window?.basename || ''}>
						<App />
					</BrowserRouter>
				</ScopedCssBaseline>
			</SesionExpiradaProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
)
