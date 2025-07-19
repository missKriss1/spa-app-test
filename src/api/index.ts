import axios from 'axios';

const instance = axios.create({
    baseURL: '/api', // теперь ты обращаешься к своим Vercel Functions
});

export default instance;