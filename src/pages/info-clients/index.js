/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import SearchIcon from 'mdi-material-ui/TabSearch'
import CancelIcon from 'mdi-material-ui/Close'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { Card, CardHeader } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";

import { fr } from 'date-fns/locale';

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
import { useRouter } from 'next/router'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.PropTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const events = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4]
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
    color: "#50b500"
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 1,
    editable: false,
    deletable: false
  },
]

const translations = {
  navigation: {
  month: "Mois",
  week: "Semaines",
  day: "Jours",
  today: "Ajourd'hui"
  },
  form: {
  addTitle: "Ajouter",
  editTitle: "Modifier",
  confirm: "Confirmer",
  delete: "Supprimer",
  cancel: "Annuler"
  },
  event: {
  title: "Description",
  start: "Debut",
  end: "Fin",
  allDay: "Toute la journée"
 },
  moreEvents: "Plus...",
  loading: "En cours..."
}


const MUITable = () => {
  const[dataClients, setDataClients] = useState();
  const[data, setData] = useState();
  const [value, setValue] = useState(0);
  const [searched, setSearched] = useState("");
  const { user, token } = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const router = useRouter();
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const [navVisible, setNavVisible] = useState(false)
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Listes des affaires" {...a11yProps(0)} />
          <Tab label="Prendre rendez-vous" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </Box>
    </Box>

    <TabPanel value={value} index={0}>
      <Grid container spacing={6} style={{ padding : 30, paddingTop: 60}} >
        <Grid item xs={6}>
          <Typography variant='h6'>
              Listes des affaires
          </Typography>
          <Typography variant='body2'><i>Cliquez sur l'icone de la flèche pour accéder aux différentes écritures de la procédure</i></Typography>
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
    </TabPanel>
    <TabPanel value={value} index={1}>
      <Grid item xs={6} style={{ margin : 30}}>
        <Typography variant='h6'>
            Prendre rendez-vous
        </Typography>
        <Typography variant='body2'><i>Cliquez sur une date du calendrier disponible et acceder au prise de rendez-vous</i></Typography>
      </Grid>
      <Card  style={{ margin : 30, padding : 10}}>
        <CardHeader title='Agenda' titleTypographyProps={{ variant: 'h6' }} />
          <Scheduler
            view="month"
            events={events}
            selectedDate={new Date()}
            locale={fr}
            translations={translations}
            draggable="true"
            editable="true"
          />
      </Card>
    </TabPanel>
    </>
  )
}

export default MUITable
