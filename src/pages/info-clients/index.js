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
import TableClient from 'src/views/tables/TableClient'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";

// service
import { client, clients } from 'src/service/clients'


const MUITable = () => {
  const[dataClients, setDataClients] = useState();
  const { user } = useRecoilValue(authAtom);

  const createData = (numeroDossier, nomPartie,juridiction, etatProcedure, dateProchainAudiance) => {
    return {
        numeroDossier,
      nomPartie,
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
    console.log(user.id)
      const one_res = await client(user.id);
      console.log(one_res.data.information)
      
      const allclient = one_res.data.information.map((datas)=>{

        return createData(
          datas.numeroDossier, 
          datas.nomPartie, 
          datas.juridiction, 
          datas.etatProcedure,
          (datas.dateProchainAudiance),)

      })
      setDataClients(allclient);


    } 
  }, [dataClients])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            Listes des affaires
          </Link>
        </Typography>
        <Typography variant='body2'><i>Cliquez sur le numéros de dossier pour accéder aux différentes écritures de la procédure</i></Typography>
      </Grid>
   
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} /> */}
          <TableClient tableData={dataClients}/>
        </Card>
      </Grid>
     
    </Grid>
  )
}

export default MUITable
