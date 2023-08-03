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
import OptionMenu from "./UserOptionMenu";
import NoRecord from "../../components/NoRecord";
import Filter from "./UserFilter";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllAccount } from "../../redux/actions/account";
import { INTEGER } from "../../constants";
import { formatUserPhoneNumber } from "../../utils/number";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "username", label: "Tài khoản", minWidth: 120 },
  { id: "name", label: "Họ và tên", minWidth: 150 },
  { id: "phone", label: "Số điện thoại", minWidth: 150 },
  { id: "role", label: "Vai trò", minWidth: 150 },
  { id: "status", label: "Trạng thái", minWidth: 120 },
];

function createData(id, username, name, pre_phone, pre_role, banned) {
  const status = banned ? (
    <Chip label="Đã khóa" color="error" variant="outlined" />
  ) : (
    <Chip label="Hoạt động" color="success" variant="outlined" />
  );
  const role =
    (pre_role === INTEGER.CUSTOMER_ROLE && "Khách hàng") ||
    (pre_role === INTEGER.EMPLOYEE_ROLE && "Nhân viên") ||
    (pre_role === INTEGER.ADMIN_ROLE && "Quản trị viên");
  const phone = formatUserPhoneNumber(pre_phone);
  return { id, username, name, phone, role, status, banned, pre_role };
}

const UserList = ({ setEditedId, setOpenDialog, setTypeDialog }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // FILTER STATES
  const [filterName, setFilterName] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterRole, setFilterRole] = useState(0);
  const [filterStatus, setFilterStatus] = useState(2);
  // END FILTER STATES

  const accountList = useSelector((state) => {
    if (
      filterName === "" &&
      filterPhone === "" &&
      filterRole === 0 &&
      filterStatus === 2
    )
      return state.account;
    let searchingName = "",
      itemName = "";
    return state.account.filter((item) => {
      searchingName = filterName.toLowerCase();
      itemName = item.full_name.toLowerCase();
      return (
        itemName.indexOf(searchingName) > -1 &&
        item.phone.indexOf(filterPhone) > -1 &&
        (filterRole === 0 || filterRole === item.role) &&
        (filterStatus === 2 || filterStatus === Number(item.banned))
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
      getAllAccount(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/user" },
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
    accountList.length > 0
      ? accountList.map((account) =>
          createData(
            account._id,
            account.username,
            account.full_name,
            account.phone,
            account.role,
            account.banned
          )
        )
      : [];

  return (
    <>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        filterPhone={filterPhone}
        setFilterPhone={setFilterPhone}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
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
            ) : accountList.length > 0 ? (
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
                          {row.pre_role !== INTEGER.ADMIN_ROLE && (
                            <OptionMenu
                              status={row.banned}
                              setEditedId={setEditedId}
                              id={row.id}
                              setOpenDialog={setOpenDialog}
                              setTypeDialog={setTypeDialog}
                            />
                          )}
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

export default UserList;
