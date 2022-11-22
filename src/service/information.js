import api from './API'



export const informations = async (id) =>{
    const response = await api.get(`informations/${id}?populate=*&pagination[pageSize]=1000`)
    
return response;
    
}

export const deleteInfo = async (id) =>{
    const response = await api.delete(`informations/${id}?populate=*&pagination[pageSize]=1000`)
    
return response;
    
}
