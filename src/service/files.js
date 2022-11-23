import axios from "axios";
import { Information } from "mdi-material-ui";
import api from "./API";

export const addFile = async (files, nom,id) =>{
    // console.log(file)

    const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
    };

    const text = {
        nom : nom,
        information : id,
        url : "url.url"

    }

    const info = {
        information : id
    }
    console.log(id)
    
    for (let i = 0; i < files.length; i++) {

        const data = new FormData();
        data.append('data',  JSON.stringify(text));
        data.append('files.file', files[i]);
        console.log(data)
        axios({
            method: "post",
            url: `${process.env.API_URL}/api/fichiers`,
            data: data
        })
    }

    return true
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

export const deleteFileById = async (FileId) =>{
    const response = await api.delete(`/fichiers/${FileId}`)
    
return response
}

