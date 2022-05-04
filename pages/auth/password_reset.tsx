import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { push } from 'connected-next-router';
import Link from 'next/link';
import { createContext, useContext, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import StyledLink from '../../components/StyledLink';
import {
  DEFAULT_PAGE_SEARCH_RESULTS,
  DEFAULT_PAGE_START,
} from '../../constants';
import { AuthStatus, passwordReset } from '../../redux/authSlice';
import { useAppSelector } from '../../redux/hooks';
import MailIcon from '@mui/icons-material/Mail';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Signin() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const errors = useAppSelector(state => state.auth?.errors);
  const status = useAppSelector(state => state.auth?.status);
  const message = useAppSelector(state => state.auth?.message);

  /** When changing query text */
  const handleChangeUsernameOrEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameOrEmail(e.target.value);
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
        {status === AuthStatus.SUCCESS && message &&
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <MailIcon fontSize='large' sx={{ mb: 1 }} />
            <Typography fontWeight={500} variant="h5" mb={3} align="center">
              {message}
            </Typography>
          </Box>
        }
        {status === AuthStatus.PROCESSING && <CircularProgress/>}
        {status === AuthStatus.IDLE &&
          <>
            <Typography variant="h5" sx={{
              mb: 2
            }}>
              Search you username or email
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
            {errors?.length > 0 && <Alert icon={false} variant="filled" severity="error" sx={{ width: '100%', mt: 2}}>
              This is an error alert — check it out!
            </Alert>}
            <Button fullWidth variant="contained" sx={{
              my: 2
            }} onClick={async () => {
              await dispatch(passwordReset({ usernameOrEmail }));
            }}
            >
              Request password reset
            </Button>
          </>
        }
      </Box>
    </Container>
  );
}

export default Signin;
