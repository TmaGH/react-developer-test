import React from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import DiffsTable from './DiffsTable';
import { Card, Typography } from '@material-ui/core';

const fetchUsersDiff = async () => {
  const result = await api.getUsersDiff()
  return result
};

const fetchProjectsDiff = async () => {
  const result = await api.getProjectsDiff()
  return result
};

export const App = () => {
  return (
    <Container>
      <Box fixed>
        <Box>
          <Typography variant="h5" gutterBottom>Users</Typography>
          <Card>
            <DiffsTable fetch={fetchUsersDiff}></DiffsTable>
          </Card>
        </Box>
        <Box mt={2}>
          <Typography variant="h5" gutterBottom>Projects</Typography>
          <Card>
            <DiffsTable fetch={fetchProjectsDiff}></DiffsTable>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default App;
