export const createUser = async (username, email, password, identifiant,telephone,adresse) =>{
    const response = await api.post('/auth/local/register', {
        username: username,
        email: email,
        password: password,
        identifiant: identifiant,
        telephone: telephone,
        adresse: adresse
      })
    console.log(response.data)
    
return response.data;
    
}