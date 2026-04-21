import axios from 'axios';


const skyScannerHttpClient = axios.create({
  baseURL: 'https://skyscanner-api.p.rapidapi.com/v3/',
  timeout: 60000,
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com',
  },
});

export default skyScannerHttpClient;
