import api from './API'

export const updatePass = (id,password) =>{
    const response =  api.put(`/users/${id}`, {
        password : password
      })
    console.log(response)
    
return response;
    
}