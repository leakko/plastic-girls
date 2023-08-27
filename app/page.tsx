import React from 'react';
import styles from './page.module.css';
import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <main className={styles.main}>
        <Box bgcolor={'primary.main'}>
          <Typography variant="h1" component="h2">
            Hello world Hello world Hello world Hello world Hello world Hello world Hello world Hello world 
          </Typography>
        </Box>
    </main>
  );
}
