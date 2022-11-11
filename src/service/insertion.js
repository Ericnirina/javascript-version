import api from './API'

export const createUser = async (username, email, password, adresse,telephone) =>{
    const response = await api.post('/auth/local/register', {
        username: username,
        email: email,
        password: password,
        adresse: adresse,
        telephone: telephone,
      })
    console.log(response.data)
    
return response.data;
    
}

export const createInfo = async (nomPartie, nomClient, nomPartieAdverse, juridiction,etatProcedure,dateProchainAudiance,user) =>{
    const response = await api.post('/informations', {data:{
        nomPartie: nomPartie,
        nomClient: nomClient,
        nomPartieAdverse: nomPartieAdverse,
        juridiction: juridiction,
        etatProcedure: etatProcedure,
        dateProchainAudiance: dateProchainAudiance,
        user:user
      }})
    console.log(response.data)
    
return response.data;
    
}