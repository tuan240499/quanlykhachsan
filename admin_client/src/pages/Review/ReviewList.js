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
  Chip,
  Rating,
} from "@mui/material";
// UI custom
import NoRecord from "../../components/NoRecord";
import Filter from "./ReviewFilter";
import OptionMenu from "./ReviewOptionMenu";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllReview } from "../../redux/actions/review";
import { formatDateWithHour } from "../../utils/date";
import DetailDialog from "./DetailDialog";
//#region CSS
//#endregion

//----------------------------
const columns = [
  { id: "user", label: "Khách hàng", minWidth: 150 },
  { id: "phone", label: "Số điện thoại", minWidth: 150 },
  { id: "booking", label: "Mã đặt phòng", minWidth: 150 },
  { id: "title", label: "Tiêu đề", minWidth: 150 },
  { id: "overall_score", label: "Tổng quan", minWidth: 150 },
  { id: "status", label: "Trạng thái", minWidth: 150 },
  { id: "date", label: "Thời gian", minWidth: 150 },
];

const STATUS = [
  "",
  <Chip label="Chờ duyệt" color="primary" variant="outlined" />,
  <Chip label="Đã duyệt" color="success" variant="outlined" />,
  <Chip label="Từ chối" color="error" variant="outlined" />,
];

function createData(
  id,
  user,
  phone,
  booking,
  title,
  pre_overall_score,
  pre_status,
  pre_date
) {
  const status = STATUS[pre_status];
  const date = formatDateWithHour(pre_date);
  const overall_score = (
    <Rating readOnly value={pre_overall_score} name="read-only" />
  );
  return {
    id,
    user,
    phone,
    booking,
    title,
    overall_score,
    status,
    date,
    pre_status,
  };
}

const ReviewList = ({ id, setId, setOpenReviewDialog, setDialogContent }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  // FILTER STATES
  const [filterBookingCode, setFilterBookingCode] = useState("");
  const [filterReviewStatus, setFilterReviewStatus] = useState(0);
  // END FILTER STATES

  const reviewList = useSelector((state) => {
    if (filterBookingCode === "" && filterReviewStatus === 0)
      return state.review;

    return state.review.filter(
      (item) =>
        (filterBookingCode === "" ||
          item.booking.number === Number(filterBookingCode)) &&
        (filterReviewStatus === 0 || item.status === filterReviewStatus)
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
      getAllReview(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/review" },
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
    reviewList.length > 0
      ? reviewList.map((review) =>
          createData(
            review._id,
            review.user.full_name,
            review.user.phone,
            "#" + review.booking.number,
            review.title,
            review.overallScore,
            review.status,
            review.created_date
          )
        )
      : [];

  return (
    <>
      <Filter
        filterBookingCode={filterBookingCode}
        setFilterBookingCode={setFilterBookingCode}
        filterReviewStatus={filterReviewStatus}
        setFilterReviewStatus={setFilterReviewStatus}
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
            ) : reviewList.length > 0 ? (
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
                            id={row.id}
                            setId={setId}
                            setOpenReviewDialog={setOpenReviewDialog}
                            setDialogContent={setDialogContent}
                            status={row.pre_status}
                            setOpenDetailDialog={setOpenDetailDialog}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <NoRecord col={8} />
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
        id={id}
        setOpen={setOpenDetailDialog}
        open={openDetailDialog}
      />
    </>
  );
};

export default ReviewList;
