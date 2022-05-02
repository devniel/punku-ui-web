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
import { signIn } from '../../redux/authSlice';
import { useAppSelector } from '../../redux/hooks';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Signin() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const errors = useAppSelector(state => state.auth?.errors);

  /** When changing query text */
  const handleChangeUsernameOrEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameOrEmail(e.target.value);
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
          placeholder='username or email'
          id="usernameOrEmail"
          sx={{
            ".MuiInputBase-root": {
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px"
            }
          }}
          value={usernameOrEmail}
          onChange={handleChangeUsernameOrEmail}
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
        {errors?.length > 0 && <Alert icon={false} variant="filled" severity="error" sx={{ width: '100%', mt: 2}}>
          This is an error alert — check it out!
        </Alert>}
        <Button fullWidth variant="contained" sx={{
          my: 2
        }} onClick={async () => {
          await dispatch(signIn({ usernameOrEmail, password }));
          await dispatch(push('/'));
        }}
        >
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
