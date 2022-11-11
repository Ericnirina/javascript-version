import axios from "axios";
import api from "./API";

export const addFile = async (files, nom) =>{
    // console.log(file)

    const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
    };

    const text = {
        nom : nom
    }

    const data = new FormData();

    data.append('data',  JSON.stringify(text));
    for (let i = 0; i < files.length; i++) {
        data.append('files.file', files[i]);
    }

    // data.append('files.file', file);

    // const response = await axios.post('http://localhost:1337/api/fichiers', data, config)
    const response = axios({
        method: "post",
        url: `${process.env.API_URL}/api/fichiers`,
        data: data
      })
    console.log(response.data)
    
return response;
    
}

export const updateFile = async (files, FileId) =>{

    const text = {
        nom : nom
    }

    const data = new FormData();
    data.append('data',  JSON.stringify(text));
    for (let i = 0; i < files.length; i++) {
        data.append('files.file', files[i]);
    }

    const response = axios({
        method: "put",
        url: `${process.env.API_URL}/api/fichiers/${FileId}?populate=*`,
        data: data
    })

    return response;
}

export const getFileById = async (FileId) =>{
    const response = await api.get(`/fichiers/${FileId}?populate=*`)
    
return response.data.data
}