/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import PropTypes from "prop-types";
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from '@mui/styles';

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
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLayoutsSeparator from '../form-layouts/FormLayoutsUpdateInfo'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { informations } from 'src/service/information';
import { addFile, deleteFileById, getFileById } from 'src/service/files';
import { styled } from '@mui/material/styles'

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
  const [listFile, setlistFile] = useState([])
  const [openM, setOpenM] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [files, setFiles]= useState([])

  const onChange = async (e) => {
    const reader = new FileReader()
    const files = e.target.files
    console.log(files)
    setFiles(files)
  }

  const handleClickOpen = () => {
    setOpenM(true);
  };

  const handleClose = () => {
    setOpenM(false);
  };

  const handleChangeClickOpen = () => {
    setOpenChange(true);
  };

  const handleChangeClose = () => {
    setOpenChange(false);
  };

  const ResetButtonStyled = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(4.5),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
      textAlign: 'center',
      marginTop: theme.spacing(4)
    }
  }))

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  const handlerReset = () => {
    setFiles([])
  }

  const useStyles = makeStyles((theme) => ({
    box: {
      flex: "1 1 100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      overflowX: "hidden" // <--- This is new
      // maxWidth: "100%",
      // width: "100%"
    },
    button: {
      width: 200,
      fontSize: "0.7rem",
  
      "& .MuiButton-label": {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "left",
        display: "block"
      }
    }
  }));
  const classes = useStyles();

  return (
    <Fragment>
      
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} 
          
      >
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
              console.log(data)

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
        <TableCell component='th' scope='row'>
          {row?.nomClient}
        </TableCell>
        <TableCell align='right'>{row?.nomPartie}</TableCell>
        <TableCell align='right'>{row?.nomPartieAdverse}</TableCell>
        <TableCell align='right'>{row?.juridiction}</TableCell>
        <TableCell align='right'>{row?.etatProcedure}</TableCell>
        <TableCell align='right'>{moment(row?.dateProchainAudiance).format("DD/MM/YY")}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
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

                                <Button className={classes.button}
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
                <br/>
                <div>
                  <Button variant="contained" style={{color:"white"}} onClick={handleClickOpen}>
                    Ajouter
                  </Button>
                  <Dialog open={openM} onClose={handleClose}>
                    <DialogTitle>Ajout de fichier</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                       Ici, vous pouvez ajouter des fichiers
                      </DialogContentText>
                      
                      <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                        { files.length !== 0  ? Object.values(files).map( (key, value) => (
                          // eslint-disable-next-line react/jsx-key
                          <p> { key.name } </p>
                        )) : <p>Pas de fichier!</p>}
                      <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                        <Box>
                          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                            Telecharger le fichier
                            <input
                              hidden
                              type='file'
                              
                              // multiple
                              onChange={onChange}
                              accept='image/pdf, image/docx'
                              id='account-settings-upload-image'
                            />
                          </ButtonStyled>
                          <ResetButtonStyled color='error' variant='outlined' onClick={() => handlerReset()}>
                            Reset
                          </ResetButtonStyled>
                          <Typography variant='body2' sx={{ marginTop: 5 }}>
                            docx, pdf, jpg, png, xlsx, ...
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={async()=>{
                        
                        const added = await addFile(files,"ajout admin", row.id)
                        console.log(added)
                        handleClose()
                        window.location.reload();
                      }}>Valider</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={openChange} onClose={handleChangeClose}>
      <DialogTitle>Modifier des informations</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ici, vous pouvez modifier les informations
        </DialogContentText>
        
        <FormLayoutsSeparator/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleChangeClose}>Cancel</Button>
        <Button onClick={async()=>{
          
          const added = await addFile(files,"ajout admin", row.id)
          console.log(added)
          handleClose()
          window.location.reload();
        }}>Valider</Button>
      </DialogActions>
    </Dialog>
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
  },
  {
    id: 'density',
    label: 'Prochaine audience',
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
          <TableCell>N° Dossier</TableCell>
          {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
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