import React, { createContext, useContext, useState, useEffect } from 'react';
import { getExpenses } from '../services/api';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from backend on mount
    const fetchExpenses = async () => {
      try {
        const userId = 'user123';
        const data = await getExpenses(userId);
        setExpenses(data);
      } catch (err) {
        setExpenses([]);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext); 