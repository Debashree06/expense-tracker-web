import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { ExpenseProvider } from './context/ExpenseContext';


import Navbar from './components/Navbar';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExpenseProvider>
        <Router>
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/add" element={<AddExpense />} />
            </Routes>
          </Container>
        </Router>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
