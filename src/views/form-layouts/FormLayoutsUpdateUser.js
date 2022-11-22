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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { createInfo, createUser } from 'src/service/insertion'
import { styled } from '@mui/material/styles'
import { addFile, getFileById } from 'src/service/files'
import Autocomplete from '@mui/material/Autocomplete';
import { addNumDossier } from 'src/service/addNumDossier';
import { updatePass } from 'src/service/changePassword';

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Prochain audience' autoComplete='off' />
})

export default function FormLayoutsUpdateUser (props){

  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState()
  const [selectUser, setSelectUser] = useState()
  const [userID, setUserID] = useState()
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

  

 

 

  
  
  const handlerReset = () => {
    setFiles([])
  }
  
  
  const handleClickShowConfirmPassword = () => {
    setValues({ ...passvalues, showPassword2: !passvalues.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
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


 


  return (
    <Card>
      <CardHeader title='Modification utilisateur' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <Formik
                
                enableReinitialize 
                initialValues={{
                
                 
                  utilisateur:'',
                  password:'',
                  password2:''                
                }} 
                validationSchema={Yup.object().shape({ 
                  
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
                      
                     
                        const info = await updatePass(userID,values.password);
                        console.log(info)
                        toast.success('Mot de passe modifié')
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
                          1. Utilisateur
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                      <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Utilisateur</InputLabel>
                          <Select
                          error={Boolean(touched.utilisateur && errors.utilisateur)} 
                          helperText={touched.utilisateur && errors.utilisateur} 
                          onBlur={handleBlur} 
                          onChange={userChange}
                          value={selectUser}
                            label='Utilisateur'
                            defaultValue=''
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                            name="utilisateur"
                          >
                            {tableData && tableData.map((user) => (
                                <MenuItem  key={user.id} value={user}>
                                {user.username}
                                </MenuItem>
                            ))}
                                  
                          </Select>
                        </FormControl>
                      </Grid>
                      <Divider sx={{ margin: 0 }} />
                      <Grid item xs={12}>
                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                          2. Mot de passe
                        </Typography>
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
              <ToastContainer/>
    </Card>
  )
}

CustomInput.propTypes = {
  
    TableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  };


