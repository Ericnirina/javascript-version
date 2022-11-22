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

export const getNumDossier = async() =>{
    const response = await api.get(`/informations?fields[0]=numeroDossier`)
    console.log(response)
    
return response;
    
}
