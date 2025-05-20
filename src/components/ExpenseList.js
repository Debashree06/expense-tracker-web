import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getExpenses, deleteExpense } from '../services/api';
import { useExpenses } from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, setExpenses } = useExpenses();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const userId = 'user123';
      const data = await getExpenses(userId);
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to delete expense'
      );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Expenses
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell align="right">{formatAmount(expense.amount)}</TableCell>
                <TableCell align="center">
                  <Box>
                   
                    <IconButton
                      color="error"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this expense?')) {
                          handleDelete(expense._id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No expenses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExpenseList; 