import React from "react";
import {
  useFormContext,
  useFieldArray,
  Controller,
  useWatch,
} from "react-hook-form";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DayalbaghSatsangToursStep = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicant.satsangToursDetails.satsangTours",
  });

  const everVisited = useWatch({
    control,
    name: "applicant.dayalbaghVisits.everVisited",
  });

  const attendedSatsangTours = useWatch({
    control,
    name: "applicant.satsangToursDetails.everVisited",
  });

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Dayalbagh Visits
      </Typography>
      <Grid container spacing={2} my={3}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name="applicant.dayalbaghVisits.everVisited"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                size="small"
                required
                error={!!fieldState.error}
              >
                <InputLabel>Ever Visited</InputLabel>
                <Select {...field} label="Ever Visited Dayalbagh" required>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        {everVisited === "yes" && (
          <>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={"applicant.dayalbaghVisits.noOfVisits"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Total number of visits"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={`${
                      fieldState.error?.message
                        ? fieldState.error.message
                        : "No of Dayalbagh Visits (Approximately)"
                    }`}
                  />
                )}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Controller
                name={"applicant.dayalbaghVisits.numDaysStayed"}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    required
                    size="small"
                    label="Total number of days stayed"
                    fullWidth
                    error={!!fieldState.error}
                    helperText="Total number of days stayed during every visit"
                  />
                )}
              />
            </Grid>
          </>
        )}
      </Grid>

      {everVisited === "yes" && (
        <Grid container spacing={2} my={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name="applicant.dayalbaghVisits.lastVisitDate"
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    disableFuture
                    format="DD-MM-YYYY"
                    label="Date of last visit"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.toDate().toISOString() : null);
                    }}
                    slotProps={{
                      textField: {
                        required: true,
                        size: "small",
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name={"applicant.dayalbaghVisits.numOfDaysLastVisit"}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  required
                  size="small"
                  label="Total no. days for last visit"
                  fullWidth
                  error={!!fieldState.error}
                  helperText="Total number of days stayed during last visit"
                />
              )}
            />
          </Grid>
        </Grid>
      )}

      <Typography variant="h5" gutterBottom mb={2}>
        Satsang Tours
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <Controller
            name="applicant.satsangToursDetails.everVisited"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl
                fullWidth
                size="small"
                required
                error={!!fieldState.error}
              >
                <InputLabel>Ever Attended Tours</InputLabel>
                <Select {...field} label="Attended Satsang Tours" required>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>

      {attendedSatsangTours === "yes" && (
        <>
          {fields.map((item, index) => (
            <Grid container spacing={2} key={item.id} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={5}>
                <Controller
                  name={`applicant.satsangToursDetails.satsangTours[${index}].date`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        {...field}
                        disableFuture
                        format="DD-MM-YYYY"
                        label="Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) => {
                          field.onChange(
                            date ? date.toDate().toISOString() : null
                          );
                        }}
                        slotProps={{
                          textField: {
                            required: true,
                            size: "small",
                            error: !!fieldState.error,
                            helperText: fieldState.error?.message,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  name={`applicant.satsangToursDetails.satsangTours[${index}].location`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      required
                      size="small"
                      label="Location"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              {index > 0 && (
                <Grid item xs={12} sm={2}>
                  <IconButton onClick={() => remove(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          ))}
          <Button
            type="button"
            variant="contained"
            onClick={() => append({ date: "", location: "" })}
          >
            + Add More
          </Button>
        </>
      )}
    </>
  );
};

export default DayalbaghSatsangToursStep;
