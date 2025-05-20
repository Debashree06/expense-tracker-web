import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/expenses"
            startIcon={<ListIcon />}
          >
            Expenses
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/add"
            startIcon={<AddIcon />}
          >
            Add Expense
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 