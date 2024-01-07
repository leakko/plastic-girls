'use client';

import { LoginFormValues } from '@/models/interfaces/register-form-values';
import {
  Box, Button, TextField, Stack, Typography, LinearProgress, Alert,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginFeedback, setLoginFeedback] = useState<string>('');
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = useCallback(async ({ email, password }: LoginFormValues) => {
    setLoginFeedback('');
    setIsLogging(true);
    const resp = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (resp?.error) {
      setIsLogging(false);
      setLoginError(true);
      setLoginFeedback(resp.error);
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <>
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
          <Button type="submit" variant="contained" disabled={isLogging}>
            { isLogging ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : 'Login' }
          </Button>
          { loginFeedback && <Alert severity={loginError ? 'error' : 'success'}>{ loginFeedback }</Alert> }
          <Typography variant="body1" align="center">
            I don&lsquo;t have an accout.
            {' '}
            <Link href="/register" style={{ color: 'steelblue' }}>Register</Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
}
