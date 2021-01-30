import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/QuizScreen';
import Database from '../../db.json';

export default function QuizPage() {
  return (
    <ThemeProvider theme={Database.theme}>
      <QuizScreen database={Database} />
    </ThemeProvider>
  );
}
