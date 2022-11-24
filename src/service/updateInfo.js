import api from './API'

export const updateInfo = (id, nomPartie,nomPartieAdverse,nomClient,etatProcedure,juridiction,prochainAudience) =>{
    const response =  api.put(`/informations/${id}`, {
        data:{

            nomPartie : nomPartie,
            nomPartieAdverse : nomPartieAdverse,
            nomClient : nomClient,
            etatProcedure : etatProcedure,
            juridiction : juridiction,
            dateProchainAudiance : prochainAudience,
        }
      })
      
    // console.log(response)
    
return response;
    
}