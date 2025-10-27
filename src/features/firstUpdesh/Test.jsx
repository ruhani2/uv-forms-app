import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const Test = () => {
  const [search, setSearch] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Heading */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Test Form Card
      </Typography>

      {/* Card with Input Fields */}
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Name"
                name="name"
                value={fields.name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Phone"
                name="phone"
                value={fields.phone}
                onChange={handleChange}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Test;
