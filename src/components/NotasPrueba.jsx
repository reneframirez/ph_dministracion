import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, IconButton } from '@mui/material';
import { CheckCircle, Error, OpenInNew, PublishedWithChanges  } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from '../utils/axiosClient';
import { API_URLS } from '../config/apiUrls';
import { useParams } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#F0F4F8',
  color: '#333',
  fontWeight: 'bold',
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFFFFF',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f9fafa',
  },
}));

const NotasPrueba = () => {

  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false); // Para refrescar los datos

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await axios.get(API_URLS.GET_NOTAS('P'));
        console.log(response);
        setRows(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotas();
  }, [refresh]);


  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Puntaje prueba defensa general
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Período para Ejecución del Proceso de Homologación: Desde 23-07-2024 al 15-08-2024
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Nº</StyledTableCell>
              <StyledTableCell>Región</StyledTableCell>
              <StyledTableCell>Inscritos</StyledTableCell>
              <StyledTableCell>Abogados con puntaje Cargada</StyledTableCell>
              <StyledTableCell>Abogados sin puntaje Cargada</StyledTableCell>
              <StyledTableCell>Abogados No Rinden Prueba</StyledTableCell>
              <StyledTableCell>Validación</StyledTableCell>
              <StyledTableCell>Detalle Registro puntajes</StyledTableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {rows.length === 0 ? (
              <StyledTableRow>
                <TableCell colSpan={8} align="center">
                  No hay datos disponibles.
                </TableCell>
              </StyledTableRow>
            ) : (
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.inscritos}</TableCell>
                  <TableCell>{row.conNotas}</TableCell>
                  <TableCell>{row.sinNotas}</TableCell>
                  <TableCell>{row.noRinde}</TableCell>
                  <TableCell>
                    {row.inscritos > 0 && row.sinNotas === 0 ? (
                      <CheckCircle style={{ color: '#4caf50' }} />
                    ) : (
                      <Error style={{ color: '#f44336' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton component={Link} to={{ pathname: `/carga-notas/${row.tipoPrueba}`, state: { read: 'R' } }}>
                      <OpenInNew />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#4caf50', padding: '10px 20px' }}
          startIcon={<PublishedWithChanges style={{ fontSize: 30 }} />} // Aquí agregamos el ícono y lo personalizamos
        >
          Procesar Puntaje
        </Button>
      </div>
    </Container>
  );
};

export default NotasPrueba;
