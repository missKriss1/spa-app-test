import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://109.73.206.144:6969',
});

instance.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params.key = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie';
    return config;
});

export default instance;