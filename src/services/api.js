import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExpenses = async (userId) => {
  const response = await api.get(`/expenses/${userId}`);
  return response.data;
};

export const createExpense = async (expenseData) => {
  const response = await api.post('/expenses', expenseData);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};

export const syncExpenses = async (userId, lastSyncTime, pendingChanges) => {
  const response = await api.post('/expenses/sync', {
    userId,
    lastSyncTime,
    pendingChanges,
  });
  return response.data;
};

export default api; 