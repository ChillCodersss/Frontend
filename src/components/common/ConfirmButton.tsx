import React from 'react';
import { Button } from '@mui/material';

function ConfirmButton ()  {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: '10px',
        color: 'white',
        backgroundColor: '#0A155C',
        minWidth: '150px',
        fontSize: '10px',
        padding: 0,
        height: '20px',
        '@media (min-width: 500px)': {
          minWidth: '319px',
          fontSize: '22px',
          height: '40px',
        },
        '&:hover': {
          backgroundColor: '#0A155C', // Darker shade for hover
        },
        '&:active': {
          backgroundColor: '#070F3D', // Even darker shade for active state
        },
      }}
    >
      ورود
    </Button>
  );
};

export default ConfirmButton;