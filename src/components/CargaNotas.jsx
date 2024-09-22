import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Typography, Box, Card, CardHeader, Divider, Modal, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert
} from '@mui/material';
import ReportProblem from '@mui/icons-material/ReportProblem';
import PersonOff from '@mui/icons-material/PersonOff';
import OpenInBrowser from '@mui/icons-material/OpenInBrowser';

const CargaNotas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [puntaje, setPuntaje] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false); // Para refrescar los datos

  // Simular la carga de datos desde una API usando useEffect
  useEffect(() => {
    // Simulamos una llamada a una API con setTimeout
    setTimeout(() => {
      const fetchedData = [
        {
          fecha: '05-08-2024',
          rut: '18021798-3',
          abogado: 'CATHERINE SILVA OSORIO',
          noRinde: true,
          abogadoPruebaId: 101,
          respuestasCorrectas: 100,
          noAsiste: "T"
        },
        {
          fecha: '06-08-2024',
          rut: '12345678-9',
          abogado: 'JOHN DOE',
          noRinde: false,
          abogadoPruebaId: 102,
          respuestasCorrectas: 200,
          noAsiste: "F"
        }
      ];
      setRows(fetchedData); // Actualizar los datos
    }, 2000); // Simulamos un retraso de 2 segundos
  }, [refresh]); // La tabla se refresca cada vez que 'refresh' cambia

  const handleNoRindePrueba = async () => {
    try {
      await axios.post('/api/guardar-no-rinde', {
        rut: selectedRow.rut,
        abogado: selectedRow.abogado,
        noRinde: true,
      });
      setSnackbar({ open: true, message: 'Datos de no rinde prueba guardados', severity: 'success' });
      setOpenDialog(false);
      setRefresh(!refresh); // Refrescar los datos
    } catch (error) {
      console.error('Error al guardar', error);
      setSnackbar({ open: true, message: 'Error al guardar los datos', severity: 'error' });
    }
  };

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPuntaje('');
  };

  // Función para validar que solo se introduzcan números en el campo de puntaje
  const handlePuntajeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPuntaje(value); // Solo permite números
    }
  };

  const handleGuardarPuntaje = async () => {
    try {
      /*await axios.post('/api/guardar-puntaje', {
        noAsiste: "F",
        abogadoPruebaId: selectedRow.abogadoPruebaId,
        puntajePrueba: puntaje,
      });*/
      setSnackbar({ open: true, message: 'Puntaje guardado exitosamente', severity: 'success' });
      handleCloseModal();
      setRefresh(!refresh); // Refrescar los datos
    } catch (error) {
      console.error('Error al guardar puntaje', error);
      setSnackbar({ open: true, message: 'Error al guardar el puntaje', severity: 'error' });
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
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Nº</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Fecha Rendición</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>RUT</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Abogado</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Respuestas Correctas</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Abogado No Rinde Prueba</TableCell>
                <TableCell style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.fecha}</TableCell>
                    <TableCell>{row.rut}</TableCell>
                    <TableCell>{row.abogado}</TableCell>
                    <TableCell>{row.respuestasCorrectas}</TableCell>
                    <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                    {row.noRinde ? (
                      <PersonOff sx={{ color: 'error.main' }} />
                    ) : (
                      <Button 
                        variant="outlined" 
                        color="info" 
                        size="small" 
                        onClick={() => handleOpenDialog(row)}
                        startIcon={<ReportProblem />}
                      >
                        Confirmar
                      </Button>
                    )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenModal(row)}>
                        <OpenInBrowser sx={{ color: '#FF6F61' }} />
                      </IconButton>
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar acción</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que el abogado {selectedRow?.abogado} no rinde la prueba?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleNoRindePrueba} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para ingresar el puntaje */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Ingresar Puntaje
          </Typography>
          <TextField
            label="Puntaje"
            fullWidth
            margin="normal"
            value={puntaje}
            onChange={handlePuntajeChange} // Validación numérica
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cerrar
            </Button>            
            <Button variant="contained" color="primary" onClick={handleGuardarPuntaje}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar de alerta */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CargaNotas;
