import {
  Grid,
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

const InitiationDetails = ({ namePrefix }) => {
  const { control } = useFormContext();
  const satsangi = useWatch({
    control,
    name: `${namePrefix}.satsangi`,
  });

  const initiatedFrom = useWatch({
    control,
    name: `${namePrefix}.initiationDetails.initiatedFrom`,
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name={`${namePrefix}.satsangi`}
            control={control}
            render={({ field }) => (
              <FormControl size="small" sx={{ mr: 2 }} fullWidth>
                <InputLabel id="satsangi-label">
                  (Satsangi/Non-Satsangi/Jigyasu)
                </InputLabel>
                <Select
                  {...field}
                  labelId="satsangi-label"
                  label="Satsangi"
                  sx={{ minWidth: 250 }}
                >
                  <MenuItem value="satsangi">Satsangi</MenuItem>
                  <MenuItem value="non-Satsangi">Non-Satsangi</MenuItem>
                  <MenuItem value="jigyasu">Jigyasu</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        {satsangi === "satsangi" && (
          <>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`${namePrefix}.initiationDetails.initiatedFrom`}
                control={control}
                render={({ field }) => (
                  <FormControl size="small" fullWidth required>
                    <InputLabel id="initiated-from-label">
                      Initiated From
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="initiated-from-label"
                      label="Initiated From"
                    >
                      <MenuItem value="dayalbagh">Dayalbagh</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={`${namePrefix}.initiationDetails.dateOfInitiation`}
                control={control}
                render={({ field, fieldState }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      disableFuture
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toDate().toISOString() : null
                        );
                      }}
                      label="Date of Initiation"
                      slotProps={{
                        textField: {
                          error: fieldState.error,
                          helperText: fieldState.error?.message,
                          size: "small",
                          required: true,
                          fullWidth: true,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>

            {initiatedFrom === "other" && (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                <Controller
                  name={`${namePrefix}.initiationDetails.initiatedBy`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Initiated By"
                      size="small"
                      fullWidth
                      required
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
            )}
          </>
        )}
      </Grid>
      {satsangi === "satsangi" && initiatedFrom === "other" && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={`${namePrefix}.initiationDetails.placeOfInitiation`}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <TextField
                    {...field}
                    label="Place of Initiation"
                    size="small"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default InitiationDetails;
