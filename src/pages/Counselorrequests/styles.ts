import { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    direction: 'rtl',
    padding: 1,
    maxWidth: 1200,
    margin: 'auto',
    overflowX: 'auto',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    py: 4,
  },
  tabs: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: 1.8,
    '& .MuiTab-root': {
      fontSize: (theme) => (theme.breakpoints.down('sm') ? '0.75rem' : '0.875rem'),
      color: '#057abe',
      '&.Mui-selected': { color: '#057abe', fontWeight: 'bold' },
    },
    '& .MuiTabs-indicator': { backgroundColor: '#057abe' },
  },
  filterSection: {
    display: 'flex',
    flexDirection: (theme) => (theme.breakpoints.down('sm') ? 'column' : 'row'),
    gap: (theme) => (theme.breakpoints.down('sm') ? 2 : 8),
    mb: 3,
    justifyContent: 'center',
  },
  toggleButtonGroup: {
    gap: '6px',
    flexWrap: (theme) => (theme.breakpoints.down('sm') ? 'wrap' : 'nowrap'),
    justifyContent: 'center',
    '& .MuiToggleButton-root': {
      border: '1px solid #057abe',
      color: '#057abe',
      borderRadius: '8px',
      padding: (theme) => (theme.breakpoints.down('sm') ? '6px 8px' : '8px 16px'),
      fontSize: (theme) => (theme.breakpoints.down('sm') ? '0.75rem' : '0.875rem'),
      '&.Mui-selected': { backgroundColor: '#057abe', color: 'white' },
      '&:hover': { backgroundColor: 'rgb(177, 188, 205)' },
    },
  },
  tableContainer: {
    boxShadow: 3,
    maxHeight: (theme) => (theme.breakpoints.down('sm') ? '60vh' : '70vh'),
    overflowY: 'auto',
    marginTop: (theme) => (theme.breakpoints.down('sm') ? '20px' : '50px'),
    minWidth: (theme) => (theme.breakpoints.down('sm') ? '100%' : 'auto'),
  },
  tableHead: {
    backgroundColor: 'grey.100',
    textAlign: 'right',
  },
  tableRow: {
    '&:hover': { bgcolor: 'grey.50' },
  },
  tableCell: {
    padding: (theme) => (theme.breakpoints.down('sm') ? '4px' : '8px'),
    textAlign: 'center',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    mt: 2,
    '& .MuiPaginationItem-root': {
      color: '#057abe',
      '&.Mui-selected': { backgroundColor: '#057abe', color: 'white' },
      '&.MuiPaginationItem-previousNext': { transform: 'rotate(180deg)' },
    },
  },
//   aboutMeDialog: {
//     dir: 'rtl',
//     maxWidth: 'sm',
//     fullWidth: true,
//   },
//   confirmDialog: {
//     dir: 'rtl',
//     maxWidth: 'xs',
//     fullWidth: true,
//   },
};