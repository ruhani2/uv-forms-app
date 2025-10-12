import {
  Grid,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormContext, Controller, useWatch } from "react-hook-form";

const Occupation = ({ namePrefix }) => {
  const { control } = useFormContext();
  const occupationType = useWatch({
    control,
    name: `${namePrefix}.occupation.type`,
  });

  const ownershipType = useWatch({
    control,
    name: `${namePrefix}.occupation.ownershipType`,
  });

  return (
    <Box my={2}>
      <Grid sx={{ mb: 1 }}>
        <Typography>Occupation Information</Typography>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item size={{ xs: 12, sm: 12, md: 12 }}>
          <Controller
            name={`${namePrefix}.occupation.type`}
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="service"
                  control={<Radio />}
                  label="Service"
                />
                <FormControlLabel
                  value="business"
                  control={<Radio />}
                  label="Business"
                />
                <FormControlLabel
                  value="unemployed"
                  control={<Radio />}
                  label="Unemployed"
                />
              </RadioGroup>
            )}
          />
        </Grid>
      </Grid>

      {occupationType === "unemployed" && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.reason`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Reason for Unemployment"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      )}

      {occupationType === "service" && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.post`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Post"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.organization`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Organization"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.department`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Department"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.place`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Place"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.monthlyIncome`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Monthly Income"
                  fullWidth
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                  // You can add fieldState.error?.message if you want to show validation error
                />
              )}
            />
          </Grid>
        </Grid>
      )}

      {occupationType === "business" && (
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.businessType`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Type Of Business"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.businessPlace`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Place Of Business"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.ownershipType`}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  size="small"
                  required
                  error={!!fieldState.error}
                >
                  <InputLabel>Ownership Type</InputLabel>
                  <Select {...field} label="Ownership Type" required>
                    <MenuItem value="self">Self</MenuItem>
                    <MenuItem value="partnership">Partnership</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          {ownershipType === "partnership" && (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`${namePrefix}.occupation.withWhom`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="With whom"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    // You can add fieldState.error?.message if you want to show validation error
                  />
                )}
              />
            </Grid>
          )}
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.occupation.monthlyIncome`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Monthly Income"
                  fullWidth
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                  // You can add fieldState.error?.message if you want to show validation error
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Occupation;
