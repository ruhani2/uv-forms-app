import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

function SearchBar({ onSearch, disabled }) {
  const [search, setSearch] = useState("");
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const handleSearchInput = (e) => {
    if (e.target.value.length < 17) {
      setHelperText("Please provide valid Jigyasu UID");
      setError(true);
    } else {
      setHelperText("");
    }
    setSearch(e.target.value);
  };

  return (
    <Grid container spacing={2} my={2}>
      <Grid item size={{ xs: 12, md: 4, sm: 4 }}>
        <TextField
          disabled={disabled}
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Please Enter Jigyasu UID..."
          value={search}
          onChange={handleSearchInput}
          error={error}
          helperText={helperText}
        />
      </Grid>
      <Grid item size={{ xs: 12, md: 6, sm: 6 }}>
        <Button
          variant="contained"
          onClick={() => onSearch(search)}
          disabled={disabled}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
