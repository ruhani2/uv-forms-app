import { Grid, Typography, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const RecommendationBranchSecretary = ({ namePrefix }) => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2} my={2}>
      {/* Period of Attendance */}
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Typography>Period of Attendance</Typography>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Controller
          name={`${namePrefix}.periodOfAttendance.years`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Years"
              size="small"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              type="number"
              inputProps={{ min: 0 }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Controller
          name={`${namePrefix}.periodOfAttendance.months`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Months"
              size="small"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              type="number"
              inputProps={{ min: 0, max: 11 }}
            />
          )}
        />
      </Grid>

      {/* DOR */}
      <Grid item xs={12} sm={6} md={3}>
        <Controller
          name={`${namePrefix}.dor`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="DOR"
              size="small"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      {/* Specify Seva */}
      <Grid item xs={12} sm={6} md={3}>
        <Controller
          name={`${namePrefix}.specifySeva`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Specify Seva"
              size="small"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      {/* Health */}
      <Grid item xs={12} sm={6} md={3}>
        <Controller
          name={`${namePrefix}.health`}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Health"
              size="small"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default RecommendationBranchSecretary;
