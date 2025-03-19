import { Box, styled } from '@mui/material';

const DarkBlueTrapezoid = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(1, 71, 128, 1)', // Blue color
  clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)', // Trapezoid shape
  zIndex: 1, // Ensure it's above the white background
}));

const BlueTrapezoid = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '50%', // Cover 50% of the footer height
  backgroundColor: ' #057ABE', // Yellow color
  clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)', // Trapezoid shape
  zIndex: 2, // Ensure it's above the blue trapezoid
}));

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '100px', sm: '150px', md: '300px' }, // Responsive height
        backgroundColor: 'white', // White background
        overflow: 'hidden', // Ensure nothing overflows
      }}
    >
      <DarkBlueTrapezoid
        sx={{
          clipPath: {
            xs: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)', // Adjust for mobile
            sm: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)', // Adjust for tablet
            md: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)', // Adjust for desktop
          },
        }}
      />
      <BlueTrapezoid
        sx={{
          height: { xs: '50%', sm: '50%', md: '50%' }, // Responsive height
          clipPath: {
            xs: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)', // Adjust for mobile
            sm: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)', // Adjust for tablet
            md: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)', // Adjust for desktop
          },
        }}
      />
    </Box>
  );
};

export default Footer;