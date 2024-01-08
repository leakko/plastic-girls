'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div style={{
      height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
    >
      <CircularProgress />
    </div>
  );
}
