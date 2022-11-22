/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import PropTypes from "prop-types";

// ** MUI Imports
import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import moment from 'moment';
import { informations } from 'src/service/information';
import { getFileById } from 'src/service/files';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ButtonGroup from '@mui/material/ButtonGroup';


// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'


const Row = props => {
  // ** Props
  const { row } = props
  const [listFile, setlistFile] = useState([])

  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={async() => {
            setOpen(!open)
            const info = await informations(row.id)
            const file = info.data.data.attributes.fichiers.data
            console.log(file)
            
            const id_file = file.map((row)=>row.id)
            console.log(id_file)
            id_file.map(async (row)=>{
              const data = await getFileById(row)
              if(listFile.length === 0)
              setlistFile(current => [...current, data])
              
            })

            
            }}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.numeroDossier}
        </TableCell>
        <TableCell align='center'>{row?.nomPartie}</TableCell>
        <TableCell align='center'>{row?.juridiction}</TableCell>
        <TableCell align='center'>{row?.etatProcedure}</TableCell>
        <TableCell align='center'>{moment(row?.dateProchainAudiance).format("DD/MM/YY")}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit >
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Fichiers
              </Typography>
              <Table size='small' aria-label='purchases'>
               
              <Grid item xs={12} container spacing={4}>
                  { listFile && (listFile).map((value) => (
                      console.log(value),
                      value.attributes.file?.data?.map((file) =>(
                        // eslint-disable-next-line react/jsx-key
                          <Grid item sm={4} xs={12}>
                            <a href={`${process.env.API_URL}${file.attributes.url}`} target='_blank' rel="noreferrer" style={{ textDecoration: "none"}}>
                              <ButtonGroup>

                                <Button 
                                  variant='outlined' 
                                 
                                >
                                  {
                                  (file.attributes.name).length<20 ? file.attributes.name : (file.attributes.name).slice(0,19)+"..."
                                  }
                                </Button>
                                  <Button onClick={async (e)=>{
                                    e.preventDefault()
                                    const del = await deleteFileById(value.id)
                                    console.log(del)
                                    window.location.reload()
                                    
                                    }} style={{width:"1px"}}>x</Button>
                              </ButtonGroup>
                            </a>
                          </Grid>
                      ))

                      ))}
                      
                </Grid>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const columns = [
  { id: 'code', label: 'Numéro de dossier', minWidth: 100 },
  {
    id: 'population',
    label: 'Nom des parties',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'population',
    label: 'Juridiction',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
     {
    id: 'density',
    label: 'Prochaine audience',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  }
]




const TableClient = (props) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const  { tableData } = props;
  const [data, setData] = useState([])



 


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label='sticky table'>
        <TableHead>
          <TableRow>
          <TableCell />
            <TableCell>Numéro de dossier</TableCell>
            <TableCell align='right'>Nom des parties</TableCell>
            <TableCell align='right'>Juridiction</TableCell>
            <TableCell align='right'>Etat de la procédure</TableCell>
            <TableCell align='right'>Prochaine audience</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableData && tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <Row key={row?.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  </Paper>
  )
}

export default TableClient

TableClient.propTypes = {
  
  TableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};