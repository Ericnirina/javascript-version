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

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const createData = (name, calories, fat, carbs, protein, price) => {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1
      }
    ]
  }
}

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
            const id_file = file.map((row)=>row.id)
            console.log(id_file)

            let datas = id_file.map(async (row)=>{
              let data = []
              data = await getFileById(row)
              
              return data
            })
            console.log("is",datas)

            // setlistFile(data.attributes.file.data)
            
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
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date de la prochaine audiance</TableCell>
                    <TableCell>Observation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
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