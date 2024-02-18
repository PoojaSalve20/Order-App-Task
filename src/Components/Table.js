import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Data from "./Data.json";

const rows = Data;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "SHPIIFY",
    numeric: true,
    disablePadding: false,
    label: "SHPIIFY",
  },
  {
    id: "DATE",
    numeric: true,
    disablePadding: false,
    label: "DATE",
  },
  {
    id: "STATUS",
    numeric: true,
    disablePadding: false,
    label: "STATUS",
  },
  {
    id: "CUSTOMER",
    numeric: true,
    disablePadding: false,
    label: "CUSTOMER",
  },
  {
    id: "EMAIL",
    numeric: false,
    disablePadding: false,
    label: "EMAIL",
  },
  {
    id: "COUNTRY",
    numeric: true,
    disablePadding: false,
    label: "COUNTRY",
  },
  {
    id: "SHIPPING",
    numeric: true,
    disablePadding: false,
    label: "SHIPPING",
  },
  {
    id: "SOURCE",
    numeric: true,
    disablePadding: false,
    label: "SOURCE",
  },
  {
    id: "ORDERTYPE",
    numeric: true,
    disablePadding: false,
    label: "ORDER TYPE",
  },
  {
    id: "EDIT",
    numeric: false,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            backgroundColor: "aliceblue", // Change to your desired background color
          }}
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: "aliceblue", // Change to your desired background color
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, count, page, onChangePage } = props;
  const [personName, setPersonName] = React.useState("");
  const [selectedLabel, setSelectedLabel] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLabel(value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // Handle filter logic here
  };

  return (
    <Toolbar
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { xs: "stretch", sm: "center" },
      justifyContent: "space-between",
      pl: { xs: 1, sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}
  >
    <Typography variant="h5" id="tableTitle" component="div" sx={{ mb: { xs: 1, sm: 0 } }}>
      Product Summary
    </Typography>
  
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
      <Typography variant="subtitle1" component="div">
        Show
      </Typography>
      <Select
        sx={{ minWidth: 120, maxWidth: "100%" }}
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>All Columns</em>;
          }
  
          return selected.join(", ");
        }}
      >
        {headCells.map((headCell) => (
          <MenuItem key={headCell.id} value={headCell.id}>
            {headCell.label}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" size="large">
        DISPATCH SELECTED
      </Button>
      <Pagination
        count={count}
        page={page}
        onChange={onChangePage}
        size="large"
        shape="rounded"
      />
    </Stack>
  </Toolbar>
  
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({ rowss }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectSource,setSelectSource] = React.useState("")
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.ID);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ID) => {
    const selectedIndex = selected.indexOf(ID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (ID) => selected.indexOf(ID) !== -1;

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase()) &&
        (selectedStatus === "" || row.STATUS === selectedStatus )
    )
  );
  const filteredRows1 = rows.filter((row) =>
  Object.values(row).some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(searchInput.toLowerCase()) &&
      (selectSource === "" || row.SOURCE === selectSource)
  )
);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page >=0  ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    const visibleRows = React.useMemo(
      () =>
        stableSort(filteredRows||filteredRows1, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        ),
      [order, orderBy, page, rowsPerPage, filteredRows,filteredRows1]
    );

  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setSelectedStatus(value);
  };
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSource(value);
  };
   
  return (
    <>
      <div className="card shadow bg-body-tertiary">
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <div className="input-styling1">
              <InputLabel className="label" htmlFor="input-with-icon-adornment">
                What are you looking for?
              </InputLabel>
              <OutlinedInput
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                placeholder="Search for category name, Company, etc"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div className="input-styling">
              <InputLabel
                className="label"
                id="outlined-select-currency"
                htmlFor="outlined-select-currency"
              >
                Category
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={personName}
                  onChange={handleChange1}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>All</em>;
                    }

                    return selected.join(", ");
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem  value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem   value="Standard">
                    <em>Standard</em>
                  </MenuItem>
                  <MenuItem   value="Express">
                    <em>Express</em>
                  </MenuItem>
                  
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div className="input-styling">
              <InputLabel
                className="label"
                id="outlined-select-currency"
                htmlFor="outlined-select-currency"
              >
                Status
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>All</em>;
                    }

                    return selected.join(", ");
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item md={1} xs={6} sx={{ marginTop: "29px" }}>
            <Button variant="outlined" className="filter">
              <FilterListIcon />
            </Button>
          </Grid>
          <Grid item md={1} xs={6} sx={{ marginTop: "29px" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                // Trigger filter on click
                setSelected([]);
                setPage(0);
              }}
            >
              SEARCH
            </Button>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ width: "100%", marginTop: "3%" }}>
        <Paper
          sx={{ width: "100%", mb: 2 }}
          className="shadow p-3 mb-5 bg-body-tertiary rounded"
        >
          <EnhancedTableToolbar
  numSelected={selected.length}
  count={Math.ceil(filteredRows.length / rowsPerPage)}
  page={page}
  onChangePage={handleChangePage}
/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
            <EnhancedTableHead
  numSelected={selected.length}
  order={order}
  orderBy={orderBy}
  onSelectAllClick={handleSelectAllClick}
  onRequestSort={handleRequestSort}
  rowCount={visibleRows.length}
/>
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.ID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.ID)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ID}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.ID}
                      </TableCell>
                      <TableCell align="right">{row.SHPIIFY}</TableCell>
                      <TableCell align="right">{row.DATE}</TableCell>
                      <TableCell align="right">{row.STATUS}</TableCell>
                      <TableCell align="right">{row.CUSTOMER}</TableCell>
                      <TableCell align="right">{row.EMAIL}</TableCell>
                      <TableCell align="right">{row.COUNTRY}</TableCell>
                      <TableCell align="right">{row.SHIPPING}</TableCell>
                      <TableCell align="right">{row.SOURCE}</TableCell>
                      <TableCell align="right">{row.ORDERTYPE}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
        </Paper>
      </Box>
    </>
  );
}
