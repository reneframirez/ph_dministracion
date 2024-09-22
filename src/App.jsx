import { useSesionExpiradaCheck } from './utils/SesionExpiradaProvider'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout.jsx'
import Inicio from './pages/Inicio.jsx'
import CargaNotas from './components/CargaNotas'; 

function App() {
	useSesionExpiradaCheck()

	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route index element={<Inicio />} />
				<Route path="/carga-notas" element={<CargaNotas />} />
			</Route>
		</Routes>
	)
}

export default App
