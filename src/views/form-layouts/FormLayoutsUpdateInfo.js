// ** React Imports
import { forwardRef, useState,useEffect } from 'react'
import PropTypes from "prop-types";

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { Formik } from 'formik'
import * as Yup from 'yup';

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { createInfo, createUser } from 'src/service/insertion'
import { styled } from '@mui/material/styles'
import { addFile, getFileById } from 'src/service/files'
import Autocomplete from '@mui/material/Autocomplete';
import { getNumDossier } from 'src/service/addNumDossier';
import { deleteInfo, informations } from 'src/service/information';
import { updateInfo } from 'src/service/updateInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomInput = forwardRef((input, ref) => {
    return <TextField fullWidth {...input} inputRef={ref} label='Prochain audience' autoComplete='off' />
})

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

export default function FormLayoutsUpdateInfo (props){
    const [dossier, setDossier] = useState()

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState()
  const [selectUser, setSelectUser] = useState()
  const [userID, setUserID] = useState()
  const [selectDossier, setSelectDossier] = useState()
  const [dateAudience, setDateAudience] = useState(date)
  const [files, setFiles]= useState([])
  const [listFile, setlistFile] = useState()
  const  { tableData } = props;

  
  

  const userChange = (e,) => {
        setSelectUser(e.target.value.username)
        setUserID(e.target.value.id)
        console.log(e.target.value.username)
        console.log(e.target.value.id)
  }

  const onChange = async (e) => {
    const reader = new FileReader()
    const files = e.target.files
    console.log(files)
    setFiles(files)
  }

  

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

  
  
  const handlerDelete = async() => {
    // console.log(idInfo)
    if(idInfo){
      await deleteInfo(idInfo);
      window.location.reload()
    }
  }

  const [vnomPartie, setNomPartie]= useState(' ')
  const [vnomClient, setNomClient]= useState(' ')
  const [vnomPartieAdverse, setNomPartieAdverse]= useState(' ')
  const [vjuridiction, setJuridiction]= useState()
  const [vprochainAudience, setProchainAudience]= useState()
  const [vetatProcedure, setEtatProcedure]= useState()
  const [idInfo, setIdInfo]= useState()

  const dossierChange = async(e)=>{
    setSelectDossier(e.target.value.attributes.numeroDossier)
    console.log(e.target.value.attributes.numeroDossier)
    console.log(e.target.value.id)
    setIdInfo(e.target.value.id)

     const info = await informations(e.target.value.id)
     const {nomPartie,nomClient,nomPartieAdverse,juridiction,dateProchainAudiance,etatProcedure} = info.data.data.attributes
     setNomPartie(nomPartie)
     setNomClient(nomClient)
     setNomPartieAdverse(nomPartieAdverse)
     setJuridiction(juridiction)
     const d = new Date(dateProchainAudiance)
     setProchainAudience(d)
     setEtatProcedure(etatProcedure)
     console.log(info.data.data.attributes)

}

  useEffect(async() => {
    
      if (!dossier) {
          const num = await getNumDossier()
          
          const doss = num.data.data.filter((row)=> row.attributes.numeroDossier)
          setDossier(doss)
          console.log(doss)

      }
    }, [dossier])
 

  return (
    <Card>
      <CardHeader title='Modifier ou supprimer information' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Formik
                
                enableReinitialize 
                initialValues={{
                
                  nomPartie:'',                
                  nomClient:'',                
                  etatProcedure:'',                
                  nomPartieAdverse:'',                
                  prochainAudience:'',                
                  juridiction:'',
                  numeroDossier:''                
                }} 
                validationSchema={Yup.object().shape({ 
                  vnomClient: Yup.string().required('Merci de renseigner ce champs'),
                  vnomPartie: Yup.string().required('Merci de renseigner ce champs'),
                  vnomPartieAdverse: Yup.string().required('Merci de renseigner ce champs'),
                  vetatProcedure: Yup.string().required('Merci de renseigner ce champs'),
                  vjuridiction: Yup.string().required('Merci de renseigner ce champs'),
                  
                  
                  
                })} 
                onSubmit={async (values, { 
                    resetForm, 
                    setErrors, 
                    setStatus, 
                    setSubmitting 
                    }) => {
                    try { 
                      
                        const info = await updateInfo(idInfo, vnomPartie,vnomPartieAdverse,vnomClient,vetatProcedure,vjuridiction,vprochainAudience)
                        console.log(info.data.id)

                        const file = await addFile(files, "test",info.data.id)

                        console.log(file)
                        
                        // // console.log(info)
                        // resetForm(); 
                        // setStatus({ success: true }); 
                        // setSubmitting(true);
                      

                      } catch (err) { 
                        console.log(err); 
                        setStatus({ success: false }); 
                        setErrors({ submit: err.message }); 
                        setSubmitting(false); 
                      } 
                }} 
              >
                 {({ 
                errors, 
                handleBlur, 
                handleChange, 
                handleSubmit, 
                isSubmitting, 
                touched, 
                values 
              }) => (
                
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          1. N° de Dossier
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                       
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Numéro de dossier</InputLabel>
                          <Select
                          error={Boolean(touched.numeroDossier && errors.numeroDossier)} 
                          helperText={touched.numeroDossier && errors.numeroDossier} 
                          onBlur={handleBlur} 
                          onChange={dossierChange}
                          value={selectDossier}
                            label='Numéro de dossier'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                            name="numeroDossier"
                           
                          >
                            {dossier && dossier.map((key)=>(

                                // eslint-disable-next-line react/jsx-key
                                <MenuItem value={key}>{key.attributes.numeroDossier}</MenuItem>
                            )
                                
                            )

                            }
                        </Select>
                        </FormControl>
                       
                      </Grid>
                      <Divider sx={{ margin: 0 }} />
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          2. Information
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(!vnomPartie && 'Merci de renseigner ce champ')} 
                        helperText={!vnomPartie && 'Merci de renseigner ce champ'} 
                        onBlur={handleBlur} 
                        onChange={(e)=>{
                            setNomPartie(e.target.value)
                        }}
                        value={vnomPartie}
                        InputLabelProps={{ shrink: true }}
                        name="nomPartie"
                        fullWidth label='Nom des parties'  />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(!vnomClient && 'Merci de renseigner ce champ')} 
                        helperText={!vnomClient && 'Merci de renseigner ce champ'} 
                        onBlur={handleBlur} 
                        onChange={(e)=>{
                            setNomClient(e.target.value)
                        }}
                        value={vnomClient}
                        InputLabelProps={{ shrink: true }}
                        name="nomClient"
                        fullWidth label='Nom du clients'  />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        error={Boolean(!vnomPartieAdverse && 'Merci de renseigner ce champ')} 
                        helperText={!vnomPartieAdverse && 'Merci de renseigner ce champ'} 
                        onBlur={handleBlur} 
                        InputLabelProps={{ shrink: true }}
                        onChange={(e)=>{
                            setNomPartieAdverse(e.target.value)
                        }}
                        value={vnomPartieAdverse}
                        name="nomPartieAdverse" 
                        fullWidth label='Nom de la partie adverse'  />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={vprochainAudience}
                          showYearDropdown
                          showMonthDropdown
                          dateFormat="dd/MM/yyyy" 
                          placeholderText='DD-MM-YYYY'
                          customInput={<CustomInput
                            error={Boolean(touched.prochainAudience && errors.prochainAudience)} 
                            helperText={touched.prochainAudience && errors.prochainAudience} 
                            name="prochainAudience"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                             />}
                          id='form-layouts-separator-date'
                          onChange={(vprochainAudience) => {
                            setProchainAudience(vprochainAudience)
                            setDateAudience(vprochainAudience.toISOString())
                            console.log(vprochainAudience.toISOString())
                            
                           
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Etat de procedure</InputLabel>
                          <Select
                          error={Boolean(touched.etatProcedure && errors.etatProcedure)} 
                          helperText={touched.etatProcedure && errors.etatProcedure} 
                          onBlur={handleBlur} 
                          onChange={(e)=>{
                            setEtatProcedure(e.target.value)
                        }}
                          InputLabelProps={{ shrink: true }}
                          defaultValue={''}
                          value={""+vetatProcedure+""}
                            label='Etat de procedure'
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                            name="etatProcedure"
                          >
                            <MenuItem value='Attente de la convocation'>Attente de la convocation</MenuItem>
                            <MenuItem value='Attente du premier appel de cause'>Attente du premier appel de cause
          </MenuItem>
                            <MenuItem value='Attente des écritures de la partie adverse'>Attente des écritures de la partie adverse
          </MenuItem>
                            <MenuItem value='Attente de transmission de pièces de la partie adverse'>Attente de transmission de pièces de la partie adverse</MenuItem>
                            <MenuItem value='Écriture à produire avant la prochaine audience'>Écriture à produire avant la prochaine audience</MenuItem>
                            <MenuItem value='Pièces à produire avant la prochaine audience'>Pièces à produire avant la prochaine audience</MenuItem>
                            <MenuItem value='Affaire mise en délibérée'>Affaire mise en délibérée
          </MenuItem>
                            <MenuItem value='Affaire clôturée – gain de cause'>Affaire clôturée – gain de cause
          </MenuItem>
                            <MenuItem value='Affaire clôturée – perte de la cause – attente d’introduction de voies de recours'>Affaire clôturée – perte de la cause – attente d’introduction de voies de recours</MenuItem>
                            <MenuItem value='Attente d’enrôlement de l’affaire'>Attente d’enrôlement de l’affaire</MenuItem>
                            <MenuItem value='Écriture à soumettre à la juridiction'>Écriture à soumettre à la juridiction</MenuItem>
                            <MenuItem value='Proposition d’accord amiable à soumettre à l’autre partie'>Proposition d’accord amiable à soumettre à l’autre partie</MenuItem>
                            <MenuItem value='Réponse à Proposition d’accord amiable à émettre'>Réponse à Proposition d’accord amiable à émettre</MenuItem>
                            <MenuItem value='Attente de la rédaction de la décision'>Attente de la rédaction de la décision</MenuItem>
                            <MenuItem value='Décision transmise à l’huissier pour exécution'>Décision transmise à l’huissier pour exécution</MenuItem>
                            <MenuItem value='Décision remise au client'>Décision remise au client</MenuItem>
                            <MenuItem value='Déportation de l’affaire, dossier remis au client'>Déportation de l’affaire, dossier remis au client</MenuItem>
                            <MenuItem value='Désistement à produire'>Désistement à produire</MenuItem>
                            <MenuItem value='Protocole transactionnelle à faire signer'>Protocole transactionnelle à faire signer</MenuItem>
                            <MenuItem value='Attente des instructions du client'>Attente des instructions du client</MenuItem>
                            <MenuItem value='Voies de recours à introduire'>Voies de recours à introduire</MenuItem>
                            <MenuItem value='Attente de l’audience des plaidoiries et/ou des observations orales'>Attente de l’audience des plaidoiries et/ou des observations orales</MenuItem>
                            <MenuItem value='Note en délibéré à produire'>Note en délibéré à produire</MenuItem>
                            <MenuItem value='Demande d’enrôlement à dépose'>Demande d’enrôlement à dépose</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Juridiction</InputLabel>
                          <Select
                          error={Boolean(touched.juridiction && errors.juridiction)} 
                          helperText={touched.juridiction && errors.juridiction} 
                          onBlur={handleBlur} 
                          onChange={(e)=>{
                            setJuridiction(e.target.value)
                        }}
                          value={""+vjuridiction+""}
                            name="juridiction"
                            label='Juridiction'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                          >
                            <MenuItem value='JEX civil'>JEX civil</MenuItem>
                            <MenuItem value='JEX commercial'>JEX commercial</MenuItem>
                            <MenuItem value='Référé TPI'>Référé TPI</MenuItem>
                            <MenuItem value='Référé CA'>Référé CA</MenuItem>
                            <MenuItem value='Référé TC'>Référé TC</MenuItem>
                            <MenuItem value='Référé CAC'>Référé CAC</MenuItem>
                            <MenuItem value='Premier Président de CA'>1er Président de CA</MenuItem>
                            <MenuItem value='Juge des Requêtes TPI'>Juge des Requêtes TPI</MenuItem>
                            <MenuItem value='Juge des Requêtes TC'>Juge des Requêtes TC</MenuItem>
                            <MenuItem value='Juge cadial'>Juge cadial</MenuItem>
                            <MenuItem value='Procureur'>Procureur</MenuItem>
                            <MenuItem value='Juge d’Instruction'>Juge d’Instruction</MenuItem>
                            <MenuItem value='Chambre d’accusation'>Chambre d’accusation</MenuItem>
                            <MenuItem value='Tribunal de Première Instance'>Tribunal de Première Instance</MenuItem>
                            <MenuItem value='Tribunal de Commerce'>Tribunal de Commerce</MenuItem>
                            <MenuItem value='Tribunal de Travail'>Tribunal de Travail</MenuItem>
                            <MenuItem value='Tribunal Administratif'>Tribunal Administratif</MenuItem>
                            <MenuItem value='Cour d’Arbitrage'>Cour d’Arbitrage</MenuItem>
                            <MenuItem value='Juge des Enfants'>Juge des Enfants</MenuItem>
                            <MenuItem value='Tribunal Correctionnel'>Tribunal Correctionnel</MenuItem>
                            <MenuItem value='Cour d’Assise'>Cour d’Assise</MenuItem>
                            <MenuItem value='Juridiction d’Exception'>Juridiction d’Exception</MenuItem>
                            <MenuItem value='Cour d’Appel Commercial'>Cour d’Appel Commercial</MenuItem>
                            <MenuItem value='Cour Administrative d’Appel'>Cour Administrative d’Appel</MenuItem>
                            <MenuItem value='Cour Suprême'>Cour Suprême</MenuItem>
                            <MenuItem value='Haut Conseil de la Magistrature'>Haut Conseil de la Magistrature</MenuItem>
                            <MenuItem value='Conseil de Discipline du Barreau'>Conseil de Discipline du Barreau
          </MenuItem>
                            <MenuItem value='Conseil de Discipline Professionnelle'>Conseil de Discipline Professionnelle</MenuItem>
                            <MenuItem value='Inspection du Travail'>Inspection du Travail</MenuItem>
                            <MenuItem value="Cour d'Appel de droit commun">Cour d'Appel de droit commun</MenuItem>

                            <MenuItem value='Juridiction d’exception'>Juridiction d’exception</MenuItem>
                            <MenuItem value='Autre'>Autre</MenuItem>
                          </Select>

                        </FormControl>
                      </Grid>
                      

                        
                    
                    </Grid>
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
                              multiple
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
                   
                  </CardContent>
                  <Divider sx={{ margin: 0 }} />
                  <CardActions>
                    <Button size='large' disabled={
                        !selectDossier
                    } type='submit' sx={{ mr: 2 }} variant='contained'
                    onClick={async(e)=>{
                        e.preventDefault()
                        const info = await updateInfo(idInfo, vnomPartie,vnomPartieAdverse,vnomClient,vetatProcedure,vjuridiction,vprochainAudience)
                        if(files){
                          await addFile(files, "test",info.data.data.id)
                        }
                        toast.success('Modification enregistré')
                    }}>
                      Valider
                    </Button>
                    <ResetButtonStyled color='error' variant='outlined' onClick={() => handlerDelete()}>
                      Supprimer
                    </ResetButtonStyled>
                   
                  </CardActions>
                </form>
              )}
              </Formik>
              <ToastContainer/>
    </Card>
  )
}



FormLayoutsUpdateInfo.propTypes = {
  
    TableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  };


