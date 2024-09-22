import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

export default defineConfig(async ({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	let jwt = null
	if (command === 'serve') {
		const response = await axios.get(
			`http://10.0.214.9:8030/ms-frontend-auth/generar/${env.USUPRODEF_PRUEBA}/${env.NOMBRE_BACKEND}/24`,
		)
		console.log('Iniciado el JWT de testing:', response.data.token)
		console.log('Emitido para:', response.data.iss)
		console.log('Usuprodef de prueba:', env.USUPRODEF_PRUEBA)
		console.log('Entorno:', response.data.entorno)
		jwt = response.data.token
	}

	return {
		define: {
			'process.env': {
				JWT_TESTING: jwt,
			},
		},
		plugins: [react()],
		base:
			command === 'build'
				? `https://app.dpp.cl/${env.npm_package_name}/${env.npm_package_version}/${mode}`
				: '',
		build: {
			outDir: `dist/${env.npm_package_name}/${env.npm_package_version}/${mode}`,
			assetsInlineLimit: 0,
			manifest: true,
			emptyOutDir: true,
			rollupOptions: {
				input: '/src/main.jsx',
				output: {
					entryFileNames: 'assets/[name].js',
				},
			},
		},
	}
})
