import { TableBody, TableBodyProps, TableCell, TableCellProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)<TableCellProps>(({ theme }) => ({
  textTransform: 'initial',
  color: theme.palette.common.black,
}));

export const StyledTableBody = styled(TableBody)<TableBodyProps>(({ theme }) => ({
  textTransform: 'initial',
  '& .MuiTableCell-body': {
    color: theme.palette.grey[800],
  },
}));
