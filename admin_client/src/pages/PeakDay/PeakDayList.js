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
import OptionMenu from "./PeakDayOptionMenu";
import Filter from "./PeakDayFilter";
import NoRecord from "../../components/NoRecord";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllPeakDay } from "../../redux/actions/peak_day";
import { formatDate } from "../../utils/date";

//#region CSS

//#endregion

//----------------------------

const columns = [
  { id: "name", label: "Tên ngày cao điểm", minWidth: 150 },
  { id: "start_date", label: "Ngày bắt đầu", minWidth: 150 },
  { id: "end_date", label: "Ngày kết thúc", minWidth: 150 },
];

function createData(id, name, pre_start_date, pre_end_date) {
  const start_date = formatDate(pre_start_date);
  const end_date = formatDate(pre_end_date);
  return { id, name, start_date, end_date };
}

const PeakDayList = ({
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
  const [filterName, setFilterName] = useState("");
  // END FILTER STATES

  const peakDayList = useSelector((state) => {
    if (filterName === "") return state.peak_day;
    let itemLowerCase = "",
      searchingItemLowerCase = "";
    return state.peak_day.filter((item) => {
      itemLowerCase = item.name.toLowerCase();
      searchingItemLowerCase = filterName.toLowerCase();
      return itemLowerCase.indexOf(searchingItemLowerCase) > -1;
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
      getAllPeakDay(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });

            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/peak-day" },
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
    peakDayList.length > 0
      ? peakDayList.map((peakDay) =>
          createData(
            peakDay._id,
            peakDay.name,
            peakDay.start_date,
            peakDay.end_date
          )
        )
      : [];

  return (
    <>
      <Filter filterName={filterName} setFilterName={setFilterName} />
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
            ) : peakDayList.length > 0 ? (
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
              <NoRecord col={4} />
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

export default PeakDayList;
