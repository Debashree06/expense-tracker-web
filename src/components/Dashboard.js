import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Chip,
  Divider,
} from '@mui/material';

import { useExpenses } from '../context/ExpenseContext';

const Dashboard = () => {
  const { expenses } = useExpenses();
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({
    total: 0,
    byCategory: {},
    recentExpenses: [],
  });

  useEffect(() => {
    calculateSummary();
  }, [expenses]);

  const calculateSummary = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const byCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    const recentExpenses = [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setSummary({ total, byCategory, recentExpenses });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight={700}>
        Dashboard
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {/* Total Expenses */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1976d2', color: '#fff', boxShadow: 3, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Total Expenses
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {formatAmount(summary.total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Expenses by Category */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Expenses by Category
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(summary.byCategory).map(([category, amount]) => (
                  <Grid item xs={12} sm={4} md={4} key={category}>
                    <Box sx={{ textAlign: 'center', mb: 1 }}>
                      <Chip
                        label={category}
                        color="primary"
                        sx={{ mb: 1, fontWeight: 500 }}
                      />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {formatAmount(amount)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
                {Object.keys(summary.byCategory).length === 0 && (
                  <Grid item xs={12}>
                    <Typography color="text.secondary">No category data</Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Expenses */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Expenses
              </Typography>
              <Divider sx={{ mb: 1 }} />
              {summary.recentExpenses.length === 0 && (
                <Typography color="text.secondary">No recent expenses</Typography>
              )}
              {summary.recentExpenses.map((expense, idx) => (
                <Box
                  key={expense._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom:
                      idx !== summary.recentExpenses.length - 1
                        ? '1px solid #eee'
                        : 'none',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {expense.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(expense.date).toLocaleDateString()} - {expense.category}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" color="primary" fontWeight={600}>
                    {formatAmount(expense.amount)}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 