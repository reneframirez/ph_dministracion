import { useSesionExpiradaCheck } from './utils/SesionExpiradaProvider'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout.jsx'
import Inicio from './pages/Inicio.jsx'
import CargaNotas from './components/CargaNotas'; 
import TipoPruebaSelector from './components/TipoPruebaSelector'; 
import  NotasPrueba  from './components/NotasPrueba';
import { ProcesoProvider } from './utils/ProcesoContext'; // Importa ProcesoProvider

function App() {
	useSesionExpiradaCheck()

	return (
		<ProcesoProvider> {/* Envuelve la aplicación con ProcesoProvider */}
			<Routes>
				<Route element={<DefaultLayout />}> 
					<Route index element={<Inicio />} />
					<Route path="/carga-notas/:prueba/:read?" element={<CargaNotas />} />
					<Route path="/tipo-prueba" element={<TipoPruebaSelector />} />
					<Route path="/notas-prueba" element={<NotasPrueba />} />
				</Route>
			</Routes>
		</ProcesoProvider>
	)
}

export default App
