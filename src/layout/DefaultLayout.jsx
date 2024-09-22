import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
	return (
		<div>
			<div>Layout por default</div>
			<Outlet />
		</div>
	)
}

export default DefaultLayout
