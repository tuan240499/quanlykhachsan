import { useState, useEffect } from "react";
// UI lib
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
// UI custom
import OptionMenu from "./ExpenseOptionMenu";
import NoRecord from "../../components/NoRecord";
import Filter from "./ExpenseFilter";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllExpense } from "../../redux/actions/expense";
import { formatNumber } from "../../utils/number";
import { formatDateWithHour } from "../../utils/date";

//#region CSS
//#endregion

//----------------------------
const columns = [
  { id: "number", label: "Mã hóa đơn", minWidth: 100 },
  { id: "hotel", label: "Khách sạn", minWidth: 150 },
  { id: "amount", label: "Tổng tiền (VNĐ)", minWidth: 100 },
  { id: "description", label: "Mô tả", minWidth: 200 },
  { id: "created_date", label: "Thời gian", minWidth: 200 },
];

function createData(
  id,
  number,
  hotel,
  pre_amount,
  description,
  pre_created_date
) {
  const amount = formatNumber(pre_amount);
  const created_date = formatDateWithHour(pre_created_date);
  return { id, number, hotel, amount, description, created_date };
}

const ExpenseList = ({
  setEditedId,
  setOpenEditDialog,
  setOpenDeleteDialog,
}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // FILTER STATES
  const [filterHotel, setFilterHotel] = useState({ name: "", _id: "" });
  const [filterNumber, setFilterNumber] = useState("");
  // END FILTER STATES

  const expenseList = useSelector((state) => {
    if (
      filterNumber === "" &&
      (filterHotel === null || filterHotel.name === "")
    )
      return state.expense;

    return state.expense.filter(
      (item) =>
        (filterNumber === "" || item.number === Number(filterNumber)) &&
        (filterHotel === null ||
          filterHotel.name === "" ||
          filterHotel._id === item.hotel._id)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    let isMounted = true;
    dispatch(
      getAllExpense(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });

            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/expense" },
              });
          }
        }
      )
    );
    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate]);

  const rows =
    expenseList.length > 0
      ? expenseList.map(
          (expense) =>
            expense &&
            createData(
              expense._id,
              expense.number,
              expense.hotel.name,
              expense.amount,
              expense.description,
              expense.created_date
            )
        )
      : [];

  return (
    <>
      <Filter
        filterHotel={filterHotel}
        setFilterHotel={setFilterHotel}
        filterNumber={filterNumber}
        setFilterNumber={setFilterNumber}
      />
      <Box boxShadow={3} style={{ borderRadius: 8, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ minWidth: 800 }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#D9D9D9",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key="action"
                  style={{
                    minWidth: 100,
                    backgroundColor: "#D9D9D9",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index}>
                        <Skeleton variant="text" />
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index}>
                        <Skeleton variant="text" />
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Skeleton variant="text" />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : expenseList.length > 0 ? (
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell key="action" align="right">
                          <OptionMenu
                            setOpenEditDialog={setOpenEditDialog}
                            setOpenDeleteDialog={setOpenDeleteDialog}
                            setEditedId={setEditedId}
                            id={row.id}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <NoRecord col={6} />
            )}
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Số hàng"
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default ExpenseList;
