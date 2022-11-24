import { useState,useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import MyForm from 'src/views/form-layouts/FormLayoutsUpdateUser'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { allUser } from 'src/service/allUser'


const updateUSer = () => {

    const [allUSer, setAllUSer] = useState()

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <MyForm tableData={allUSer}/>
        </Grid>
        
      </Grid>
    </DatePickerWrapper>
  )
}

export default updateUSer
