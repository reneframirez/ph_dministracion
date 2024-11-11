import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography, Box, Card, CardHeader, Divider, Modal, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert
} from '@mui/material';
import ReportProblem from '@mui/icons-material/ReportProblem';
import PersonOff from '@mui/icons-material/PersonOff';
import axios from '../utils/axiosClient';
import { API_URLS } from '../config/apiUrls';
import { useParams } from 'react-router-dom';

const CargaNotas = () => {
  const { prueba } = useParams(); // Obtiene el parámetro de año de la rutaa
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [puntaje, setPuntaje] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false); // Para refrescar los datos
  const read = location.state?.read;  

  useEffect(() => {
    alert(read)

    const fetchPuntajes = async () => {
      try {
        const response = await axios.get(API_URLS.GET_PRUEBAS_PUNTAJES(4, prueba));
        console.log(response);
        setRows(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPuntajes();
  }, [refresh]);

  const handleNoRindePrueba = async () => {
    try {
      const response = await axios.post(API_URLS.POST_RESPUESTAS, {
        abogadoPruebaId: parseInt(selectedRow.abogadoPruebaId, 10), // Convertir a entero
        noAsiste: "V"
      });       
      setSnackbar({ open: true, message: 'Datos de no rinde prueba guardados', severity: 'success' });
      setOpenDialog(false);
      setRefresh(!refresh); // Refrescar los datos
    } catch (error) {
      console.error('Error al guardar', error);
      setSnackbar({ open: true, message: 'Error al guardar los datos', severity: 'error' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPuntaje('');
  };

  // Función para validar que solo se introduzcan números en el campo de puntaje
  const handlePuntajeChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const updatedRows = [...rows];
      updatedRows[index].puntajePrueba = value; // Actualizar el puntaje en la fila específica
      setRows(updatedRows);
    }
  };

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  
  // Captura Enter, simula el POST y avanza al siguiente campo
  const handleKeyDown = async (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evitar el submit del formulario

      try {
        const response = await axios.post(API_URLS.POST_RESPUESTAS, {
          abogadoPruebaId: rows[index].abogadoPruebaId,
          puntajePrueba: rows[index].puntajePrueba,
          noAsiste: "F"
        });        
        /* await axios.post('/api/guardar-puntaje', {
          noAsiste: "F",
          abogadoPruebaId: rows[index].abogadoPruebaId,
          puntajePrueba: rows[index].puntajePrueba,
        }); */
        setRefresh(!refresh); // Refrescar los datos
        setSnackbar({ open: true, message: 'Puntaje guardado exitosamente', severity: 'success' });

        // Mover el foco al siguiente campo
        const nextInput = document.querySelector(`[data-index="${index + 1}"]`);
        if (nextInput) {
          nextInput.focus();
        }
      } catch (error) {
        console.error('Error al guardar puntaje', error);
        setSnackbar({ open: true, message: 'Error al guardar el puntaje', severity: 'error' });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Card style={{ width: '90%', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
        <CardHeader
          title="Notas Prueba Defensa Penitenciaria"
          subheader="Periodo para cargar las Notas: Desde 23-07-2024 al 10-08-2024"
          subheaderTypographyProps={{ color: 'error', variant: 'subtitle1' }}
          titleTypographyProps={{ variant: 'h6', align: 'center' }}
        />
        <Divider />

        <Box px={2} py={1} textAlign="right">
          <Typography variant="subtitle2">Fecha: 29-07-24</Typography>
        </Box>

        <Typography variant="subtitle2" align="center" sx={{ color: 'text.secondary', marginBottom: 2 }}>
          Prueba Habilitante Defensa Penitenciaria - Octubre 2024
        </Typography>

        <TableContainer component={Paper} style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Nº<br /></TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Fecha<br />Rendición</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>RUT<br /><br /></TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Abogado<br /><br /></TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Abogado No Rinde Prueba<br /><br /></TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Respuestas Correctas<br /><Typography variant="caption" color="textSecondary">
                        Ingrese la nota y presione Enter para grabar y continuar
                      </Typography>   </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.fechaPrueba}</TableCell>
                    <TableCell>{row.rutPersona}</TableCell>
                    <TableCell>{`${row.nomPersona} ${row.appPersona} ${row.apmPersona}`}</TableCell>
                    <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                      {row.abogadoEstadoId===3 ? (
                        <PersonOff sx={{ color: 'error.main' }} />
                      ) : (
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          onClick={() => handleOpenDialog(row)}
                          startIcon={<ReportProblem />}
                          disabled={read === 'R'} 
                        >
                          Confirmar
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Puntaje"
                        fullWidth
                        size="small"
                        margin="normal"
                        value={row.puntajePrueba}
                        disabled={row.abogadoEstadoId === 3 || read === 'R'} 
                        onChange={(e) => handlePuntajeChange(e, index)} // Validación numérica
                        onKeyDown={(e) => handleKeyDown(e, index)} // Evento para capturar Enter
                        inputProps={{ 'data-index': index }} // Agregar data-index para identificar el campo
                      />                  
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Cargando datos...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box px={2} py={2}>
          <Typography variant="body2" color="text.secondary" align="center">
            *Datos de la prueba habilitante de defensa penitenciaria
          </Typography>
        </Box>
      </Card>

      {/* Dialog de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent> 
          <DialogContentText>
             {`¿Estás seguro de que el abogado ${selectedRow?.nomPersona} ${selectedRow?.appPersona} no rinde la prueba?`}  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleNoRindePrueba} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de alerta */}
      <Snackbar 
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Posicionar en la parte superior derecha
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CargaNotas;
