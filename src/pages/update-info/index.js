// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsUpdateInfo'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { getNumDossier } from 'src/service/addNumDossier'

export default function FormLayouts (){

const [dossier, setDossier] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        
        if (!dossier) {
            const num = await getNumDossier()
            
            const doss = num.data.data
            setDossier(doss)
            console.log(doss)

        }
      }, [dossier])
    
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        {/* <Grid item xs={12} md={6}>
          <FormLayoutsBasic />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormLayoutsIcons />
        </Grid> */}
        <Grid item xs={12}>
          <FormLayoutsSeparator TableData={dossier}/>
        </Grid>
        {/* <Grid item xs={12}>
          <FormLayoutsAlignment />
        </Grid> */}
      </Grid>
    </DatePickerWrapper>
  )
}


