
import axios from 'axios';

const API_URL = 'https://6583de3b4d1ee97c6bce6c82.mockapi.io';

const employeeApi = {
  async getEmployees() {
    try {
      const response = await axios.get(`${API_URL}/employee`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Failed to retrieve employees');
    }
  },

  async createEmployee(data) {
    try {
      const response = await axios.post(`${API_URL}/employee`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw new Error('Failed to create employee');
    }
  },

  async updateEmployee(id, data) {
    try {
      const response = await axios.patch(`${API_URL}/employee/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error('Failed to update employee');
    }
  },

  async deleteEmployee(id) {
    try {
      await axios.delete(`${API_URL}/employee/${id}`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw new Error('Failed to delete employee');
    }
  },
};

export default employeeApi;

