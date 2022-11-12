// ** React Imports
import { useState, useContext } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from "next/router";

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {useSetRecoilState } from 'recoil';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { Formik } from 'formik'
import { confirmeUser } from 'src/service/auth'
import { tokenContext, userContext } from 'src/@core/context/authsContext'
import { authAtom } from 'src/recoil/atom/authAtom'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  // const [values, setValues] = useState({
  //   password: '',
  //   showPassword: false
  // })
  const setAuth = useSetRecoilState(authAtom);

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              Connectez-vous
            </Typography>
          </Box>
          {/* <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Connectez-vous 
            </Typography>
          </Box> */}
          <Formik
            enableReinitialize 
            initialValues={{ 
                email: '', 
                password: '',
                showPassword: false
            }}
            validationSchema={Yup.object().shape({ 
                email: Yup.string().email('Merci de corriger votre Email').required('Merci de renseigner votre Email'), 
                password: Yup.string().min(5, 'Your password must contain between 4 and 60 characters.').max(60, 'Your password must contain between 4 and 60 characters.').required('Merci de renseigner votre mot de passe'), 
            })} 
            onSubmit={async (values, { 
                resetForm, 
                setErrors, 
                setStatus, 
                setSubmitting 
            }) => { 
                // try { 
                //     // NOTE: Make API request 
                //     // await wait(200);
                    const userRecoil = await confirmeUser(values.email, values.password);
                    console.log(userRecoil)
                    if(userRecoil.data){

                        // if(userRecoil.data.user.access == "user"){
                            setAuth({ token: userRecoil.data.jwt, user: userRecoil.data.user  });
                            console.log(userRecoil.data.jwt)
                            resetForm();
                            setStatus({ success: true }); 
                            setSubmitting(false);
                            Router.push("/form-layouts");

                        // }
                        // if(userRecoil.data.user.access == "Admin"){
                        //     setAuth({ token: userRecoil.data.jwt, user: userRecoil.data.user  });
                        //     resetForm();
                        //     setStatus({ success: true }); 
                        //     setSubmitting(false);
                        //     Router.push("/superAdmin/tableau");
                        // }
                    }
                    if(userRecoil.message == "Request failed with status code 400"){
                        toast.error(userRecoil.response.data.error.message);
                    }
                    else{
                        toast.error(userRecoil.message);
                        setStatus({ success: false }); 
                        setErrors({ submit: err.message }); 
                        setSubmitting(false); 
                    }

                // } catch (err) { 
                //     console.error(err); 
                    // setStatus({ success: false }); 
                    // setErrors({ submit: err.message }); 
                    // setSubmitting(false); 
                // } 
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
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
              <TextField
                autoFocus
                id='email'
                sx={{ marginBottom: 4 }}
                error={Boolean(touched.email && errors.email)} 
                helperText={touched.email && errors.email} 
                onBlur={handleBlur} 
                onChange={handleChange} 
                value={values.email} 
                fullWidth 
                label="Email"
                name="email" 
                required 
                style={{marginTop:-20}}
              />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  autoFocus
                  id='Password'
                  sx={{ marginBottom: 4 }}
                  error={Boolean(touched.password && errors.password)} 
                  helperText={touched.password && errors.password} 
                  onBlur={handleBlur} 
                  onChange={handleChange} 
                  value={values.password} 
                  fullWidth 
                  label="Password"
                  name="password" 
                  required
                  type={values.showPassword ? 'text' : 'password'}

                  // endAdornment={
                  //   <InputAdornment position='end'>
                  //     <IconButton
                  //       edge='end'
                  //       onClick={!values.showPassword}
                  //       onMouseDown={handleMouseDownPassword}
                  //       aria-label='toggle password visibility'
                  //     >
                  //       {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                />
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel control={<Checkbox />} label='Remember Me' />
                <Link passHref href='/'>
                  <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
                </Link>
              </Box>
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }} 
                color="primary" 
                disabled={isSubmitting} 
                type="submit"
              >
                Login
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  New on our platform?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/pages/register'>
                    <LinkStyled>Create an account</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
        </CardContent>
      </Card>
      <ToastContainer />
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
