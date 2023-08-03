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
import OptionMenu from "./RoomTypeOptionMenu";
import Filter from "./RoomTypeFilter";
import NoRecord from "../../components/NoRecord";
// logic lib
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllRoomType } from "../../redux/actions/room_type";
import { formatNumber } from "../../utils/number";

//#region CSS

//#endregion
//----------------------------
const columns = [
  { id: "name", label: "Loại phòng", minWidth: 250 },
  { id: "hotel", label: "Khách sạn", minWidth: 200 },
  { id: "size", label: "Diện tích (m\u00b2)", minWidth: 150 },
  { id: "rent_bill", label: "Giá thuê / đêm (VNĐ)", minWidth: 200 },
  { id: "bed", label: "Giường", minWidth: 150 },
  { id: "people", label: "Số người", minWidth: 150 },
];

function createData(id, name, hotel, size, rent_bill, bed, people) {
  return { id, name, hotel, size, rent_bill, bed, people };
}

const RoomTypeList = ({
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
  const [filterHotel, setFilterHotel] = useState({ name: "", _id: "" });
  // END FILTER STATES

  const roomTypeList = useSelector((state) => {
    if (filterName === "" && (filterHotel === null || filterHotel.name === ""))
      return state.room_type;
    let itemLowerCase = "",
      searchingItemLowerCase = "";
    return state.room_type.filter((item) => {
      itemLowerCase = item.name.toLowerCase();
      searchingItemLowerCase = filterName.toLowerCase();
      return (
        itemLowerCase.indexOf(searchingItemLowerCase) > -1 &&
        (filterHotel === null ||
          filterHotel.name === "" ||
          filterHotel._id === item.hotel._id)
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
      getAllRoomType(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/room/type" },
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
    roomTypeList.length > 0
      ? roomTypeList.map((roomType) =>
          createData(
            roomType._id,
            roomType.name,
            roomType.hotel.name,
            formatNumber(roomType.size),
            formatNumber(roomType.rent_bill),
            roomType.bed_number + " vừa - " + roomType.big_bed_number + " to",
            roomType.adult + " Người lớn - " + roomType.kid + " Trẻ em"
          )
        )
      : [];

  return (
    <>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        filterHotel={filterHotel}
        setFilterHotel={setFilterHotel}
      />
      <Box boxShadow={3} style={{ borderRadius: 8, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            style={{ minWidth: 1200 }}
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
            ) : roomTypeList.length > 0 ? (
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
              <NoRecord col={7} />
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

export default RoomTypeList;
