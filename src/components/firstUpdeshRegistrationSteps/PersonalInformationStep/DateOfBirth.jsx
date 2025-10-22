import React from "react";
import { Grid, Typography, TextField, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const DateOfBirth = ({ namePrefix }) => {
  const { control, setValue, trigger } = useFormContext();

  function calculateYearsAndMonths(date) {
    if (!date) return { years: 0, months: 0 };
    const today = dayjs();
    const dob = dayjs(date);
    const years = today.diff(dob, "year");
    const months = today.diff(dob, "month") % 12;
    return { years, months };
  }

  return (
    <Grid sx={{ mt: 2, mb: 2 }}>
      <Box>
        <Typography>Date of Birth Information</Typography>
        <Box>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Date of Birth should be same as mentioned on AADHAR card
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item size={{ xs: 12, sm: 4, md: 3 }}>
          <Controller
            name={`${namePrefix}.dateOfBirth.date`}
            control={control}
            render={({ field, fieldState }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  format="DD-MM-YYYY"
                  label="Date of Birth"
                  disableFuture
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => {
                    field.onChange(date ? date.toDate().toISOString() : null);
                    const { years, months } = calculateYearsAndMonths(date);
                    setValue(`${namePrefix}.dateOfBirth.years`, years);
                    setValue(`${namePrefix}.dateOfBirth.months`, months);
                    trigger(`${namePrefix}.dateOfBirth.years`);
                    trigger(`${namePrefix}.dateOfBirth.months`);
                  }}
                  slotProps={{
                    textField: {
                      error: fieldState.error,
                      helperText: fieldState.error?.message,
                      required: true,
                      size: "small",
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid
          item
          size={{ xs: 12, sm: 1, md: "auto" }}
          sx={{ mt: 1, alignItems: "center" }}
        >
          <Typography>Age</Typography>
        </Grid>
        <Grid item size={{ xs: 12, sm: 3, md: 2.5 }}>
          <Controller
            name={`${namePrefix}.dateOfBirth.years`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Years"
                disabled
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 3, md: 3 }}>
          <Controller
            name={`${namePrefix}.dateOfBirth.months`}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Months"
                disabled
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DateOfBirth;
