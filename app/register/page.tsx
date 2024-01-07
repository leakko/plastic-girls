'use client';

import { RegisterFormValues } from '@/models/interfaces/register-form-values';
import {
  Box, Button, TextField, Stack, Typography, LinearProgress, Alert, Container,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function Register() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [registrationError, setRegistrationError] = useState<boolean>(false);
  const [registrationFeedback, setRegistrationFeedback] = useState<string>('');
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = useCallback(async (data: RegisterFormValues) => {
    setRegistrationFeedback('');
    setIsRegistering(true);
    const resp = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      if (res.error) {
        setRegistrationError(true);
        setRegistrationFeedback(res.error);
      } else {
        setRegistrationError(false);
        setRegistrationFeedback('Account successfully created. Go to your email to validate it.');
      }
      setIsRegistering(false);
    });
  }, []);

  return (
    <Container  maxWidth="sm">
      <Typography variant="h2" align="center">Register</Typography>
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
          <Button type="submit" variant="contained" disabled={isRegistering}>
            { isRegistering ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : 'Register' }
          </Button>
          { registrationFeedback && <Alert severity={registrationError ? 'error' : 'success'}>{ registrationFeedback }</Alert> }
          <Typography variant="body1" align="center">
            I already have an accout.
            {' '}
            <Link href="/login" style={{ color: 'steelblue' }}>Login</Link>
          </Typography>
        </Stack>
      </form>
    </Container>
  );
}
