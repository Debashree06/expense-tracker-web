import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import { createExpense } from '../services/api';

const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Bills',
  'Shopping',
  'Other',
];

const AddExpense = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userId = 'user123';
      await createExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        userId,
      });
      navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Expense
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            required
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            required
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Add Expense
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddExpense; 