import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import dayjs from "dayjs";

const AppliedEarlier = ({ namePrefix }) => {
  const { control } = useFormContext();

  const appliedEarlier = useWatch({
    control,
    name: `${namePrefix}.appliedEarlier`,
  });

  return (
    <Grid container spacing={2}>
      <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
        <Controller
          name={`${namePrefix}.appliedEarlier`}
          render={({ field }) => (
            <FormControl size="small" fullWidth>
              <InputLabel id="appliedearlier-label">Applied Earlier</InputLabel>
              <Select
                labelId="appliedearlier-label"
                label="Applied Earlier"
                sx={{ minWidth: 150 }}
                {...field}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Grid>

      {appliedEarlier === "Yes" && (
        <>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.replyGivenBySabha`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  label="Reply Given By Sabha"
                  fullWidth
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.letterNo`}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  required
                  onChange={() => {
                    field.onChange();
                    console.log("field value", field.value);
                  }}
                  {...field}
                  label="Letter No."
                  fullWidth
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.letterDate`}
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    {...field}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.toDate().toISOString() : null);
                    }}
                    format="DD-MM-YYYY"
                    label="Date of Letter"
                    slotProps={{
                      textField: {
                        required: true,
                        size: "small",
                        error: fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AppliedEarlier;
