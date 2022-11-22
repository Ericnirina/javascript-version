/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import SearchIcon from 'mdi-material-ui/TabSearch'
import CancelIcon from 'mdi-material-ui/Close'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Demo Components Imports
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import TableClient from 'src/views/tables/TableClient'
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from "../../recoil/atom/authAtom";
import Menu from 'mdi-material-ui/Menu'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

// service
import { client, clients } from 'src/service/clients'
import { styled, useTheme } from '@mui/material/styles'
import themeConfig from 'src/configs/themeConfig'
import { useRouter } from 'next/router'


const MUITable = () => {
  const[dataClients, setDataClients] = useState();
  const[data, setData] = useState();
  const [searched, setSearched] = useState("");
  const { user, token } = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const router = useRouter();
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const [navVisible, setNavVisible] = useState(false)
  const theme = useTheme()

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

  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
  

  const toggleNavVisibility = () => setNavVisible(!navVisible)

  const StyledLink = styled('a')({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  })

  const HeaderTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    lineHeight: 'normal',
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
  }))

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

    useEffect(async() => {
        if (!token || !user) {
          setAuth({ token: null, user: null });
          router.push('/')
        }
        else if (user){
          if(user.access != 'client'){
            setAuth({ token: null, user: null });
            router.push('/')
          }
        }
        if(!dataClients && user){
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
          setData(allclient);
    
    
        }
      }, [dataClients])

  return (
    <>
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} style={{ padding : 10}}>
      <img
        src='/images/logo.jpg'
        alt="Picture"
        style={{ marginTop : 5}}
        width={130}
        height={70}
      />
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            {/* <Menu /> */}
          </IconButton>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </Box>
    </Box>
    <Grid container spacing={6} style={{ padding : 30, paddingTop: 60}} >
      <Grid item xs={6}>
        <Typography variant='h6'>
            Listes des affaires
        </Typography>
        <Typography variant='body2'><i>Cliquez sur le numéros de dossier pour accéder aux différentes écritures de la procédure</i></Typography>
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
          {/* <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} /> */}
          <TableClient tableData={dataClients}/>
        </Card>
      </Grid>
     
    </Grid>
    </>
  )
}

export default MUITable
