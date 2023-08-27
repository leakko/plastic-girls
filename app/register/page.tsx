'use client';

import { RegisterFormValues } from '@/models/interfaces/register-form-values';
import { Box, Button, Container, TextField, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';


export default function Register() {
	const form = useForm<RegisterFormValues>({
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = useCallback((data: RegisterFormValues) => {
		console.log(data);
	}, [])

	return (
		<Container maxWidth="sm">
			<Box m={3}>
				<Typography variant="h2" align="center">Register</Typography>
				<form action="/api/ok" onSubmit={handleSubmit(onSubmit)} noValidate>
					<Stack spacing={2}>
						<TextField
							id="email"
							label="Email"
							variant="standard"
							type='email' {...register('email', {
								required: 'Email is required'
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<TextField
							id="password"
							label="Password"
							variant="standard"
							type='password' {...register('password', {
								required: 'Password is required'
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
						<Button type="submit" variant="contained">Register</Button>
					</Stack>
				</form>
			</Box>
		</Container>
	)
}