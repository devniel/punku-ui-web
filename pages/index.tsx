import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { push } from 'connected-next-router';
import { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DEFAULT_PAGE_SEARCH_RESULTS,
  DEFAULT_PAGE_START,
} from '../constants';
import Link from 'next/link'
import StyledLink from '../components/StyledLink';
import StyledInlineLink from '../components/StyledInlineLink';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function Index() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();

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
        <Typography fontWeight={500} variant="h1">
          punku
        </Typography>
        <Link href="/auth/signup" passHref>
          <Button variant="contained">
            join
          </Button>
        </Link>
        <Typography variant="body2" mt={2}>
          Or if you are already registered, then <Link href="/auth/signin" passHref><StyledInlineLink>sign in</StyledInlineLink></Link>.
        </Typography>
      </Box>
    </Container>
  );
}

export default Index;
