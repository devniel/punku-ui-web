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
import { useDispatch, useSelector } from 'react-redux';
import StyledInlineLink from '../../components/StyledInlineLink';
import {
  DEFAULT_PAGE_SEARCH_RESULTS,
  DEFAULT_PAGE_START,
} from '../../constants';
import { signUp } from '../../redux/actions';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Signup() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const errors = useSelector((state) => state.auth?.errors);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();

  /** When changing query text */
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
      <form>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography fontWeight={500} variant="h1" mb={3}>
            punku
          </Typography>
          <TextField
            inputProps={{
              'data-lpignore': 'true'
            }}
            autoComplete='email'
            fullWidth
            placeholder='email'
            name="email"
            id="email"
            sx={{
              ".MuiInputBase-root": {
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px"
              }
            }}
            value={email}
            onChange={handleChangeEmail}
          />
          <TextField
            inputProps={{
              'data-lpignore': 'true'
            }}
            autoComplete='username'
            fullWidth
            placeholder='username'
            id="username"
            name="username"
            sx={{
              ".MuiInputBase-root": {
                borderRadius: "0px"
              }
            }}
            value={username}
            onChange={handleChangeUsername}
          />
          <TextField
            inputProps={{
              'data-lpignore': 'true'
            }}
            autoComplete='new-password'
            placeholder='password'
            fullWidth
            type="password"
            id="(sadfds)"
            name="password"
            sx={{
              ".MuiInputBase-root": {
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px"
              }
            }}
            value={password}
            onChange={handleChangePassword}
          />

          {errors &&
          <Alert icon={false} variant="filled" severity="error" sx={{ width: '100%', mt: 2}}>
            This is an error alert — check it out!
          </Alert>}

          <Button
            fullWidth
            variant="contained"
            onClick={() => dispatch(signUp({ username, password, email }))}
            sx={{
              my: 2
            }}>
            Sign up
          </Button>
          <Typography variant="body2">
            Have an account? <Link href='/auth/signin' passHref><StyledInlineLink>Sign in</StyledInlineLink></Link>.
          </Typography>
        </Box>
      </form>
    </Container>
  );
}

export default Signup;
