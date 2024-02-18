import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
} from "@mui/material";
import React from "react";

const SearchBar = ({setSearchQuery}) => {
  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  
  return (
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
                <MenuItem disabled value="">
                  <em>All</em>
                </MenuItem>
                {/* {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))} */}
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
              Category
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
                <MenuItem disabled value="">
                  <em>All</em>
                </MenuItem>
                {/* {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))} */}
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
          <Button variant="contained" color="primary" size="large">
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBar;
