import { useQuery } from '@tanstack/react-query'
import axiosClient from '../utils/axiosClient.js'

const usePisee = (rut) => {
	return useQuery(
		['detalle-pisee', rut],
		async () => {
			const response = await axiosClient.get(`/detalle-pisee/${rut}`)
			return response.data
		},
		{
			enabled: !!rut,
		},
	)
}

export default usePisee
