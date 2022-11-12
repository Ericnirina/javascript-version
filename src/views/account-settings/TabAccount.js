/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import { addFile, getFileById } from 'src/service/files'
import { useEffect } from 'react'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [files, setFiles]= useState([])
  const [listFile, setlistFile] = useState()

  const onChange = async (e) => {
    const reader = new FileReader()
    const files = e.target.files
    console.log(files)
    setFiles(files)
  }

  const handlerSave = async (e) => {
    const response = await addFile(files, "test")
    
  }

  const handlerReset = () => {
    setFiles([])
  }

  const downloadFile = (url) => {
    return (<link href={`${process.env.API_URL}${url}`} download></link>)
  }

  useEffect(async () => {
    if(!listFile){
      const data = await getFileById(3);

      console.log(data.attributes.file.data)
      setlistFile(data.attributes.file.data)
    } 
  }, [listFile])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              { files.length !== 0  ? Object.values(files).map( (key, value) => (
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

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => handlerSave()}>
              Enregister
            </Button>
          </Grid>
          <Grid item xs={12}>
             { listFile && Object.values(listFile).map( (key, value) => (
                <a href={`${process.env.API_URL}${key.attributes.url}`} target='_blank' rel="noreferrer" style={{ textDecoration: "none"}}>
                  <Button 
                    variant='outlined' 
                    sx={{ marginRight: 3.5 }} 
                    style={{
                      borderRadius: "70px",
                      fontWeight: "200"
                  }}>
                    {key.attributes.name}
                  </Button>
                </a>
              ))}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
