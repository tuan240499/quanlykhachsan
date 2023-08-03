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
import NoRecord from "../../components/NoRecord";
import Filter from "./LogFilter";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllLogs } from "../../redux/actions/log";
import { formatDateWithHour } from "../../utils/date";
//#region CSS
//#endregion

//----------------------------
const columns = [
  { id: "user_id", label: "Mã người dùng", minWidth: 150 },
  { id: "full_name", label: "Họ và tên", minWidth: 120 },
  { id: "role", label: "Vai trò", minWidth: 120 },
  { id: "type", label: "Hành động", minWidth: 150 },
  { id: "target", label: "Đối tượng", minWidth: 150 },
  { id: "time_stamp", label: "Thời gian", minWidth: 150 },
];

const ACTIONS = [
  "",
  "Thêm mới",
  "Cập nhật",
  "Xóa",
  "Check-in",
  "Check-out",
  "Đặt chỗ",
  "Hủy đơn",
  "Khóa",
  "Mở khóa",
  "Gửi",
  "Phê duyệt",
  "Từ chối",
  "Đặt lại",
  "Khôi phục",
];

function createData(
  id,
  user_id,
  full_name,
  pre_role,
  pre_type,
  target,
  pre_time_stamp
) {
  const time_stamp = formatDateWithHour(pre_time_stamp);
  const type = ACTIONS[pre_type];
  const role =
    pre_role === 1998
      ? "Khách hàng"
      : pre_role === 1108
      ? "Nhân viên"
      : "Quản trị viên";
  return { id, user_id, full_name, role, type, target, time_stamp };
}

const LogList = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // FILTER STATES
  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState(0);
  // END FILTER STATES

  const logList = useSelector((state) => {
    if (filterName === "" && filterRole === 0) return state.log;

    let searchingName = "",
      itemName = "";
    return state.log.filter((item) => {
      searchingName = filterName.toLowerCase();
      itemName = item.user.full_name.toLowerCase();
      return (
        itemName.indexOf(searchingName) > -1 &&
        (filterRole === 0 || filterRole === item.user.role)
      );
    });
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
      getAllLogs(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/log" },
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
    logList.length > 0
      ? logList.map((log) =>
          createData(
            log._id,
            log.user._id,
            log.user.full_name,
            log.user.role,
            log.type,
            log.target,
            log.time_stamp
          )
        )
      : [];

  return (
    <>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
      />
      <Box boxShadow={3} style={{ borderRadius: 8, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 400px)" }}>
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
                </TableRow>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  {columns.map((column, index) => {
                    return (
                      <TableCell key={index}>
                        <Skeleton variant="text" />
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            ) : logList.length > 0 ? (
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

export default LogList;
