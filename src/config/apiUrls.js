export const API_URLS = {

    GET_PRUEBAS_PUNTAJES: (regionId, tipoPrueba) => `${import.meta.env.VITE_API_URL}api/administracion/listado-region-tipoprueba?regionId=${regionId}&tipoPrueba=${tipoPrueba}`,
    POST_RESPUESTAS: `${import.meta.env.VITE_API_URL}api/administracion/ins-puntaje-abogadoprueba`, 
    GET_PRUEBAS: () => `${import.meta.env.VITE_API_URL}api/administracion/pruebascarganotas`,
    GET_NOTAS: (tipo) => `${import.meta.env.VITE_API_URL}api/administracion/listado-nacional?tipoPrueba=${tipo}`,


    
};