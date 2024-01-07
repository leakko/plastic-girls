import React from 'react';
import { Box, Typography } from '@mui/material';
import GirlsCloud from '@/components/girls-cloud';

export default function Home() {
  return (
    <main>
      <Typography variant='h2' align='center' marginY={5}>The place for <Typography variant='h2' color={'primary'} component={'span'}>plastic girls</Typography> lovers</Typography>
      <GirlsCloud />
    </main>
  );
}
