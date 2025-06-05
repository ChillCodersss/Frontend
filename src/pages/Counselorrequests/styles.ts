import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    direction: 'rtl',
    padding: { xs: '8px', sm: '1px' }, // Reduced padding for mobile
    maxWidth: { xs: '100%', sm: 1200 }, // Full width on mobile
    margin: '0 auto',
    boxSizing: 'border-box', // Prevent padding issues
    overflowX: 'hidden', // Prevent horizontal overflow
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    py: { xs: 2, sm: 2 }, 
    minHeight: '300px', 
  },
  tabs: {
    borderBottom: 1,
    borderColor: 'divider',
    mb: { xs: 1, sm: 2 },
    '& .MuiTabs-flexContainer': {
      justifyContent: { xs: 'flex-start', sm: 'center' }, 
      overflowX: 'auto', 
    },
    '& .MuiTab-root': {
      fontSize: {xs: '0.75rem' , sm: '0.875rem'},
      padding: {xs: '12px 15px', sm: '16px 20px'},
      minWidth: { xs: 48, sm: 80 },
      color: '#057abe',
      '&.Mui-selected': { color: '#057abe', fontWeight: 'bold' },
    },
    "& .MuiTabs-indicator": { backgroundColor: "#057abe" },
  },
  filterSection: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' }, // Stack filters vertically on mobile
    gap: { xs: 0.5, sm: 5 }, // Slightly larger gap for mobile
    mb: { xs: 2, sm: 3 }, // Reduced margin for mobile
    justifyContent: { xs: 'flex-start', sm: 'center' },
    alignItems: { xs: 'flex-end', sm: 'center' }, 
    flexWrap: 'wrap',
  },
  toggleButtonGroup: {
    gap: { xs: '4px', sm: '6px' }, // Smaller gap for mobile
    flexWrap: 'wrap', // Always wrap to prevent overflow
    justifyContent: { xs: 'flex-end', sm: 'center' }, // RTL alignment
    '& .MuiToggleButton-root': {
      border: '1px solid #057abe',
      color: '#057abe',
      borderRadius: '8px',
      padding: { xs: '4px 10px', sm: '6px 12px' }, // Smaller padding for mobile
      fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font for mobile
      minWidth: { xs: 50, sm: 60 }, // Ensure touchable size
      '&.Mui-selected': { backgroundColor: '#057abe', color: 'white' },
      '&:hover': { backgroundColor: 'rgb(177, 188, 205)' },
    },
  },
  tableContainer: {
    boxShadow: 3,

    maxHeight: { xs: '65vh', sm: '70vh' }, // Slightly taller on mobile
    overflowY: 'auto',
    overflowX: 'hidden', // Prevent horizontal overflow
    margin: { xs: '8px 0', sm: '16px 0' }, // Reduced margins for mobile
    width: { xs: '100%', sm: 'auto' }, // Full width on mobile
    boxSizing: 'border-box',
  },
  tableHead: {
    backgroundColor: 'grey.100',
    textAlign: 'right',
    '& .MuiTableCell-root': {
      fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font for mobile
      padding: { xs: '6px', sm: '8px' }, // Reduced padding
    },
  },
  tableRow: {
    "&:hover": { bgcolor: "grey.50" },
  },
  tableCell: {

    padding: { xs: '6px', sm: '8px' }, // Reduced padding for mobile
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font for mobile
    minWidth: { xs: 50, sm: 80 }, // Ensure cells don't collapse too much
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    mt: { xs: 1.5, sm: 2 }, // Reduced margin for mobile
    mb: { xs: 1.5, sm: 2 },
    '& .MuiPagination-ul': {
      flexWrap: 'wrap', // Allow pagination items to wrap
    },
    '& .MuiPaginationItem-root': {
      color: '#057abe',
      fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Smaller font for mobile
      minWidth: { xs: 36, sm: 40 }, // Larger touch targets
      height: { xs: 36, sm: 40 },
      '&.Mui-selected': { backgroundColor: '#057abe', color: 'white' },
      '&.MuiPaginationItem-previousNext': { transform: 'rotate(180deg)' },
    },
  },
  studentDetailsDialog: {
    '& .MuiDialog-paper': {
      padding: { xs: 1.5, sm: 2 }, // Reduced padding for mobile
      borderRadius: 2,
      maxWidth: { xs: 320, sm: 400 }, // Smaller dialog for mobile
      width: '100%',
      margin: { xs: '8px', sm: '16px' }, // Reduced margin for mobile
    },
  },
};
