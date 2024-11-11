import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, IconButton } from '@mui/material';
import Circle from '@mui/icons-material/Circle';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Tooltip from '@mui/material/Tooltip'; // Importar Tooltip
import axios from '../utils/axiosClient';
import { API_URLS } from '../config/apiUrls';


const PruebasPendientes = () => {
  const [rows, setRows] = useState([]);

  /*const rows = [
    { prueba: 'Prueba General', periodo: '01-09-2024 al 10-09-2024', procesado: true, link: '/ingresar-notas/general' },
    { prueba: 'Prueba Pública', periodo: '15-09-2024 al 25-09-2024', procesado: false, link: '/ingresar-notas/publica' },
  ];*/

  useEffect(() => {
    const fetchPuntajes = async () => {
      try {
        const response = await axios.get(API_URLS.GET_PRUEBAS());
        console.log(response);
        setRows(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPuntajes();
  }, []);

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3} mt={4}>
      <Typography variant="h5" gutterBottom sx={{ width: '100%', textAlign: 'center' }}>
        Pruebas pendientes de ingreso de notas
      </Typography>

      {rows.map((row, index) => (
        <Card key={index} sx={{ width: '300px', boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <Typography variant="h6">{row.nombrePrueba}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Periodo de carga de notas:<br />
                  <strong>{`${row.fechaInicioCargaNota} - ${row.fechaFinCargaNota}`}</strong>
                </Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" color="textSecondary">
                Estado de la prueba:
                <Tooltip title={row.procesado ? 'Prueba procesada' : 'Prueba pendiente'}>
                  <Circle sx={{ color: row.procesado ? '#8bc34a' : '#ffb74d', marginLeft: 1, fontSize: 16 }} />
                </Tooltip>
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              endIcon={<ArrowForward />}
              color="primary"
              href={`/carga-notas/${row.tipoPrueba}`}  // Construir el link dinámico usando row.pruebaId
              size="small"
              fullWidth
            >
              Ingresar notas
            </Button>

          </CardActions>

        </Card>
      ))}
    </Box>
  );
};

export default PruebasPendientes;
