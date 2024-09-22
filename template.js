import * as rd from 'readline'
import fs from 'fs-extra'
import path from 'path'

const readline = rd.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const pregunta = (pregunta) => {
	return new Promise((resolve, reject) => {
		readline.question(pregunta, (respuesta) => {
			if (!respuesta) reject('No hay respuesta')
			resolve(respuesta)
			readline.close()
		})
	})
}

const main = async () => {
	let nombre
	try {
		nombre = await pregunta('nombre para la carpeta del proyecto: ')
	} catch (e) {
		console.log('Error:', e)
		process.exit(-1)
	}
	const nombreLimpio = nombre.toLowerCase().trim().replace(/\s/g, '-')

	const existeDir = fs.existsSync('../' + nombreLimpio)

	//check if directory is empty

	if (existeDir) {
		const files = fs.readdirSync('../' + nombreLimpio)
		if (files.length > 0) {
			console.log(
				`El directorio (${path.resolve(
					'../' + nombreLimpio,
				)}) no esta vacio, no se puede continuar`,
			)
			process.exit(-1)
		}
	} else {
		const dirCreado = await fs.ensureDir('../' + nombreLimpio)
		if (!dirCreado) {
			console.log(`No se pudo crear el directorio (${path.resolve('../' + nombreLimpio)})`)
			process.exit(-1)
		} else {
			console.log(`Directorio creado: ${path.resolve('../' + nombreLimpio)}`)
		}
	}

	try {
		await fs.copy('./', '../' + nombreLimpio, {
			filter: (src, dest) => {
				const exludes = [
					'.git',
					'node_modules',
					'package-lock.json',
					'template.js',
					'README.md',
					'.idea',
				]
				if (exludes.includes(path.basename(src))) return false
				console.log('Copiando: ', src, 'a', dest)
				return true
			},
		})
	} catch (e) {
		console.log('Error al copiar archivos', e)
		process.exit(-1)
	}

	const packageJson = await fs.readJson('../' + nombreLimpio + '/package.json')
	packageJson.name = nombreLimpio
	packageJson.version = '1.0.0'

	delete packageJson.devDependencies['fs-extra']
	delete packageJson.scripts['template']

	//guardar package.json
	await fs.writeJson('../' + nombreLimpio + '/package.json', packageJson, {
		spaces: '\t',
	})

	console.log('Proyecto creado exitosamente!')
	console.log(
		`Por favor ingresar al repositorio (${path.resolve(
			'../' + nombreLimpio,
		)}) y ejecutar el comando 'npm install' para instalar las dependencias`,
	)
}

main()
