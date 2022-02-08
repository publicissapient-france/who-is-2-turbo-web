import axios from 'axios';

axios.defaults.baseURL = process.env.GATSBY_API_URL;

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
