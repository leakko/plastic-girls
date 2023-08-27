'use client';

import { LoginFormValues } from '@/models/interfaces/login-form-values';
import {
  Box, Button, Container, TextField, Stack, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = useCallback((data: LoginFormValues) => {
    console.log(data);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box m={3}>
        <Typography variant="h2" align="center">Login</Typography>
        <form action="/api/ok" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              id="email"
              label="Email"
              variant="standard"
              type="email"
              {...register('email', {
                required: 'Email is required',
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained">Login</Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
