// users?fields[0]=id&fields[1]=username
import api from './API'

export const allUser = async () =>{
    const response = await api.get('/users?fields[0]=id&fields[1]=username&pagination[pageSize]=1000')
    
return response;
    
}