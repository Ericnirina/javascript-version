// ** React Imports
import { forwardRef, useState } from 'react'

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
import TabAccount from '../account-settings/TabAccount'
import { styled } from '@mui/material/styles'
import { addFile, getFileById } from 'src/service/files'


const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Prochain audience' autoComplete='off' />
})

export default function FormLayoutsSeparator (){
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState()
  const [dateAudience, setDateAudience] = useState(date)
  const [passConfirm, setPassConfirm] = useState("none")
  const [files, setFiles]= useState([])
  const [listFile, setlistFile] = useState()

  const onChange = async (e) => {
    const reader = new FileReader()
    const files = e.target.files
    console.log(files)
    setFiles(files)
  }

  const [passvalues, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
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

  const ButtonStyled = styled(Button)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center'
    }
  }))

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...passvalues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...passvalues, showPassword: !passvalues.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...passvalues, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...passvalues, showPassword2: !passvalues.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }
  
  const handlerReset = () => {
    setFiles([])
  }

  return (
    <Card>
      <CardHeader title='Insertion' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Formik
                
                enableReinitialize 
                initialValues={{
                  username: '',
                  email: '', 
                  adresse: '', 
                  telephone: '', 
                  password: '' ,
                  password2:'',
                  nomPartie:'',                
                  nomClient:'',                
                  etatProcedure:'',                
                  nomPartieAdverse:'',                
                  prochainAudience:'',                
                  juridiction:'',                
                }} 
                validationSchema={Yup.object().shape({ 
                  username: Yup.string().required('Merci de renseigner votre username').min(6, '+ de 6 caractères'),
                  adresse: Yup.string().required('Merci de renseigner votre adresse'),
                  telephone: Yup.string().required('Merci de renseigner votre telephone'),
                  nomClient: Yup.string().required('Merci de renseigner ce champs'),
                  nomPartie: Yup.string().required('Merci de renseigner ce champs'),
                  nomPartieAdverse: Yup.string().required('Merci de renseigner ce champs'),
                  etatProcedure: Yup.string().required('Merci de renseigner ce champs'),
                  juridiction: Yup.string().required('Merci de renseigner ce champs'),
                  email: Yup.string().email('Merci de corriger votre Email').required('Merci de renseigner votre Email'), 
                  password: Yup.string().min(6, 'Your password must contain between 6 and 60 characters.').max(60, 'Your password must contain between 6 and 60 characters.').required('Merci de renseigner votre mot de passe'), 
                  password2: Yup.string().when("password", {
                      is: val => (val && val.length > 0 ? true : false),
                      then: Yup.string().oneOf(
                      [Yup.ref("password")],
                      "Vérifier le mot de passe"
                      )
                  }) 
                  
                })} 
                onSubmit={async (values, { 
                    resetForm, 
                    setErrors, 
                    setStatus, 
                    setSubmitting 
                    }) => {
                    try { 
                      
                     
                      const user = await createUser(values.username,values.email,values.password,values.adresse, values.telephone,"client")
                      console.log(user.user.id)
                      const info = await createInfo(values.nomPartie, values.nomClient, values.nomPartieAdverse, values.juridiction,values.etatProcedure,dateAudience,user.user.id)
                      console.log(info.data.id)
                       const file = await addFile(files, "test",info.data.id)
                      console.log(file)
                      resetForm(); 
                        setStatus({ success: true }); 
                        setSubmitting(true);
                      

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
                          1. Compte Client
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(touched.username && errors.username)} 
                        helperText={touched.username && errors.username} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.username}
                        fullWidth label='Username' placeholder='Username' name='username' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(touched.email && errors.email)} 
                        helperText={touched.email && errors.email} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.email}
                        fullWidth type='email' label='Email' placeholder='Email' name='email' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                         error={Boolean(touched.adresse && errors.adresse)} 
                         helperText={touched.adresse && errors.adresse} 
                         onBlur={handleBlur} 
                         onChange={handleChange} 
                         value={values.adresse}
                        fullWidth label='Adresse' placeholder='Adresse' name='adresse'  />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(touched.telephone && errors.telephone)} 
                        helperText={touched.telephone && errors.telephone} 
                        onBlur={handleBlur} 
                        onChange={handleChange} 
                        value={values.telephone}
                        fullWidth label='Telephone' placeholder='Telephone' name='telephone' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                          <TextField
                            error={Boolean(touched.password && errors.password)} 
                            helperText={touched.password && errors.password} 
                            onBlur={handleBlur} 
                            onChange={handleChange}
                            value={values.password}
                            label='Password'
                            name="password"
                            id='form-layouts-separator-password-2'
                            type={passvalues.showPassword ? 'text' : 'password'}
                            InputProps={{endAdornment:
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowPassword}
                                >
                                  {passvalues.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            
                          }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            error={Boolean(touched.password2 && errors.password2)} 
                            helperText={touched.password2 && errors.password2} 
                            onBlur={handleBlur} 
                            onChange={handleChange}
                            value={values.password2}
                            label='Confirm Password'
                            name="password2"
                            id='form-layouts-separator-password-2'
                            type={passvalues.showPassword2 ? 'text' : 'password'}
                            InputProps={{endAdornment:
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowConfirmPassword}
                                >
                                  {passvalues.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            
                          }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ marginBottom: 0 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          2. Information
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(touched.nomPartie && errors.nomPartie)} 
                        helperText={touched.nomPartie && errors.nomPartie} 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.nomPartie}
                        name="nomPartie"
                        fullWidth label='Nom des parties' placeholder='Nom des parties' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                        error={Boolean(touched.nomClient && errors.nomClient)} 
                        helperText={touched.nomClient && errors.nomClient} 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.nomClient}
                        name="nomClient"
                        fullWidth label='Nom du clients' placeholder='Nom du clients' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        error={Boolean(touched.nomPartieAdverse && errors.nomPartieAdverse)} 
                        helperText={touched.nomPartieAdverse && errors.nomPartieAdverse} 
                        onBlur={handleBlur} 
                        onChange={handleChange}
                        value={values.nomPartieAdverse}
                        name="nomPartieAdverse" 
                        fullWidth label='Nom de la partie adverse' placeholder='Nom de la partie adverse' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={date}
                          showYearDropdown
                          showMonthDropdown
                          dateFormat="dd/MM/yyyy" 
                          placeholderText='DD-MM-YYYY'
                          customInput={<CustomInput
                            error={Boolean(touched.prochainAudience && errors.prochainAudience)} 
                            helperText={touched.prochainAudience && errors.prochainAudience} 
                            name="prochainAudience"
                            onChange={handleChange}
                            onBlur={handleBlur}
                             />}
                          id='form-layouts-separator-date'
                          onChange={(date) => {
                            setDate(date)
                            setDateAudience(date.toISOString())
                            console.log(date.toISOString())
                            
                           
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
                          onChange={handleChange}
                          value={values.etatProcedure}
                            label='Etat de procedure'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                            name="etatProcedure"
                          >
                            <MenuItem value='Attente de la convocation'>Attente de la convocation</MenuItem>
                            <MenuItem value='Attente du premier appel de cause
          '>Attente du premier appel de cause
          </MenuItem>
                            <MenuItem value='Attente des écritures de la partie adverse
          '>Attente des écritures de la partie adverse
          </MenuItem>
                            <MenuItem value='Attente de transmission de pièces de la partie adverse'>Attente de transmission de pièces de la partie adverse</MenuItem>
                            <MenuItem value='Écriture à produire avant la prochaine audience'>Écriture à produire avant la prochaine audience</MenuItem>
                            <MenuItem value='Pièces à produire avant la prochaine audience'>Pièces à produire avant la prochaine audience</MenuItem>
                            <MenuItem value='Affaire mise en délibérée
          '>Affaire mise en délibérée
          </MenuItem>
                            <MenuItem value='Affaire clôturée – gain de cause
          '>Affaire clôturée – gain de cause
          </MenuItem>
                            <MenuItem value='Affaire clôturée – perte de la cause – attente d’introduction de voies de recours'>Affaire clôturée – perte de la cause – attente d’introduction de voies de recours</MenuItem>
                            <MenuItem value='Attente d’enrôlement de l’affaire'>Attente d’enrôlement de l’affaire</MenuItem>
                            <MenuItem value='Écriture à soumettre à la juridiction'>Écriture à soumettre à la juridiction</MenuItem>
                            <MenuItem value='Proposition d’accord amiable à soumettre à l’autre partie'>Proposition d’accord amiable à soumettre à l’autre partie</MenuItem>
                            <MenuItem value='Réponse à Proposition d’accord amiable à émettre'>Réponse à Proposition d’accord amiable à émettre</MenuItem>
                            <MenuItem value='Attente de la rédaction de la décision'>Attente de la rédaction de la décision</MenuItem>
                            <MenuItem value='Décision transmis à l’huissier pour exécution'>Décision transmis à l’huissier pour exécution</MenuItem>
                            <MenuItem value='Décision remis au client'>Décision remis au client</MenuItem>
                            <MenuItem value='Déportation de l’affaire, dossier remis au client'>Déportation de l’affaire, dossier remis au client</MenuItem>
                            <MenuItem value='Désistement à produire'>Désistement à produire</MenuItem>
                            <MenuItem value='Protocole transactionnelle à faire signer'>Protocole transactionnelle à faire signer</MenuItem>
                            <MenuItem value='Attente des instructions du client'>Attente des instructions du client</MenuItem>
                            <MenuItem value='Voies de recours à introduire'>Voies de recours à introduire</MenuItem>
                            
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
                          onChange={handleChange}
                          value={values.juridiction}
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
                            <MenuItem value='Conseil de Discipline du Barreau
          '>Conseil de Discipline du Barreau
          </MenuItem>
                            <MenuItem value='Conseil de Discipline Professionnelle'>Conseil de Discipline Professionnelle</MenuItem>
                            <MenuItem value='Inspection du Travail'>Inspection du Travail</MenuItem>
                            <MenuItem value='Autre'>Autre</MenuItem>
                          </Select>

                        </FormControl>
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
                          
                    
                    </Grid>
                  </CardContent>
                  <Divider sx={{ margin: 0 }} />
                  <CardActions>
                    <Button size='large' disabled={isSubmitting} type='submit' sx={{ mr: 2 }} variant='contained'>
                      Valider
                    </Button>
                   
                  </CardActions>
                </form>
              )}
              </Formik>
    </Card>
  )
}


