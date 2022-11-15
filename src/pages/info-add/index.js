// ** MUI Imports
import { forwardRef, useState,useEffect } from 'react'
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsAddInfo from 'src/views/form-layouts/FormLayoutsAddInfo'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { allUser } from 'src/service/allUser'


const AddUSer = () => {
    const [allUSer, setAllUSer] = useState()

    useEffect(async () => {
        if (!allUSer) {
          const res = await allUser()
          console.log(res.data)
          setAllUSer(res.data)
        }
      }, [allUSer])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
       
        <Grid item xs={12}>
          <FormLayoutsAddInfo tableData={allUSer}/>
        </Grid>
        
      </Grid>
    </DatePickerWrapper>
  )
}

export default AddUSer
