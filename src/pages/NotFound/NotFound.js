import React from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';

function NotFound() {

  return (
    <Container className='not_found'>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item>
          <Button>
            <Link to="/" className='go_back'>Go to "Seach On Mars"</Link>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
