import React from 'react';
import api from '../lib/api';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import DiffsTable from './DiffsTable';

const fetchData = async () => {
  const result = await api.getUsersDiff();
  return result
};

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Typography>Your app should show up here.</Typography>
        <DiffsTable></DiffsTable>
      </Box>
    </Container>
  );
};

export default App;
