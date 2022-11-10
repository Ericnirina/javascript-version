import api from './API'

export const clients = async () =>{
    const response = await api.get('/informations?populate=*&pagination[pageSize]=1000')
    
return response;
    
}
