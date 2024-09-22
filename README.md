# Proyecto base para ser utilizado en los desarrollos de frontend.
## oirs-dpp-frontend 2.0.0

# Dependencias incluidas
#### El proyecto viene preconfigurado para utilizar las siguientes depedencias.

1. MUI - Libreria de componentes UI para utilizar
   - Documentación: https://mui.com/material-ui/getting-started/usage/
2. REACT-QUERY - Libreria para gestionar el estado de llamadas a servidos REST (API)
   - Documentación: https://tanstack.com/query/v3/docs/react/overview
3. AXIOS - Librería/abstración para las solicitudes de RED (GET, POST, PUT, DELETE, ETC)
   - Documentación: https://axios-http.com/docs/example
   - Notas: Se utiliza en conjunto con **REACT-QUERY**
4. REACT-ROUTER-DOM - Librería para la navegación por RUTAS en la APP.
   - Documentación: https://reactrouter.com/en/main
5. REACT-HOOK-FORM - Librería para el manejo de formularios.
   - Documentación: https://react-hook-form.com/get-started/
   - Nota: Se utiliza en conjunto con YUP para la validación de formularios.
6. YUP - Librería para la creación y validación de schemas (objectos, formularios, etc)
   - Documentación: https://github.com/jquense/yup
   - Nota: Se utiliza en conjunto con REACT-HOOK-FORM para implementar la validación de campos.



## 1. Instalación del proyecto.

- Clonar el repositorio: `git clone http://gitlab.dpp.cl/DPP/oirs-dpp-frontend.git`
- Eliminar la carpeta `.git` en proyecto clonado

### IMPORTANTE
- Cambiar el nombre del proyecto en el archivo `package.json`
  - Por defecto el proyecto se llama `oirs-dpp-frontend`, se debe cambiar a el nombre del proyecto en ejecucción `ejemplo-nombre-frontend`
- Cambiar el nombre del backend a utilizar en el archivo `utils/axiosClient.js`
  - Por defecto el proyecto se llama `oirs-dpp-backend`, se debe cambiar a el nombre del proyecto en ejecucción `ejemplo-nombre-backend`
- Cambiar nombre del SLUG del backend (para la generación del JWT de pruebas)
  - Este valor se encuentra en el archivo `.env` y se llama `NOMBRE_BACKEND`
- En caso de necesitar utilizar un USUPRODEF en particular para las pruebas (para el JWT generado) esto se ajusta en la propiedad `USUPRODEF_PRUEBA` del archivo `.env`


- Inciar un nuevo repositorio GIT
    - `git init`
    - `git add .`
    - `git commit -m "Inicio del proyecto"`
    - `git checkout -b develop`
- Iniciar la herramienta GIT FLOW:
    - `git checkout develop`
    - `git checkout master`
    - `git flow init`
- Instalar las dependencias del proyecto:
    - `npm install`

## 2. Ejecución del proyecto
- Una vez instaladas las dependencias, se puede ejecutar el proyecto con el comando `npm run dev`


## 3. Estructura del proyecto
El proyecto debe seguir la siguiente estructura de carpetas:
 - `src/assets` - Carpeta para almacenar los archivos estáticos del proyecto (Imagenes, fuentes, etc)
 - `src/components` - Carpeta para almacenar los componentes de la aplicación.
 - `src/pages` - Carpeta para almacenar las páginas de la aplicación.
 - `src/utils` - Carpeta para almacenar los archivos de utilidades de la aplicación.
 - `src/hooks` - Carpeta para almacenar los archivos de hooks de la aplicación.
 - `src/api` - Carpeta para almacenar los archivos de llamadas a la API de la aplicación.

## 4. Ejemplos de uso y creación de componentes clave.
#### 4.1. Ejemplo de react-query en la carpeta `src/api/usePisee.js`
```javascript
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient.js";
const usePisee = (rut) => {
    return useQuery(['detalle-pisee', rut], async () => {
        const response = await axiosClient.get(`/detalle-pisee/${rut}`)
        return response.data;
    }, {
        enabled: !!rut,
    })
};

export default usePisee;
```

Notas: se utiliza axiosClient en vez de axios, ya que axiosClient viene preconfigurado para utilizar la url del backend como base.
En este caso la llamada a la API se realizaría a la url: `http://localhost:8080/ejemplo-nombre-backen/detalle-pisee/${rut}` y además se le inyectaría el token de AUTENTICACIÓN (JWT)

## IMPORTANTE

El token de pruebas es generado automaticamente al iniciar el proyecto con el comando `npm run dev` y se genera con una vigencia de 24 horas, pasado este periodo el token expirará y aparecerá el dialogo "Su sesión expiró".

Para solucionar este problema, se debe reiniciar el proyecto con el comando `npm run dev` y se generará un nuevo token de pruebas.