import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { push } from 'connected-next-router';
import Link from 'next/link';
import { createContext, useContext, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import StyledLink from '../../components/StyledLink';
import {
  DEFAULT_PAGE_SEARCH_RESULTS,
  DEFAULT_PAGE_START,
} from '../../constants';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Signin() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  /** When changing query text */
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography fontWeight={500} variant="h1" mb={3}>
          punku
        </Typography>
        <TextField
          inputProps={{
            'data-lpignore': 'true'
          }}
          autoComplete='username'
          fullWidth
          placeholder='username'
          id="username"
          sx={{
            ".MuiInputBase-root": {
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px"
            }
          }}
          value={username}
          onChange={handleChangeUsername}
        />
        <TextField
          inputProps={{
            'data-lpignore': 'true'
          }}
          placeholder='password'
          autoComplete='new-password'
          fullWidth
          type="password"
          id="password"
          sx={{
            ".MuiInputBase-root": {
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px"
            }
          }}
          value={password}
          onChange={handleChangePassword}
        />
        <Alert icon={false} variant="filled" severity="error" sx={{ width: '100%', mt: 2}}>
          This is an error alert — check it out!
        </Alert>
        <Button fullWidth variant="contained" sx={{
          my: 2
        }}>
          Sign in
        </Button>
        <Typography variant="body2">
          <Link href="/auth/signup" passHref><StyledLink>Create an account</StyledLink></Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Signin;
