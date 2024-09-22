import React, { createContext, useContext, useEffect } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'

const PerfilContext = createContext()

const SesionExpiradaProvider = ({ children }) => {
	const [sesionExpirada, setSesionExpirada] = React.useState(false)

	const handleRecargarPagina = () => {
		window.location.reload()
	}

	return (
		<>
			<Dialog open={sesionExpirada}>
				<DialogTitle>Su sesión expiró</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Por favor recargue la pagina para continuar
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleRecargarPagina}>Recargar</Button>
				</DialogActions>
			</Dialog>
			<PerfilContext.Provider value={{ sesionExpirada, setSesionExpirada }}>
				{children}
			</PerfilContext.Provider>
		</>
	)
}

export default SesionExpiradaProvider

export const useSesionExpiradaContext = () => {
	return useContext(PerfilContext)
}

export const useSesionExpiradaCheck = () => {
	const { sesionExpirada, setSesionExpirada } = useSesionExpiradaContext()

	const client = useQueryClient()

	useEffect(() => {
		const handleError = (err) => {
			if (err.response.status === 401 && !sesionExpirada) {
				setSesionExpirada(true)
			}
		}
		client.setDefaultOptions({
			queries: {
				enabled: !sesionExpirada,
				retry: !sesionExpirada ? 1 : false,
				refetchOnWindowFocus: !sesionExpirada,
				onError: handleError,
			},
			mutations: {
				onError: handleError,
			},
		})
	}, [client, sesionExpirada, setSesionExpirada])
}
