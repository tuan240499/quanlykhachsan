import { useState, useEffect } from "react";
// UI lib
import {
  Box,
  Chip,
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
import OptionMenu from "./BookingOptionMenu";
import NoRecord from "../../components/NoRecord";
import Filter from "./BookingFilter";
import DetailDialog from "./DetailDialog";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllBooking } from "../../redux/actions/booking";
import { formatDate } from "../../utils/date";
import { formatNumber } from "../../utils/number";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "number", label: "Mã đặt phòng", minWidth: 150 },
  { id: "user", label: "Khách hàng", minWidth: 150 },
  { id: "phone", label: "Số điện thoại", minWidth: 150 },
  { id: "hotel", label: "Khách sạn", minWidth: 150 },
  { id: "amount", label: "Tổng tiền (VNĐ)", minWidth: 150 },
  { id: "effective_from", label: "Nhận phòng", minWidth: 130 },
  { id: "effective_to", label: "Trả phòng", minWidth: 120 },
  { id: "status", label: "Trạng thái", minWidth: 120 },
];

const STATUS_TAG = [
  "",
  <Chip label="Đã hủy" color="error" variant="outlined" />,
  <Chip label="Sắp tới" color="warning" variant="outlined" />,
  <Chip label="Đã nhận phòng" color="success" variant="outlined" />,
  <Chip label="Hoàn tất" color="success" variant="outlined" />,
];

function createData(
  id,
  number,
  hotel,
  user,
  phone,
  preAmount,
  pre_effective_from,
  pre_effective_to,
  preStatus
) {
  const status = STATUS_TAG[preStatus];
  const amount = formatNumber(preAmount);
  const effective_from = formatDate(pre_effective_from);
  const effective_to = formatDate(pre_effective_to);
  return {
    id,
    number,
    hotel,
    user,
    phone,
    amount,
    effective_from,
    effective_to,
    status,
    preStatus,
  };
}

const BookingList = ({
  editedId,
  setEditedId,
  setDialogContent,
  setOpenBookingDialog,
}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  // FILTER STATES
  const [filterBookingCode, setFilterBookingCode] = useState("");
  const [filterBookingStatus, setFilterBookingStatus] = useState(0);
  const [filterHotel, setFilterHotel] = useState({ name: "", _id: "" });
  // END FILTER STATES

  const bookingList = useSelector((state) => {
    if (
      filterBookingCode === "" &&
      filterBookingStatus === 0 &&
      (filterHotel === null || filterHotel.name === "")
    )
      return state.booking;

    return state.booking.filter(
      (item) =>
        (filterBookingCode === "" ||
          item.number === Number(filterBookingCode)) &&
        (filterHotel === null ||
          filterHotel.name === "" ||
          filterHotel._id === item.hotel._id) &&
        (filterBookingStatus === 0 || item.status === filterBookingStatus)
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
      getAllBooking(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/booking" },
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
    bookingList.length > 0
      ? bookingList.map((booking) =>
          createData(
            booking._id,
            "#" + booking.number,
            booking.hotel.name,
            booking.user.full_name,
            booking.user.phone,
            booking.amount,
            booking.effective_from,
            booking.effective_to,
            booking.status
          )
        )
      : [];

  return (
    <>
      <Filter
        filterBookingCode={filterBookingCode}
        setFilterBookingCode={setFilterBookingCode}
        filterBookingStatus={filterBookingStatus}
        setFilterBookingStatus={setFilterBookingStatus}
        filterHotel={filterHotel}
        setFilterHotel={setFilterHotel}
      />
      <Box boxShadow={3} style={{ borderRadius: 8, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ minWidth: 1000 }}
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
            ) : bookingList.length > 0 ? (
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
                        <TableCell align="right">
                          <OptionMenu
                            status={row.preStatus}
                            setEditedId={setEditedId}
                            id={row.id}
                            setDialogContent={setDialogContent}
                            setOpenBookingDialog={setOpenBookingDialog}
                            setOpenDetailDialog={setOpenDetailDialog}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <NoRecord col={9} />
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
      <DetailDialog
        open={openDetailDialog}
        setOpen={setOpenDetailDialog}
        id={editedId}
      />
    </>
  );
};

export default BookingList;
