// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

// service
import { clients } from 'src/service/clients'


const MUITable = () => {
  const[dataClients, setDataClients] = useState();
  
  const createData = (id,nomClient, nomPartie, nomPartieAdverse, juridiction, etatProcedure, dateProchainAudiance) => {
    return {
      id,
      nomClient,
      nomPartie,
      nomPartieAdverse,
      juridiction,
      etatProcedure,
      dateProchainAudiance,
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
          datas.attributes.nomClient, 
          datas.attributes.nomPartie, 
          datas.attributes.nomPartieAdverse,
          datas.attributes.juridiction, 
          datas.attributes.etatProcedure,
          (datas.attributes.dateProchainAudiance),)

      })
      setDataClients(allclient);
      console.log(res)

      console.log(allclient)
      console.log(rows)

    } 
  }, [dataClients, rows])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Listes de toutes les informations
          </Link>
        </Typography>
        <Typography variant='body2'>Vous pouvez vérifier toutes les informations ou ajouter des fichiers</Typography>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Basic Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableBasic />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableDense />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} /> */}
          <TableCollapsible tableData={dataClients}/>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableSpanning />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid> */}
    </Grid>
  )
}

export default MUITable
