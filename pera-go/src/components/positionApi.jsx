import axios from 'axios';

const API_URL = 'https://6583de3b4d1ee97c6bce6c82.mockapi.io';

// Fetch all positions
export async function getPositions() {
  try {
    const response = await axios.get(`${API_URL}/tree`);
    return response.data;
  } catch (error) {
    console.error('Error fetching positions:', error);
    throw new Error('Failed to retrieve positions');
  }
}

// Create a new position
export async function createPosition(data) {
  try {
    const response = await axios.post(`${API_URL}/tree`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating position:', error);
    throw new Error('Failed to create position');
  }
}

// Update an existing position
export async function updatePosition(id, data) {
  try {
    const response = await axios.patch(`${API_URL}/tree/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating position:', error);
    throw new Error('Failed to update position');
  }
}

// Delete a position
export async function deletePosition(id) {
  try {
    await axios.delete(`${API_URL}/tree/${id}`);
  } catch (error) {
    console.error('Error deleting position:', error);
    throw new Error('Failed to delete position');
  }
}
