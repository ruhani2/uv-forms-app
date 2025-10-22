import { Grid, Typography, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const CurrentLocation = ({ namePrefix }) => {
  const { control } = useFormContext();

  return (
    <>
      <Grid sx={{ mb: 1 }}>
        <Typography>Current Address Information</Typography>
      </Grid>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        Where applicant currently reside
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentLocation.houseNo`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="House No."
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentLocation.landmark`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Landmark"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentLocation.city`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="City/District/Village"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentLocation.state`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="State"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentLocation.country`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Country"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.currentLocation.pincode`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Pincode"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CurrentLocation;
