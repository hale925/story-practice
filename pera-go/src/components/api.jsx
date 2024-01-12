import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchPositions } from './positionSlice'; 

const Api = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      console.log("ki ");
      try {
        const response = await axios.get('https://6583de3b4d1ee97c6bce6c82.mockapi.io/tree');
        console.log(response.data);
        
        dispatch(fetchPositions(response.data)); 
      } catch (error) {
        
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      
      {children} 
    </div>
  );
};

export default Api;
