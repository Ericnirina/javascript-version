import api from './API'

export const addNumDossier = (numeroDossier,id) =>{
    const response =  api.put(`/informations/${id}`, {
        data:{

            numeroDossier : numeroDossier
        }
      })
    console.log(response)
    
return response;
    
}
