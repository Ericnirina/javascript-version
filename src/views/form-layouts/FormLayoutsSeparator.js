// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
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

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Prochain audience' autoComplete='off' />
})

export default function FormLayoutsSeparator (){
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  return (
    <Card>
      <CardHeader title='Insertion' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Formik
                
                enableReinitialize 
                initialValues={{
                    fcoin:'', 
                    montant: ''
                }} 
                validationSchema={Yup.object().shape({ 
                    montant: Yup.number()
                        .typeError("type error")
                        .positive("A number can't start with a minus")
                        .min(500)
                        .required('require'),
                    
                  
                })} 
                onSubmit={async (values, { 
                    resetForm, 
                    setErrors, 
                    setStatus, 
                    setSubmitting 
                    }) => {
                    try { 
                      
                      const myAchat = await achat(conversion(values.montant,'FTC'),conversionUsdt(conversion(values.montant,'FTC')),values.montant, 'espèces',etiquette,user.id,"ar");
                      const numTrans = 'RPM'+myAchat.data.id
                      const myTransaction = await addTransaction(values.montant,'Achat',numTrans, myAchat.data.id,user.id)
                      const myCash = await achatCash(myAchat.data.id);
                      toast.success("On va étudier votre transaction N° "+numTrans+" et veuillez la valider au point cash");

                      resetForm(); 
                        setStatus({ success: true }); 
                        setSubmitting(true);

                        // window.location.reload(false);
                        handleCloseModalCash()
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
                
                <form onSubmit={e => e.preventDefault()}>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          1. Compte Client
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Username' placeholder='Username' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth type='email' label='Email' placeholder='Email' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Identifiant' placeholder='Identifiant' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Telephone' placeholder='Telephone' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                          <OutlinedInput
                            label='Password'
                            value={values.password}
                            id='form-layouts-separator-password'
                            onChange={handlePasswordChange('password')}
                            type={values.showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  aria-label='toggle password visibility'
                                >
                                  {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='form-layouts-separator-password-2'>Confirm Password</InputLabel>
                          <OutlinedInput
                            value={values.password2}
                            label='Confirm Password'
                            id='form-layouts-separator-password-2'
                            onChange={handleConfirmChange('password2')}
                            type={values.showPassword2 ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position='end'>
                                <IconButton
                                  edge='end'
                                  aria-label='toggle password visibility'
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownConfirmPassword}
                                >
                                  {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                                </IconButton>
                              </InputAdornment>
                            }
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
                        <TextField fullWidth label='Nom des parties' placeholder='Nom des parties' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Nom du clients' placeholder='Nom du clients' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label='Nom de la partie adverse' placeholder='Nom de la partie adverse' />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          selected={date}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText='MM-DD-YYYY'
                          customInput={<CustomInput />}
                          id='form-layouts-separator-date'
                          onChange={date => setDate(date)}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Etat de procedure</InputLabel>
                          <Select
                            label='Etat de procedure'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
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
                      
                    </Grid>
                  </CardContent>
                  <Divider sx={{ margin: 0 }} />
                  <CardActions>
                    <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                      Valider
                    </Button>
                    <Button size='large' color='secondary' variant='outlined'>
                      Annuler
                    </Button>
                  </CardActions>
                </form>
              )}
              </Formik>
    </Card>
  )
}


