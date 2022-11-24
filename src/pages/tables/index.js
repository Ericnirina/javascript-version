// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import SearchIcon from 'mdi-material-ui/TabSearch'
import CancelIcon from 'mdi-material-ui/Close'
import TextField from '@mui/material/TextField'


// ** Demo Components Imports
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TableCollapsible from 'src/views/tables/TableCollapsible'

// service
import { clients } from 'src/service/clients'



const MUITable = () => {
  const[dataClients, setDataClients] = useState();
  const[data, setData] = useState();
  const [searched, setSearched] = useState("");

  const requestSearch = (e) => {
    setSearched(e.target.value)
    console.log(e.target.value)

    const filteredRows = data.filter((row) => {
      return row.numeroDossier.includes(e.target.value)
    });

    setDataClients(filteredRows);
  };

  const cancelSearch = () => {
    setDataClients(data);
    setSearched("");
  }; 
  
  const createData = (id,numeroDossier,nomClient, nomPartie, nomPartieAdverse, juridiction, etatProcedure, dateProchainAudiance, email, telephone, adresse) => {
    return {
      id,
      numeroDossier,
      nomClient,
      nomPartie,
      nomPartieAdverse,
      juridiction,
      etatProcedure,
      dateProchainAudiance,
      email,
      telephone,
      adresse,
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
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = [
    createData('Frozen yoghurt', "159", "6.0", "24", "4.0", "3.99"),
  
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
  
  ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if(!dataClients){

      const res = await clients();

      const allclient = res.data.data.map((datas)=>{
        const date = new Date(datas.attributes.dateProchainAudiance);
        console.log(date.getFullYear())

        return createData(
          datas.id, 

          datas.attributes.numeroDossier, 
          datas.attributes.nomClient, 
          datas.attributes.nomPartie, 
          datas.attributes.nomPartieAdverse,
          datas.attributes.juridiction, 
          datas.attributes.etatProcedure,
          (datas.attributes.dateProchainAudiance),
          datas.attributes.user.data?.attributes?.email,
          datas.attributes.user.data?.attributes?.telephone,
          datas.attributes.user.data?.attributes?.adresse,
          
          )

      })
      setDataClients(allclient)
      setData(allclient)
      console.log(res)

      console.log(allclient)
      console.log(rows)

    } 
  }, [dataClients, rows])

  const search = ()=>{
    return(<h1>A</h1>)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Typography variant='h5'>
            Listes de toutes les informations
        </Typography>
        <Typography variant='body2'>Vous pouvez vérifier toutes les informations ou ajouter des fichiers</Typography>
      </Grid>
      <Grid item xs={6} container alignItems="flex-end" direction="column" justifyContent="flex-end">
        
          <Typography variant='p'>
                Recherche par numero de dossier
          </Typography>
      <TextField
          size="small"
          variant="outlined"
          value={searched}
          onChange={(e) => requestSearch(e)}
          InputProps={{
            startAdornment: (
                <SearchIcon style={{ marginRight: 9}}/>
            ),
            endAdornment: (
              <CancelIcon style={{cursor:"pointer"}} onClick={() => cancelSearch()} />
            )
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableCollapsible tableData={dataClients}/>
        </Card>
      </Grid>
     
    </Grid>
  )
}

export default MUITable
