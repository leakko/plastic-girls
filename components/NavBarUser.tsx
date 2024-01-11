import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import Link from 'next/link';

export interface Props {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  userData: { email: string, id: string };
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
}

export default function NavBarUser(
  { status, userData, handleOpenUserMenu }: Props,
): React.ReactNode {
  if (status === 'authenticated') {
    return (
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userData.email} src="img/user-icon-black.webp" />
        </IconButton>
      </Tooltip>
    );
  } if (status === 'loading') {
    return (
      <Button variant="contained" color="primary" disabled>Login</Button>
    );
  }
  return (
    <Link href="/login">
      <Button variant="contained" color="primary">Login</Button>
    </Link>
  );
}
