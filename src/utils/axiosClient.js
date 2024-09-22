import axios from 'axios'

export default axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: { Authorization: `Bearer ${process.env.JWT_TESTING || window?.bearer}` },
})
