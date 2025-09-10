import axios from 'axios';
import {REQUEST_TIMEOUT} from "@/config";


const fetcher = axios;

const apiClient = fetcher.create({
    //TODO: Move api url to env file
    baseURL: 'https://zkenqz5o2i.execute-api.us-east-1.amazonaws.com/stats-graphs',
    timeout: REQUEST_TIMEOUT,
});

export { apiClient };