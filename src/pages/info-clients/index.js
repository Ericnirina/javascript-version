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

  const createData = (id,numeroDossier, nomPartie,juridiction, etatProcedure, dateProchainAudiance) => {
    return {
        id,
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
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if(!dataClients){
    console.log(user.id)
      const one_res = await client(user.id);
      console.log(one_res.data.information)
      
      const allclient = one_res.data.information.map((datas)=>{

        return createData(
          datas.id,
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
