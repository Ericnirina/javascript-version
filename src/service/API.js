import axios from 'axios';

const Api = axios.create({
    baseURL: `${process.env.API_URL}/api`,
    headers: {
        // Authorization : `Bearer ${localStorage.getItem("access_token")}`
    }
});

export default Api;