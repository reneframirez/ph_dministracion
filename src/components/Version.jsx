import React from 'react'
import { Typography } from '@mui/material'

const Version = () => {
	const version = import.meta.env.VITE_APP_VERSION
	const entorno = import.meta.env.VITE_APP_ENTORNO
	return (
		<Typography
			component={'div'}
			sx={{
				position: 'fixed',
				zIndex: 2,
				background: 'rgba(0, 0, 0, 0.02)',
				opacity: 0.5,
				bottom: 10,
				right: 10,
				px: 1,
				py: 0.5,
				borderRadius: 1,
				color: '#555',
				fontSize: 10,
				pointerEvents: 'none',
			}}
		>{`${version}-${entorno.toUpperCase()}`}</Typography>
	)
}

export default Version
