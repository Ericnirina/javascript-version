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

  // ** State
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.name}
        </TableCell>
        <TableCell align='right'>{row?.calories}</TableCell>
        <TableCell align='right'>{row?.fat}</TableCell>
        <TableCell align='right'>{row?.carbs}</TableCell>
        <TableCell align='right'>{row?.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date de la prochaine audiance</TableCell>
                    <TableCell>Observation</TableCell>
                    {/* <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell> */}
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
  { id: 'code', label: 'Nom du clients', minWidth: 100 },
  {
    id: 'population',
    label: 'Nom des parties',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'population',
    label: 'Partie adverse',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Juridiction',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'density',
    label: 'Etat de la procédure',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2)
  }
]



const rows = [
  createData('Frozen yoghurt', "159", "6.0", "24", "4.0", "3.99"),


  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
]

const TableCollapsible = (props) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const  { tableData } = props;
  const [data, setData] = useState([])


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
  useEffect(async () => {
    if(!data){
      setData(tableData)
      const res = await clients();

      const allclient = res.data.data.map((datas)=>{
        return createData(
          datas.attributes.nomClient, 
          datas.attributes.nomPartie, 
          datas.attributes.nomPartieAdverse,
          datas.attributes.juridiction, 
          datas.attributes.etatProcedure,
          datas.id,)

      })
      setData(allclient);
      console.log(allclient)
      console.log(rows)

    } 
  }, [data, rows])


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
          {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            {/* <TableCell />
            <TableCell>Nom du clients</TableCell>
            <TableCell align='right'>Nom des parties</TableCell>
            <TableCell align='right'>Nom de la partie adverse</TableCell>
            <TableCell align='right'>Juridiction</TableCell>
            <TableCell align='right'>Etat de la procédure</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => ( */}
          { tableData && tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <Row key={row?.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  </Paper>
  )
}

export default TableCollapsible

TableCollapsible.propTypes = {
  
  TableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};