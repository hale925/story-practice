import axios from 'axios';

export default async function getPositionsApi(){
    try {
        const response = await axios.get('https://6583de3b4d1ee97c6bce6c82.mockapi.io/tree');
        console.log(response.data);
        
        return response.data;
      } catch (error) {
        
        console.error('Error fetching data:', error);
        return false;
      }
}
