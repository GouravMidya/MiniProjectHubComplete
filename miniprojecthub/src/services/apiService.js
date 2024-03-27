import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/projects';

const apiService = {
  getApprovedProjects: async () => {
    const response = await axios.get(`${API_BASE_URL}/approved`);
    return response.data;
  },

  getPendingProjects: async () => {
    const response = await axios.get(`${API_BASE_URL}/pending`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await axios.post(API_BASE_URL, projectData);
    return response.data;
  },

  approveProject: async (projectId) => {
    const response = await axios.put(`${API_BASE_URL}/${projectId}/approve`);
    return response.data;
  },

  rejectProject: async (projectId) => {
    const response = await axios.put(`${API_BASE_URL}/${projectId}/reject`);
    return response.data;
  },
};

export default apiService;