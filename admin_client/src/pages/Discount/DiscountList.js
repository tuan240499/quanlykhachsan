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
import OptionMenu from "./DiscountOptionMenu";
import Filter from "./DiscountFilter";
import NoRecord from "../../components/NoRecord";
// logic lib
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// logic custom
import { getAllDiscount } from "../../redux/actions/discount";
import { useSnackbar } from "notistack";
import { formatDateWithHour } from "../../utils/date";
import { formatNumber } from "../../utils/number";
import { INTEGER } from "../../constants";
//#region CSS
//#endregion

//----------------------------

const TYPES = ["Trừ tiền", "Phần trăm"];

const columns = [
  { id: "code", label: "Mã khuyến mãi", minWidth: 150 },
  { id: "title", label: "Tiêu đề", minWidth: 150 },
  { id: "type", label: "Loại", minWidth: 150 },
  { id: "value", label: "Giá trị", minWidth: 150 },
  { id: "quantity", label: "Số lượng", minWidth: 100 },
  { id: "pricing_condition", label: "Đơn hàng tối thiểu", minWidth: 170 },
  { id: "effective_from", label: "Thời gian bắt đầu", minWidth: 200 },
  { id: "effective_to", label: "Thời gian kết thúc", minWidth: 200 },
];

function createData(
  id,
  code,
  title,
  pre_type,
  pre_value,
  pre_quantity,
  pre_pricing_condition,
  pre_effective_from,
  pre_effective_to
) {
  const type = TYPES[pre_type];
  const value =
    pre_type === INTEGER.AMOUNT_DISCOUNT
      ? formatNumber(pre_value)
      : pre_value + "%";
  const quantity = formatNumber(pre_quantity);
  const pricing_condition = formatNumber(pre_pricing_condition);
  const effective_from = formatDateWithHour(pre_effective_from);
  const effective_to = formatDateWithHour(pre_effective_to);

  return {
    id,
    code,
    title,
    type,
    value,
    quantity,
    pricing_condition,
    effective_from,
    effective_to,
  };
}

const DiscountList = ({
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
  const [filterCode, setFilterCode] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterType, setFilterType] = useState(-1);
  // END FILTER STATES

  const discountList = useSelector((state) => {
    if (filterCode === "" && filterTitle === "" && filterType === -1)
      return state.discount;

    let codeLowerCase = "",
      titleLowerCase = "",
      searchingCodeLowerCase = "",
      searchingTitleLowerCase = "";
    return state.discount.filter((item) => {
      codeLowerCase = item.code.toLowerCase();
      titleLowerCase = item.title.toLowerCase();
      searchingCodeLowerCase = filterCode.toLowerCase();
      searchingTitleLowerCase = filterTitle.toLowerCase();
      return (
        codeLowerCase.indexOf(searchingCodeLowerCase) > -1 &&
        titleLowerCase.indexOf(searchingTitleLowerCase) > -1 &&
        (filterType === -1 || filterType === Number(item.type))
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
      getAllDiscount(
        () => {
          if (isMounted) setLoading(false);
        },
        (needLogin, message) => {
          if (isMounted) {
            enqueueSnackbar(message, { variant: "error" });
            setLoading(false);
            if (needLogin)
              navigate("/login", {
                state: { returnUrl: "/discount" },
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
    discountList.length > 0
      ? discountList.map((discount) =>
          createData(
            discount._id,
            discount.code,
            discount.title,
            discount.type,
            discount.value,
            discount.quantity,
            discount.pricing_condition,
            discount.effective_from,
            discount.effective_to
          )
        )
      : [];

  return (
    <>
      <Filter
        filterCode={filterCode}
        setFilterCode={setFilterCode}
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        filterType={filterType}
        setFilterType={setFilterType}
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
            ) : discountList.length > 0 ? (
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
    </>
  );
};

export default DiscountList;
