import {
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Gender = ({ namePrefix }) => {
  return (
    <Controller
      name={`${namePrefix}.gender`}
      render={({ field }) => (
        <Grid container spacing={1} alignItems={"center"}>
          <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography sx={{ minWidth: 60 }}>Gender</Typography>
          </Grid>
          <Grid item size={{ xs: 12, sm: 8, md: 9 }}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                {...field}
                sx={{ flexWrap: { xs: "wrap", sm: "nowrap" } }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default Gender;
