import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

const NoRecord = ({ col }) => {
  return (
    <TableBody>
      <TableRow role="checkbox" tabIndex={-1}>
        <TableCell align="center" colSpan={col} sx={{ py: 3 }}>
          <Typography variant="h6">KHÔNG CÓ BẢN GHI</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NoRecord;
